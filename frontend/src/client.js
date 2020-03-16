import fetch from 'unfetch';


const checkStatus = response => {
   if ( response.ok ) {
      return response;
   } else {
      let error = new Error(response.statusText);  // Attach the 'actual' error.
      error.response = response;
      response.json().then(e => {
         error.error = e;
      });

      return Promise.reject(error); // Promise returned with 'error-obj' parsed.
   }
};

// GET: ALL students
export const getAllStudents = () =>
    fetch('/api/students').then(checkStatus);

// POST: ADD 1 student
export const addNewStudent = student =>
    fetch('/api/students', {
       headers: {
          'Content-Type': 'application/json'
       },
       method: 'POST',
       body: JSON.stringify(student)   // value 'body:' is the object which @RequestBody(StudentController) annotation gets

    }).then(checkStatus);
