package com.paomanz.studentregistry.student;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;


// @Service will instantiate this class as a Service
// so it can be Injected as a Dependency to other classes.
@Service
public class StudentService {
   public List<Student> getAllStudents() {
      return List.of(
              new Student(
                      UUID.randomUUID(),
                      "James",
                      "Bond",
                      "jamesbond@emailc.com",
                      Student.Gender.MALE),
              new Student(
                      UUID.randomUUID(),
                      "Maria",
                      "Jane",
                      "mariajane@emailc.com",
                      Student.Gender.FEMALE)
      );
   }
}
