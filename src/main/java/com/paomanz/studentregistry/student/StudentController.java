package com.paomanz.studentregistry.student;

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


   // GET: Get ALL Students :
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

   // ADD: New Student :
   @PostMapping      // RequestBody is in JSON format from the frontend(FormData)
   public void addNewStudent(@RequestBody @Valid Student student) {
      studentService.addNewStudent(student);
   }

   // PUT: Update Student Record :
   @PutMapping(path = "{studentId}")
   public void updateStudent(@PathVariable("studentId") UUID studentId,
                             @RequestBody Student student) {
      studentService.updateStudent(studentId, student);
   }

   // DELETE: Student by Id :
   @DeleteMapping(path = "{studentId}")
   public void deleteStudent(
           @PathVariable("studentId") UUID studentId) {
      studentService.deleteStudent(studentId);
   }

} // End of Class StudentController
