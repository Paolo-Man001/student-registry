import React, { Component } from "react";
import { deleteStudent, getAllStudents } from './client';
import { Avatar, Table, Spin, Modal, Empty, Button, Popconfirm, notification } from "antd";
import { LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
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
         isAddStudentModalVisible: false,
         isStudentCourseModalVisible: false
      };

      this.fetchStudents = this.fetchStudents.bind(this);
   }

   componentDidMount() {
      this.fetchStudents();
   }

   // MODALS :
   openAddStudentModal = () => this.setState({ isAddStudentModalVisible: true });
   closeAddStudentModal = () => this.setState({ isAddStudentModalVisible: false });

   openStudentCourseModal = () => this.setState({ isStudentCourseModalVisible: true });
   closeStudentCourseModal = () => this.setState({ isStudentCourseModalVisible: false });
   // NOTIFICATION :
   openNotificationWithIcon = ( type, message, description ) => notification[type]({ message, description });

   // FETCH: ALL Students :
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

   // DELETE by Id :
   deleteStudent = studentId => {
      // alert(`Deleting Id : ${ studentId }`);
      deleteStudent(studentId).then(() => {
         this.openNotificationWithIcon('success', 'Student deleted', `Id: ${ studentId } was deleted.`);
         this.fetchStudents();
      }).catch(err => {
         this.openNotificationWithIcon('error', 'error', `(${ err.error.status }) ${ err.error.error }`);
      });
   };

   // OnIdClick :
   handleOnIdClick = ( text ) => {
      this.openStudentCourseModal();
   };


   render() {

      const {
         students,
         isFetching,
         isAddStudentModalVisible,
         isStudentCourseModalVisible
      } = this.state;

      const commonElements = () => (
          <>
             <div>
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

                       onFailure={ ( error ) => {
                          console.log(JSON.stringify(error));
                          const message = error.error.message;
                          const desc = error.error.httpStatus;
                          errorNotification(message, desc);
                       } }
                   />
                </Modal>
                <ComponentFooter handleAddStudentClick={ this.openAddStudentModal } numberOfStudents={ students.length }/>
             </div>
             <div>
                <Modal
                    title={ <h4>Student Course</h4> }
                    visible={ isStudentCourseModalVisible }
                    onOk={ this.closeStudentCourseModal }
                    onCancel={ this.closeStudentCourseModal }
                    footer={null}
                >
                   <p>Some contents...</p>
                   <p>Some contents...</p>
                   <p>Some contents...</p>
                </Modal>
             </div>
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
               render: ( text ) => (
                   <Button
                       type="link"
                       onClick={ () => this.handleOnIdClick(text) }
                   >{ text }
                   </Button>
               )
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
            },
            {
               title: 'Action',
               key: 'action',
               render: ( text, record ) => (
                   <>
                      <Button type="primary" style={ { marginRight: 16 } }>Edit</Button>
                      <Popconfirm
                          icon={ <QuestionCircleOutlined style={ { color: 'red' } }/> }
                          placement='topRight'
                          title={ `DELETE ID: ${ record.studentId }` }
                          okText='Yes' cancelText='No'
                          onConfirm={ () => this.deleteStudent(record.studentId) }
                          onCancel={ e => e.stopPropagation() }
                      >
                         <Button danger>Delete</Button>
                      </Popconfirm>
                   </>
               ),
            },
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
