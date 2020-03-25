package com.paomanz.studentregistry.student;

import com.paomanz.studentregistry.EmailValidator;
import com.paomanz.studentregistry.exception.ApiRequestException;
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
   private final EmailValidator emailValidator;

   @Autowired
   public StudentService(StudentDataAccessService studentDataAccessService, EmailValidator emailValidator) {
      this.studentDataAccessService = studentDataAccessService;
      this.emailValidator = emailValidator;
   }

   // GET:
   List<Student> getAllStudents() {
      return studentDataAccessService.selectAllStudents();
   }

   // GET: ALL Student Courses :
   List<StudentCourse> getAllStudentCourses(UUID studentId) {
      return studentDataAccessService.selectAllStudentCourses(studentId);
   }

   // POST: Add 1 student
   void addNewStudent(Student student) {
      addNewStudent(null, student);
   }

   void addNewStudent(UUID studentId, Student student) {
      // If the studentId is null; Generate one ourselves.
      UUID newStudentId = Optional.ofNullable(studentId)
              .orElse(UUID.randomUUID());

      // Validate Email
      if (!emailValidator.test(student.getEmail())) {
         throw new ApiRequestException("The email - '" + student.getEmail() + "' - is not valid.");
      }
      // Verify email is NOT taken
      if (studentDataAccessService.isEmailTaken(student.getEmail())) {
         throw new ApiRequestException("The email - '" + student.getEmail() + "' - has already been taken.");
      }
      studentDataAccessService.insertStudent(newStudentId, student);
   }

}
