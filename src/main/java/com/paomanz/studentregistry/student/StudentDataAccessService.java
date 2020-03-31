package com.paomanz.studentregistry.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
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
              "INSERT INTO students (" +
              " student_id," +
              " first_name," +
              " last_name," +
              " email," +
              " gender) " +
              "VALUES (?, ?, ?, ?, ?::gender)";

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

   // VERIFY Email is Taken? : TRUE/FALSE
   @SuppressWarnings("ConstantConditions")
   boolean isEmailTaken(String email) {
      String sql = "" +
              "SELECT EXISTS (" +
              " SELECT 1" +
              " FROM students" +
              " WHERE email = ?" +
              ")";

      return jdbcTemplate.queryForObject(
              sql,
              new Object[]{email},
              (resultSet, i) -> resultSet.getBoolean(1)
      );
   }


   // GET: ALL Student Courses:
   List<StudentCourse> selectAllStudentCourses(UUID studentId) {
      String sql = "" +
              "SELECT " +
              " students.student_id," +
              " course.course_id," +
              " course.name," +
              " course.description," +
              " course.department," +
              " course.teacher_name," +
              " student_course.start_date," +
              " student_course.end_date," +
              " student_course.grade" +
              " FROM students" +
              " JOIN student_course USING (student_id)" +
              " JOIN course USING (course_id)" +
              " WHERE students.student_id = ?";


      // sql statement : e.g. 'SELECT uuid, name FROM students;'
      return jdbcTemplate.query(
              sql,
              new Object[]{studentId},
              mapStudentCoursesFromDb()
      );
   }

   private RowMapper<StudentCourse> mapStudentCoursesFromDb() {
      return (resultSet, i) ->
              new StudentCourse(
                      UUID.fromString(resultSet.getString("student_id")),
                      UUID.fromString(resultSet.getString("course_id")),

                      resultSet.getString("name"),
                      resultSet.getString("description"),
                      resultSet.getString("department"),
                      resultSet.getString("teacher_name"),

                      resultSet.getDate("start_date").toLocalDate(),
                      resultSet.getDate("end_date").toLocalDate(),
                      Optional.ofNullable(resultSet.getString("grade"))
                              .map(Integer::parseInt)
                              .orElse(null)
              );
   }


   //-- UPDATE: email, firstName, lastName :
      ////--- EMAIL
   int updateEmail(UUID studentId, String email) {
      String sql = "" +
              "UPDATE students " +
              "SET email = ? " +
              "WHERE student_id = ?";
      return jdbcTemplate.update(sql, email, studentId);
   }

      ////--- FIRST-NAME
   int updateFirstName(UUID studentId, String firstName) {
      String sql = "" +
              "UPDATE students " +
              "SET first_name = ? " +
              "WHERE student_id = ?";
      return jdbcTemplate.update(sql, firstName, studentId);
   }

      ////--- LAST-NAME
   int updateLastName(UUID studentId, String lastName) {
      String sql = "" +
              "UPDATE students " +
              "SET last_name = ? " +
              "WHERE student_id = ?";
      return jdbcTemplate.update(sql, lastName, studentId);
   }

   // VERIFY Student's Email Exists : TRUE/FALSE
   @SuppressWarnings("ConstantConditions")
   boolean selectExistsEmail(UUID studentId, String email) {
      String sql = "" +
              "SELECT EXISTS ( " +
              "   SELECT 1 " +
              "   FROM students " +
              "   WHERE student_id <> ? " +
              "    AND email = ? " +
              ")";
      return jdbcTemplate.queryForObject(
              sql,
              new Object[]{studentId, email},
              (resultSet, columnIndex) -> resultSet.getBoolean(1)
      );
   }


   // DELETE: Delete a Student
   int deleteStudent(UUID studentId) {
      String sql = "" +
              "DELETE FROM students" +
              " WHERE student_id = ?";
      return jdbcTemplate.update(sql, studentId);
   }
}
