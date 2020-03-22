package com.paomanz.studentregistry.student;

import com.paomanz.studentregistry.exception.ApiRequestException;
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

      //      throw new ApiRequestException("Sorry mate, we couldn't get to any students...with custom exception");
      return studentService.getAllStudents();
   }

   @PostMapping      // RequestBody is in JSON format from the frontend(FormData)
   public void addNewStudent(@RequestBody Student student) {
      studentService.addNewStudent(student);
   }

} // End of Class StudentController
