import React, { Component } from "react";
import { getAllStudents } from './client';
import { Avatar, Table } from "antd";
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
               title:'',
               key:'avatar',
               // to use Custom-Component(Avatar from antd)inside a column, Use 'render:'
               render: (text,student) => (
                   <Avatar size="large">
                      {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
                   </Avatar>
               )
            },
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

   }

}


export default ComponentMain
