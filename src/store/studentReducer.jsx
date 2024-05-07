import * as ActionType from "./constants"

const initialState={
    listStudent: [
        {
            maSV: "SV001",
            hoTen: "Nguyễn Văn A",
            phone: "0123456789",
            email: "nguyenvana@gmail.com"
          },
          {
            maSV: "SV002",
            hoTen: "Trần Thị B",
            phone: "0987654321",
            email: "tranthib@gmail.com"
          },
          {
            maSV: "SV003",
            hoTen: "Lê Văn C",
            phone: "0365478921",
            email: "levanc@gmail.com"
          }
    ],
    editStudent: null,
    keyword:""
};
const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SV_SUBMIT:
      const student = action.payload;
      const listStudentClone = [...state.listStudent];
      if (student.maSV) {
        const index = listStudentClone.findIndex((item) => item.maSV === student.maSV);
        if (index !== -1) {
          listStudentClone[index] = student;
        }
      } else {
        const newstu = { ...student, maSV: `SV${Math.floor(Math.random() * 1000)}` };
        listStudentClone.push(newstu);
      }
      return { ...state, listStudent: listStudentClone };

    case ActionType.SV_EDIT:
      return { ...state, editStudent: action.payload };

    case ActionType.SV_DELETE:
      const updatedListStudent = state.listStudent.filter(
        (student) => student.maSV !== action.payload
      );
      return { ...state, listStudent: updatedListStudent };
    case ActionType.KEYWORD_STUDENT:
        state.keyword = action.payload;
        return { ...state };
    default:
      return {...state};
  }
};


export default studentReducer;