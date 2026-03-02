package com.example.enrollement.controller;

import com.example.enrollement.dto.ApiResponse;
import com.example.enrollement.model.Student;
import com.example.enrollement.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping
    public ResponseEntity<ApiResponse<Student>> register(@Valid @RequestBody Student student) {
        Student saved = studentService.registerStudent(student);
        return ResponseEntity.ok(ApiResponse.success("Student registered successfully", saved));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Student>>> getAll() {
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(ApiResponse.success("Fetched all students", students));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Student>> getById(@PathVariable String id) {
        Student student = studentService.getStudentById(id);
        return ResponseEntity.ok(ApiResponse.success("Fetched student successfully", student));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Student>> update(@PathVariable String id, @Valid @RequestBody Student student) {
        Student updated = studentService.updateStudent(id, student);
        return ResponseEntity.ok(ApiResponse.success("Student updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok(ApiResponse.success("Student deleted successfully", null));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Student>>> search(@RequestParam String name) {
        List<Student> students = studentService.searchStudents(name);
        return ResponseEntity.ok(ApiResponse.success("Search results", students));
    }
}

