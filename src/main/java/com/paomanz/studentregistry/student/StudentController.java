package com.paomanz.studentregistry.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
   }

   @PostMapping("/new")      // RequestBody is in JSON format from the frontend(FormData)
   public void addNewStudent(@RequestBody Student student) {
      System.out.println(student);
   }

} // End of Class StudentController
