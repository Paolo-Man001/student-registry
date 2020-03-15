import fetch from 'unfetch';


// GET: ALL students
export const getAllStudents = () => fetch('/api/students');

// POST: ADD 1 student
export const addNewStudent = student =>
    fetch('/api/students/new', {
       headers: {
          'Content-Type': 'application/json'
       },
       method: 'POST',
       body: JSON.stringify(student)   // value 'body:' is the object which @RequestBody(StudentController) annotation gets
    });
