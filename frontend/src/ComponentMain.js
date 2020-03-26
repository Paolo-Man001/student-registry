import React, { Component } from "react";
import { getAllStudents } from './client';
import { Avatar, Table, Spin, Modal, Empty } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { Container } from "react-bootstrap";
import ComponentFooter from "./ComponentFooter";
import AddStudentForm from "./forms/AddStudentForm";
import { errorNotification } from "./Notification";


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

      getAllStudents()
          .then(res => res.json()
              .then(students => {
                 // console.log(students);
                 this.setState({
                    students,
                    isFetching: false
                 });
              }))
          .catch(error => {
             // this is from Promise(checkStatus) returned in client.js :
             console.log(error.error);
             const message = error.error.message;
             const desc = error.error.error;
             errorNotification(message, desc);

             this.setState({
                isFetching: false
             });
          });
   }


   render() {

      const { students, isFetching, isAddStudentModalVisible } = this.state;
      const commonElements = () => (
          <>
             <Modal
                 title={ <h4>Add New Student</h4> }
                 visible={ isAddStudentModalVisible }
                 onOk={ this.closeAddStudentModal }
                 onCancel={ this.closeAddStudentModal }
                 width={ 1000 }>

                <AddStudentForm
                    onSuccess={ () => {
                       this.closeAddStudentModal();
                       this.fetchStudents();
                    } }

                    onFailure={ (error) => {
                       console.log(JSON.stringify(error));
                       const message = error.error.message;
                       const desc = error.error.httpStatus;
                       errorNotification(message, desc);
                    } }
                />
             </Modal>
             <ComponentFooter handleAddStudentClick={ this.openAddStudentModal } numberOfStudents={ students.length }/>
          </>
      );

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
                <Table
                    style={ { marginBottom: '100px' } }
                    dataSource={ students }
                    columns={ columns }
                    rowKey='studentId'
                    pagination={ false }/>

                { commonElements() }
             </Container>
         );
      }

      // ... else, return <Empty/> component from ant.design
      return (
          <div>
             <Empty description={
                <h2>No Students Found</h2>
             }/>
             { commonElements() }
          </div>
      );

   } // End render()

}


export default ComponentMain
