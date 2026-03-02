# Backend Fix - Rename flightbooking to enrollement

## Files to update (change package from com.example.flightbooking to com.example.enrollement):

### Main Application
- [x] StudentEnrollmentApplication.java

### Controllers
- [x] controller/StudentController.java
- [x] controller/CourseController.java
- [x] controller/EnrollmentController.java

### Services
- [x] service/StudentService.java
- [x] service/CourseService.java
- [x] service/EnrollmentService.java

### Repositories
- [x] repository/StudentRepository.java
- [x] repository/CourseRepository.java
- [x] repository/EnrollmentRepository.java

### Models
- [x] model/Student.java
- [x] model/Course.java
- [x] model/Enrollment.java

### DTOs
- [x] dto/ApiResponse.java
- [x] dto/EnrollmentRequest.java

### Exceptions
- [x] exception/GlobalExceptionHandler.java
- [x] exception/ResourceNotFoundException.java
- [x] exception/DuplicateResourceException.java
- [x] exception/CapacityFullException.java
- [x] exception/DuplicateEnrollmentException.java
