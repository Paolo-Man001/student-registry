package com.paomanz.studentregistry;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class EmailValidatorTest {

   private final EmailValidator underTest = new EmailValidator();

   @Test
   void itShouldValidateCorrectEmail() {
      assertThat(underTest.test("hello@gmail.com")).isTrue();
   }

   @Test
   void itShouldValidateToIncorrectEmailWithoutAtSymbol() {
      assertThat(underTest.test("hellogmail.com")).isFalse();
   }
   @Test
   void itShouldValidateToIncorrectEmailWithoutDotAtEnd() {
      assertThat(underTest.test("hello@gmailcom")).isFalse();
   }

}
