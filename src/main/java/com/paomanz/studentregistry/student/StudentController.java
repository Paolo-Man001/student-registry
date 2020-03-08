package com.paomanz.studentregistry.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

// Tell SpringBoot this Class will be served as a REST-controller:
// specify the Mapping with "" - double-quotes
@RestController
@RequestMapping("student")
public class StudentController {
   // Tell SpringBoot this method will serve as a GET-Req by Annotating:
   @GetMapping
   public List<Student> getAllStudents() {
      // TEMPORARY: hard-coded data
      return List.of(
              new Student(UUID.randomUUID(), "James", "Bond", "jamesbond@emailc.com", Student.Gender.MALE),
              new Student(UUID.randomUUID(), "Maria", "Jane", "mariajane@emailc.com", Student.Gender.FEMALE)
      );
   }
}
