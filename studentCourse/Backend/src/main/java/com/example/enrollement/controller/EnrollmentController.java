package com.example.enrollement.controller;

import com.example.enrollement.dto.ApiResponse;
import com.example.enrollement.dto.EnrollmentRequest;
import com.example.enrollement.model.Enrollment;
import com.example.enrollement.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class EnrollmentController {
    @Autowired
    private EnrollmentService enrollmentService;

    @PostMapping
    public ResponseEntity<ApiResponse<Enrollment>> enroll(@Valid @RequestBody EnrollmentRequest request) {
        Enrollment enrollment = enrollmentService.enrollStudent(request);
        return ResponseEntity.ok(ApiResponse.success("Student enrolled successfully", enrollment));
    }

    @PostMapping("/withdraw/{enrollmentId}")
    public ResponseEntity<ApiResponse<Enrollment>> withdraw(@PathVariable String enrollmentId) {
        Enrollment withdrawn = enrollmentService.withdrawEnrollment(enrollmentId);
        return ResponseEntity.ok(ApiResponse.success("Enrollment withdrawn successfully", withdrawn));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Enrollment>>> getAll() {
        List<Enrollment> enrollments = enrollmentService.getAllEnrollments();
        return ResponseEntity.ok(ApiResponse.success("Fetched all enrollments", enrollments));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<ApiResponse<List<Enrollment>>> getByStudent(@PathVariable String studentId) {
        List<Enrollment> enrollments = enrollmentService.getEnrollmentsByStudent(studentId);
        return ResponseEntity.ok(ApiResponse.success("Fetched student enrollments", enrollments));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<ApiResponse<List<Enrollment>>> getByCourse(@PathVariable String courseId) {
        List<Enrollment> enrollments = enrollmentService.getEnrollmentsByCourse(courseId);
        return ResponseEntity.ok(ApiResponse.success("Fetched course enrollments", enrollments));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Enrollment>> update(@PathVariable String id, @RequestBody Enrollment enrollment) {
        Enrollment updated = enrollmentService.updateEnrollment(id, enrollment);
        return ResponseEntity.ok(ApiResponse.success("Enrollment updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String id) {
        enrollmentService.deleteEnrollment(id);
        return ResponseEntity.ok(ApiResponse.success("Enrollment deleted successfully", null));
    }
}

