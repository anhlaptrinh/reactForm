import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actDeleteStudent, actEditStudent } from '../store/action';
 class StudentList extends Component {
  render() {
    const {student}=this.props;
    return (
      <tr>
        <td>{student.maSV}</td>
        <td>{student.hoTen}</td>
        <td>{student.phone}</td>
        <td>{student.email}</td>
        <td>
          <button className="btn btn-info mr-2" onClick={()=>{this.props.editStudent(student)}}>Edit</button>
          <button className="btn btn-danger" onClick={()=>{this.props.deleteStudent(student.maSV)}}>Delete</button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      // key: value
      deleteStudent: (id) => {
        dispatch(actDeleteStudent(id));
      },
      editStudent: (sv) => {
        dispatch(actEditStudent(sv));
      },
    };
  };
  
  export default connect(null, mapDispatchToProps)(StudentList);

