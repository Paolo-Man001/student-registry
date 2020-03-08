package com.paomanz.studentregistry.student;

import java.util.List;
import java.util.UUID;

public class StudentController {

   public List<Student> getAllStudents() {
      // TEMPORARY: hard-coded data
      return List.of(
              new Student(UUID.randomUUID(), "James", "Bond", "jamesbond@emailc.com", Student.Gender.MALE),
              new Student(UUID.randomUUID(), "Maria", "Jane", "mariajane@emailc.com", Student.Gender.FEMALE)
      );
   }
}
