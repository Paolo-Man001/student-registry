import React, { Component } from "react";
import { deleteStudent, getAllStudentCourses, getAllStudents } from './client';
import {
   Avatar, Table,
   Spin, Modal,
   Empty, Button,
   Popconfirm, notification,
   Descriptions, PageHeader
} from "antd";

import { LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Container } from "react-bootstrap";
import ComponentFooter from "./ComponentFooter";
import AddStudentForm from "./forms/AddStudentForm";
import { errorNotification } from "./Notification";
import EditStudentForm from "./forms/EditStudentForm";


const getIndicatorIcon = () => <LoadingOutlined style={ { fontSize: 24 } } spin/>;

class ComponentMain extends Component {
   constructor( props ) {
      super(props);
      this.state = {
         students: [],
         studentCourses: [],
         selectedStudent: {},
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

   openEditStudentModal = () => this.setState({ isEditStudentModalVisible: true });
   closeEditStudentModal = () => this.setState({ isEditStudentModalVisible: false });

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

   // GET: Student Courses : OnIdClick :
   handleOnIdClick = ( studentId ) => {
      getAllStudentCourses(studentId)
          .then(res => res.json()
              .then(studentCourses => {
                 // console.log(studentCourses);
                 this.setState({
                    studentCourses
                 });
                 // console.log(`${ studentCourses.length } Course/s for student ID: ${ studentId }`);
              }))
          .catch(error => {
             // this is from Promise(checkStatus) returned in client.js :
             console.log(error.error);
             const message = error.error.message;
             const desc = error.error.error;
             errorNotification(message, desc);
          });
      this.openStudentCourseModal();
   };

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

   // EDIT: edit studentRecord
   editStudent = ( selectedStudent ) => {
      console.log(selectedStudent);
      this.setState({ selectedStudent});
      this.openEditStudentModal()
   };

   // UPDATE: submit StudentForm
   updateStudentFormSubmitter = student => {
      console.log(student);
   };


   render() {

      const {
         students,
         studentCourses,
         isFetching,
         isAddStudentModalVisible,
         isStudentCourseModalVisible
      } = this.state;

      const commonElements = () => (
          <>
             <div>
                {/*---MODAL : DISPLAY STUDENT COURSES ----*/ }
                <Modal
                    title={ <h3>Student Course</h3> }
                    visible={ isStudentCourseModalVisible }
                    onOk={ this.closeStudentCourseModal }
                    onCancel={ this.closeStudentCourseModal }
                    footer={ null }
                    width={ 1000 }
                >
                   {
                      !this.state.studentCourses.length < 1 ?
                          <>
                             {
                                studentCourses.map
                                (( course, index ) =>
                                    <div key={ `101${ index }` }>
                                       <Descriptions bordered size="small">
                                          <Descriptions.Item label="Course Id" span={ 4 }>{ course.courseId }</Descriptions.Item>
                                          <Descriptions.Item label="Course Name" span={ 2 }>{ course.name }</Descriptions.Item>
                                          <Descriptions.Item label="Department" span={ 2 }>{ course.department }</Descriptions.Item>
                                          <Descriptions.Item label="Course Description" span={ 4 }>{ course.description }</Descriptions.Item>
                                          <Descriptions.Item label="Teacher" span={ 4 }>{ course.teacherName }</Descriptions.Item>
                                          <Descriptions.Item label="Start Date" span={ 2 }>{ course.startDate }</Descriptions.Item>
                                          <Descriptions.Item label="End Date" span={ 2 }>{ course.endDate }</Descriptions.Item>
                                          <Descriptions.Item label="Grade" span={ 4 }>{ course.grade }</Descriptions.Item>
                                       </Descriptions>
                                       <hr/>
                                    </div>
                                )
                             }
                          </>
                          : <h5 className="text-danger">No courses found</h5>
                   }
                </Modal>

                {/*----MODAL : ADD STUDENT ----*/ }
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

                {/*----MODAL : EDIT STUDENT -----*/}
                <Modal
                    title='Edit'
                    visible={this.state.isEditStudentModalVisible}
                    onOk={this.closeEditStudentModal}
                    onCancel={this.closeEditStudentModal}
                    width={1000}>

                   <PageHeader title={`${this.state.selectedStudent.studentId}`}/>

                   <EditStudentForm
                       initialValues={this.state.selectedStudent}
                       submitter={this.updateStudentFormSubmitter}/>
                </Modal>
                <ComponentFooter handleAddStudentClick={ this.openAddStudentModal } numberOfStudents={ students.length }/>
             </div>
          </>
      ); // END of commonElements

      // PROGRESS Bar/Spinner :
      if ( isFetching ) {
         return (
             <div className="text-center mt-5">
                <Spin indicator={ getIndicatorIcon() }/>
             </div>
         );
      }

      // STUDENT TABLE: If True, return a table...
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
                      <Button type="primary" style={ { marginRight: 16 } } onClick={()=>this.editStudent(record)}>Edit</Button>
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
             <Container className="py-5">
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
      }  // END of If-else : TABLE

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

} // End ComponentMain


export default ComponentMain
