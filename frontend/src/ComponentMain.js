import React, { Component } from "react";
import { getAllStudents } from './client';
import { Table } from "antd";
import Container from "./Container";


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

      // If True, return a table...
      if ( students && students.length ) {
         const columns = [
            {
               title: 'Student Id',
               dataIndex: 'studentId',
               key: 'studentId',
            },
            {
               title: 'First Name',
               dataIndex: 'firstName',
               key: 'firstName',
            },
            {
               title: 'Last Name',
               dataIndex: 'lastName',
               key: 'lastName',
            },
            {
               title: 'Email',
               dataIndex: 'email',
               key: 'email',
            },
            {
               title: 'Gender',
               dataIndex: 'gender',
               key: 'gender',
            }
         ];

         return (
             <Container>
                <Table dataSource={ students }
                       columns={ columns }
                       rowKey='studentId'
                       pagination={false}
                />
             </Container>
         );
      }

      // ... else, return <h1>
      return <h1>No students found</h1>;

      /* return (
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
      );*/
   }

}


export default ComponentMain
