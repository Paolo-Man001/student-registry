import React, { Component } from "react";
import { getAllStudents } from './client';
import { Avatar, Table, Spin, Modal } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { Container } from "react-bootstrap";
import ComponentFooter from "./ComponentFooter";
import AddStudentForm from "./forms/AddStudentForm";


const getIndicatorIcon = () => <LoadingOutlined style={ { fontSize: 24 } } spin/>;

class ComponentMain extends Component {
   constructor( props ) {
      super(props);
      this.state = {
         students: [],
         isFetching: false,
         isAddStudentModalVisible: false
      };

      this.fetchStudents = this.fetchStudents.bind(this);
   }

   componentDidMount() {
      this.fetchStudents();
   }


   openAddStudentModal = () => this.setState({ isAddStudentModalVisible: true });
   closeAddStudentModal = () => this.setState({ isAddStudentModalVisible: false });


   fetchStudents() {
      this.setState({ isFetching: true });
      getAllStudents().then(res => res.json()
          .then(students => {
             // console.log(students);
             this.setState({ students, isFetching: false });
          })
      );
   }


   render() {

      const { students, isFetching, isAddStudentModalVisible } = this.state;

      if ( isFetching ) {
         return (
             <div className="text-center mt-5">
                <Spin indicator={ getIndicatorIcon() }/>
             </div>
         );
      }

      // If True, return a table...
      if ( students && students.length ) {
         const columns = [
            {
               title: '',
               key: 'avatar',
               // to use Custom-Component(Avatar from antd)inside a column, Use 'render:'
               render: ( text, student ) => (
                   <Avatar size="large">
                      { `${ student.firstName.charAt(0).toUpperCase() }${ student.lastName.charAt(0).toUpperCase() }` }
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
                <h1 className="text-center">Student Registry</h1>
                <Table dataSource={ students }
                       columns={ columns }
                       rowKey='studentId'
                       pagination={ false }/>

                <Modal
                    title={<h4>Add New Student</h4>}
                    visible={ isAddStudentModalVisible }
                    onOk={ this.closeAddStudentModal }
                    onCancel={ this.closeAddStudentModal }
                    width={ 1000 }>
                   <AddStudentForm/>
                </Modal>

                <ComponentFooter handleAddStudentClick={ this.openAddStudentModal } numberOfStudents={ students.length }/>
             </Container>
         );
      }


      // ... else, return <h1>
      return <h1>No students found</h1>;
   } // End render()

}


export default ComponentMain
