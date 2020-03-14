package com.paomanz.studentregistry.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
   } // End of GET: getAllStudents()

} // End of Class StudentController
