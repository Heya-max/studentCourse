package com.example.enrollement.repository;

import com.example.enrollement.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;
import java.util.List;

public interface CourseRepository extends MongoRepository<Course, String> {
    Optional<Course> findByCourseCode(String courseCode);
    
    List<Course> findByCourseNameContainingIgnoreCase(String courseName);
}

