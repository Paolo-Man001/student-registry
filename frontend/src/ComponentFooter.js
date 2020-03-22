import React from "react";
import { Container } from "react-bootstrap";
import { Avatar, Button } from "antd";
import './ComponentFooter.css';

const ComponentFooter = ( props ) => (
    <div>
       <Container fluid className="footer text-center">
          {
             props.numberOfStudents !== undefined ? // changed to 'if undefined' to make '0' invalid too, and returns 'null'
                 <Avatar
                     style={ { backgroundColor: '#f56a00', marginRight: '5px' } }
                     size='large'>
                    { props.numberOfStudents }
                 </Avatar>
                 : null
          }
          <Button onClick={ props.handleAddStudentClick } type='primary'>
             Add New Student +
          </Button>
       </Container>
    </div>
);


export default ComponentFooter
