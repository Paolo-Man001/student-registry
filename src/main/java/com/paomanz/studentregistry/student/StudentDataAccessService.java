package com.paomanz.studentregistry.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class StudentDataAccessService {

   // Class-JdbcTemplate allows us to interacted with our Database
   private final JdbcTemplate jdbcTemplate;

   @Autowired
   public StudentDataAccessService(JdbcTemplate jdbcTemplate) {
      this.jdbcTemplate = jdbcTemplate;
   }

   public List<Student> selectAllStudents() {
      String sql = "";
      List<Student> students = jdbcTemplate.query(
              sql,                  // sql statement : e.g. 'SELECT uuid, name FROM students;'
              (resultSet, i) -> {   // returns raw Db as 'Set'. Each row from Db Set is mapped to 'i' as Java Obj
                 return null;
              });

      return null;
   }
}
