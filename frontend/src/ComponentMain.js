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
      return (
          <>
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
                         this.state.students.map
                         (student =>
                             <tr key={ student.studentId }>
                                <td>{ student.firstName } { student.lastName }</td>
                                <td>{ student.email }</td>
                                <td>{ student.gender }</td>
                             </tr>
                         )
                      }
                   </tbody>
                </table>
             </div>
          </>
      );
   }


}


export default ComponentMain
