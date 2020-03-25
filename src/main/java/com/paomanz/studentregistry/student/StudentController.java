package com.paomanz.studentregistry.student;

import com.paomanz.studentregistry.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

// Tell SpringBoot this Class will be served as a REST-controller:
// specify the Mapping with "" - double-quotes
@RestController
@RequestMapping("students")
public class StudentController {

   // Inject the StudentService into this class:
   private final StudentService studentService;

   @Autowired
   public StudentController(StudentService studentService) {
      this.studentService = studentService;
   }

   @GetMapping
   public List<Student> getAllStudents() {
      return studentService.getAllStudents();
   }

   // GET: ALL Student Courses :
   @GetMapping(path = "{studentId}/courses")
   public List<StudentCourse> getAllStudentCourses(
           @PathVariable("studentId") UUID studentId) {
      return studentService.getAllStudentCourses(studentId);
   }

   @PostMapping      // RequestBody is in JSON format from the frontend(FormData)
   public void addNewStudent(@RequestBody @Valid Student student) {
      studentService.addNewStudent(student);
   }

} // End of Class StudentController
