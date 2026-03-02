package com.example.enrollement.repository;

import com.example.enrollement.model.Enrollment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends MongoRepository<Enrollment, String> {
    List<Enrollment> findByStudentId(String studentId);
    
    List<Enrollment> findByCourseId(String courseId);
    
    Optional<Enrollment> findByStudentIdAndCourseId(String studentId, String courseId);
    
    boolean existsByStudentIdAndCourseId(String studentId, String courseId);
    
    long countByCourseId(String courseId);
}

