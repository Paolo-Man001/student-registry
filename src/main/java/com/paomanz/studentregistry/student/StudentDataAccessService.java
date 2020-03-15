package com.paomanz.studentregistry.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public class StudentDataAccessService {

   // Class-JdbcTemplate allows us to interacted with our Database
   private final JdbcTemplate jdbcTemplate;

   @Autowired
   public StudentDataAccessService(JdbcTemplate jdbcTemplate) {
      this.jdbcTemplate = jdbcTemplate;
   }

   // GET: ALL students:
   List<Student> selectAllStudents() {
      String sql = "" +
              "SELECT" +
              " student_id," +
              " first_name," +
              " last_name," +
              " email," +
              " gender " +
              "FROM students;";

      // sql statement : e.g. 'SELECT uuid, name FROM students;'
      return jdbcTemplate.query(sql, mapStudentFromDb());
   }

   private RowMapper<Student> mapStudentFromDb() {
      return (resultSet, i) -> {   // returns raw Db as 'Set'. Each row from Db Set is mapped to own index 'i'
         String studentIdStr = resultSet.getString("student_id");
         UUID studentId = UUID.fromString(studentIdStr);

         String firstName = resultSet.getString("first_name");
         String lastName = resultSet.getString("last_name");
         String email = resultSet.getString("email");

         String genderStr = resultSet.getString("gender").toUpperCase();
         Student.Gender gender = Student.Gender.valueOf(genderStr);

         return new Student(studentId, firstName, lastName, email, gender);
      };
   }

   // POST: Add 1 student:
   int insertStudent(UUID studentId, Student student) {

      String sql = "" +
              "INSERT INTO students (student_id, first_name, last_name, email, gender ) " +
              "VALUES (?, ?, ?, ?, ?)";

      // Jdbc uses Update() to insert a record.
      // when update completes, it returns an Integer Value that is either 0 or 1.
      return jdbcTemplate.update(
              sql,
              studentId,
              student.getFirstName(),
              student.getLastName(),
              student.getEmail(),
              student.getGender().name().toUpperCase()
      );
   }

}
