package com.paomanz.studentregistry.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZoneId;
import java.time.ZonedDateTime;


// Tell Spring that this class will Handle Multiple Exceptions
@ControllerAdvice
public class ApiExceptionHandler {

   // Tell Spring that this method will be
   // responsible for handling this kind of exception:
   @ExceptionHandler(value = {ApiRequestException.class})
   public ResponseEntity<Object> handleApiRequestException(ApiRequestException e) {
      // 1. Create PAYLOAD containing Exception Details/Information
      HttpStatus badRequest = HttpStatus.BAD_REQUEST;
      ApiException apiException = new ApiException(
              e.getMessage(),
              badRequest,
              ZonedDateTime.now(ZoneId.of("Z"))
      );
      // 2. Return response entity
      return new ResponseEntity<>(apiException, badRequest);
   }
}


/* Error Object for
*  timestamp: "2020-03-22T07:57:06.158+0000"
   status: 500
   error: "Internal Server Error"
   message: "Sorry mate, we couldn't get to any students..."
   trace: "java.lang.IllegalStateException: Sorry mate, we couldn't get to any students...
   path: "/api/students"
*
* */
