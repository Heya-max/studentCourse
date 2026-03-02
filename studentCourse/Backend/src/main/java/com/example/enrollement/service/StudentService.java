package com.example.enrollement.service;

import com.example.enrollement.exception.DuplicateResourceException;
import com.example.enrollement.exception.ResourceNotFoundException;
import com.example.enrollement.model.Student;
import com.example.enrollement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public Student registerStudent(Student student) {
        if (studentRepository.findByEmail(student.getEmail()).isPresent()) {
            throw new DuplicateResourceException("Student with email " + student.getEmail() + " already exists");
        }
        if (studentRepository.findByStudentId(student.getStudentId()).isPresent()) {
            throw new DuplicateResourceException("Student with ID " + student.getStudentId() + " already exists");
        }
        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(String id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    public Student updateStudent(String id, Student student) {
        Student existing = getStudentById(id);
        existing.setFirstName(student.getFirstName());
        existing.setLastName(student.getLastName());
        existing.setEmail(student.getEmail());
        existing.setPhone(student.getPhone());
        existing.setDateOfBirth(student.getDateOfBirth());
        existing.setAddress(student.getAddress());
        existing.setActive(student.isActive());
        return studentRepository.save(existing);
    }

    public void deleteStudent(String id) {
        Student student = getStudentById(id);
        studentRepository.delete(student);
    }

    public List<Student> searchStudents(String name) {
        return studentRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(name, name);
    }
}

