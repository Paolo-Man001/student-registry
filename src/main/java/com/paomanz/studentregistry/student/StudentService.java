package com.paomanz.studentregistry.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


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
   public List<Student> getAllStudents() {
      return studentDataAccessService.selectAllStudents();
   }

   // POST: Add 1 student


}
