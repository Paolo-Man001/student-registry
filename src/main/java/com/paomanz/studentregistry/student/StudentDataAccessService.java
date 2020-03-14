package com.paomanz.studentregistry.student;

import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;


@Repository
public class StudentDataAccessService {

   public List<Student> selectAllStudents() {
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
