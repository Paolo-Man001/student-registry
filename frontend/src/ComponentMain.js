import React, { Component } from "react";
import { getAllStudents } from './client';

class ComponentMain extends Component {
   constructor( props ) {
      super(props);

      this.state = {
         students: []
      };

      this.fetchStudents = this.fetchStudents.bind(this);
   }


   componentDidMount() {
      this.fetchStudents();
   }


   fetchStudents() {
      getAllStudents().then(res => res.json()
          .then(students => {
             console.log(students);
             this.setState({ students });
          })
      );
   }


   render() {
      const { students } = this.state;

      if ( students && students.length )  // If True, return a table...
         return (
             <div>
                <table>
                   <thead>
                      <tr>
                         <th>Student Name</th>
                         <th>Email</th>
                         <th>Gender</th>
                      </tr>
                   </thead>
                   <tbody>
                      {
                         students.map
                         (( student, id ) =>
                             <tr key={ id }>
                                <td>{ student.firstName } { student.lastName }</td>
                                <td>{ student.email }</td>
                                <td>{ student.gender }</td>
                             </tr>
                         )
                      }
                   </tbody>
                </table>
             </div>
         );
      // ... else, return <h1>
      return <h1>No students found</h1>;
   }

}


export default ComponentMain
