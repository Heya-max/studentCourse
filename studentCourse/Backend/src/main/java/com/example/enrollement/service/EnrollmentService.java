package com.example.enrollement.service;

import com.example.enrollement.dto.EnrollmentRequest;
import com.example.enrollement.exception.CapacityFullException;
import com.example.enrollement.exception.DuplicateEnrollmentException;
import com.example.enrollement.exception.ResourceNotFoundException;
import com.example.enrollement.model.Course;
import com.example.enrollement.model.Enrollment;
import com.example.enrollement.model.Student;
import com.example.enrollement.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class EnrollmentService {
    @Autowired
    private EnrollmentRepository enrollmentRepository;
    @Autowired
    private CourseService courseService;
    @Autowired
    private StudentService studentService;

    public Enrollment enrollStudent(EnrollmentRequest request) {
        Student student = studentService.getStudentById(request.getStudentId());
        Course course = courseService.getCourseByCode(request.getCourseCode());

        // Check for duplicate enrollment
        if (enrollmentRepository.existsByStudentIdAndCourseId(student.getId(), course.getId())) {
            throw new DuplicateEnrollmentException("Student " + student.getFirstName() + " " + student.getLastName() + " is already enrolled in course " + course.getCourseName());
        }

        // Check if course capacity is full
        if (course.getAvailableSeats() <= 0) {
            throw new CapacityFullException("Course " + course.getCourseName() + " is already full. Maximum capacity: " + course.getMaxCapacity());
        }

        // Create enrollment
        Enrollment enrollment = new Enrollment();
        enrollment.setStudentId(student.getId());
        enrollment.setCourseId(course.getId());
        enrollment.setCourseCode(course.getCourseCode());
        enrollment.setCourseName(course.getCourseName());
        enrollment.setStudentName(student.getFirstName() + " " + student.getLastName());
        enrollment.setEnrollmentDate(LocalDate.now());
        enrollment.setStatus("ENROLLED");
        enrollment.setFeesPaid(course.getFees());
        enrollment.setPaymentStatus("PENDING");

        // Reduce available seats
        courseService.updateAvailableSeats(course.getId(), -1);

        return enrollmentRepository.save(enrollment);
    }

    public Enrollment withdrawEnrollment(String enrollmentId) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found with id: " + enrollmentId));

        if ("WITHDRAWN".equals(enrollment.getStatus())) {
            throw new RuntimeException("Enrollment is already withdrawn");
        }

        enrollment.setStatus("WITHDRAWN");
        enrollment.setPaymentStatus("CANCELLED");
        
        // Increase available seats
        courseService.updateAvailableSeats(enrollment.getCourseId(), 1);

        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    public List<Enrollment> getEnrollmentsByStudent(String studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }

    public List<Enrollment> getEnrollmentsByCourse(String courseId) {
        return enrollmentRepository.findByCourseId(courseId);
    }

    public Enrollment updateEnrollment(String id, Enrollment enrollment) {
        Enrollment existing = enrollmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found with id: " + id));
        
        existing.setStatus(enrollment.getStatus());
        existing.setPaymentStatus(enrollment.getPaymentStatus());
        existing.setFeesPaid(enrollment.getFeesPaid());
        
        return enrollmentRepository.save(existing);
    }

    public void deleteEnrollment(String id) {
        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found with id: " + id));
        
        // If enrollment is active, free up the seat
        if ("ENROLLED".equals(enrollment.getStatus())) {
            courseService.updateAvailableSeats(enrollment.getCourseId(), 1);
        }
        
        enrollmentRepository.delete(enrollment);
    }
}

