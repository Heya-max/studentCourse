package com.example.enrollement.service;

import com.example.enrollement.exception.DuplicateResourceException;
import com.example.enrollement.exception.ResourceNotFoundException;
import com.example.enrollement.model.Course;
import com.example.enrollement.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    public Course addCourse(Course course) {
        if (courseRepository.findByCourseCode(course.getCourseCode()).isPresent()) {
            throw new DuplicateResourceException("Course " + course.getCourseCode() + " already exists");
        }
        course.setAvailableSeats(course.getMaxCapacity());
        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(String id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
    }

    public Course getCourseByCode(String courseCode) {
        return courseRepository.findByCourseCode(courseCode)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + courseCode));
    }

    public Course updateCourse(String id, Course course) {
        Course existing = getCourseById(id);
        existing.setCourseCode(course.getCourseCode());
        existing.setCourseName(course.getCourseName());
        existing.setDescription(course.getDescription());
        existing.setDuration(course.getDuration());
        existing.setFees(course.getFees());
        existing.setMaxCapacity(course.getMaxCapacity());
        existing.setStartDate(course.getStartDate());
        existing.setEndDate(course.getEndDate());
        return courseRepository.save(existing);
    }

    public void deleteCourse(String id) {
        Course course = getCourseById(id);
        courseRepository.delete(course);
    }

    public List<Course> searchCourses(String name) {
        return courseRepository.findByCourseNameContainingIgnoreCase(name);
    }

    public Course updateAvailableSeats(String id, int change) {
        Course course = getCourseById(id);
        course.setAvailableSeats(course.getAvailableSeats() + change);
        return courseRepository.save(course);
    }

    public long getEnrollmentCount(String courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));
        return course.getMaxCapacity() - course.getAvailableSeats();
    }
}

