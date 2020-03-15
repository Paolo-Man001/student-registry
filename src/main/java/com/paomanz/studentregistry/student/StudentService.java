package com.paomanz.studentregistry.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


// @Service will instantiate this class as a Service
// so it can be Injected as a Dependency to other classes.
@Service
public class StudentService {

   private final StudentDataAccessService studentDataAccessService;

   @Autowired
   public StudentService(StudentDataAccessService studentDataAccessService) {
      this.studentDataAccessService = studentDataAccessService;
   }

   // GET:
   List<Student> getAllStudents() {
      return studentDataAccessService.selectAllStudents();
   }

   // POST: Add 1 student
   void addNewStudent(Student student) {
      addNewStudent(null, student);
   }
   void addNewStudent(UUID studentId, Student student) {
      // If the studentId is null; Generate one ourselves.
      UUID newStudentId = Optional.ofNullable(studentId)
              .orElse(UUID.randomUUID());

      // TODO: Verify email is NOT taken
      studentDataAccessService.insertStudent(newStudentId, student);
   }

}
