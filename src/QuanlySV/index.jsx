import React, { Component } from "react";
import {connect} from "react-redux"
import { actSubmitStudent } from "../store/action";
import StudentList from "./StudentList";
import Search from "./Search";
 class Sinhvien extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        maSV: "",
        hoTen: "",
        phone: "",
        email: "",
      },
      errors: {
        maSV: "",
        hoTen: "",
        phone: "",
        email: "",
      },
    };
  }
  renderStudent=()=>{
    const {student, keyword}=this.props;
    const StudentFilter=student.filter((std)=>{
      return std.hoTen.toLowerCase().indexOf(keyword.toLowerCase()) !==-1;
    })
    return StudentFilter?.map((stu)=>{
      return <StudentList key={stu.maSV} student={stu}/>;
    });
  };
  handleOnchange=(event)=>{
    const { name, value, pattern } = event.target;
    const newValues={...this.state.values, [name]: value};
    let newErrors={...this.state.errors};
    if(!value.trim()){
      newErrors[name]="Vui lòng nhập thông tin";
    } else{
      if(pattern) {
        const regex=new RegExp(pattern);
        const valid =regex.test(value); // dung format: true, sai format:false
        if (!valid) {
          newErrors[name]=`${name} không đúng định dạng`
        }
        else{
          newErrors[name]="";
        }
        
    }
    else {
      // newErrors[name] = "";
      if (value.length <= 4) {
        console.log("Do dai qua ngan");
        newErrors[name] = "Do dai qua ngan";
      } else {
        newErrors[name] = "";
      }
    }
  }
  this.setState({values: newValues, errors: newErrors});
  }
  handleSubmit=(event)=>{
    event.preventDefault();
    let isValid=true;
    Object.values(this.state.errors).forEach((item) => {
      if (item) {
        isValid = false;
      }
    });

    if (isValid) {
      this.props.submitStudent(this.state.values)
      // console.log("values", this.state.values);
    }
  };
  componentDidUpdate(prevProps) {
    // Compare current props with next props
    if (this.props.editstudent !== prevProps.editstudent) {
      const { editstudent } = this.props;
      if (editstudent) {
        this.setState({
          values: {
            maSV: editstudent.maSV,
            hoTen: editstudent.hoTen,
            phone: editstudent.phone,
            email: editstudent.email, // Fixed typo: change 'phone' to 'email'
          },
        });
      } else {
        this.setState({
          values: {
            maSV: "",
            hoTen: "",
            phone: "",
            email: "",
          },
        });
      }
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="mb-3 pl-4 bg-secondary"style={{color: "white",  height: "50px", lineHeight:"40px"}} >Thông tin sinh viên</h2>
            <Search/>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group d-flex">
                <div className="mr-5" style={{ flex: 1 }}>
                <label htmlFor="maSV">Mã SV:</label>
                <input
                  type="text"
                  className="form-control"
                  name="maSV"
                  disabled
                  value={this.state.values.maSV}
                  placeholder="Mã sinh viên"
                 
                />
                </div>
                 <div  style={{ flex: 1 }}>
                 <label htmlFor="hoTen">Họ và Tên:</label>
                <input
                  type="text"
                  className="form-control"
                  name="hoTen"
                  onChange={this.handleOnchange}
                  onBlur={this.handleOnchange}
                  value={this.state.values.hoTen}
                  placeholder="Nhập họ và tên"
                  pattern="^[a-zA-Z\s]+$"
                />
                {errors.hoTen && (
                      <span className="text text-danger">
                        {errors.hoTen}
                      </span>
                    )}
                 </div>
              </div>
              
              <div className="form-group d-flex">
                <div className="mr-5" style={{ flex: 1 }}>
                  <label htmlFor="soDienThoai">Số điện thoại:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    onChange={this.handleOnchange}
                    onBlur={this.handleOnchange}
                    value={this.state.values.phone}
                    placeholder="Nhập số điện thoại"
                    pattern="^(03|05|07|08|09)\d{8}$"
                  />
                  {errors.phone && (
                      <span className="text text-danger">
                        {errors.phone}
                      </span>
                    )}
                </div>
                <div style={{ flex: 1 }}>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={this.handleOnchange}
                    onBlur={this.handleOnchange}
                    value={this.state.values.email}
                    placeholder="Nhập email"
                    pattern="[A-Za-z0-9._%+-]+@gmail\.com"
                  />
                  {errors.email && (
                      <span className="text text-danger">
                        {errors.email}
                      </span>
                    )}
                </div>
              </div>
              <button type="submit" className="btn btn-success">
                Thêm Sinh Viên
              </button>
            </form>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <h2 className="bg-secondary pl-4" style={{color: "white",  height: "50px", lineHeight:"40px"}}>Danh sách sinh viên</h2>
            <table className="table table-secondary text-center">
              <thead>
                <tr>
                  <th scope="col">Mã SV</th>
                  <th scope="col">Họ và Tên</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Email</th>
                  <th scope="col">Action</th>

                </tr>
              </thead>
              <tbody className="text-center">
               {this.renderStudent()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // key: value
    student: state.studentReducer.listStudent,
    editstudent: state.studentReducer.editStudent,
    keyword: state.studentReducer.keyword
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitStudent: (user) => {
      dispatch(actSubmitStudent(user));
    },
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Sinhvien);