package com.example.enrollement.controller;

import com.example.enrollement.dto.ApiResponse;
import com.example.enrollement.model.Course;
import com.example.enrollement.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @PostMapping
    public ResponseEntity<ApiResponse<Course>> add(@Valid @RequestBody Course course) {
        Course saved = courseService.addCourse(course);
        return ResponseEntity.ok(ApiResponse.success("Course added successfully", saved));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Course>>> getAll() {
        List<Course> courses = courseService.getAllCourses();
        return ResponseEntity.ok(ApiResponse.success("Fetched all courses", courses));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Course>> getById(@PathVariable String id) {
        Course course = courseService.getCourseById(id);
        return ResponseEntity.ok(ApiResponse.success("Fetched course successfully", course));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Course>> update(@PathVariable String id, @Valid @RequestBody Course course) {
        Course updated = courseService.updateCourse(id, course);
        return ResponseEntity.ok(ApiResponse.success("Course updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok(ApiResponse.success("Course deleted successfully", null));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Course>>> search(@RequestParam String name) {
        List<Course> courses = courseService.searchCourses(name);
        return ResponseEntity.ok(ApiResponse.success("Search results", courses));
    }
}

