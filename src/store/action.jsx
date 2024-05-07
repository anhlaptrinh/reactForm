import * as actiontype from "./constants";

const actDeleteStudent = (id) => {
  return {
    type: actiontype.SV_DELETE,
    payload: id,
  };
};
const actSubmitStudent = (sv) => {
  return {
    type: actiontype.SV_SUBMIT,
    payload: sv,
  };
};
const actEditStudent = (sv) => {
    return {
      type: actiontype.SV_EDIT,
      payload: sv,
    };
  };
  const actSearch = (keyword) => {
    return {
      type: actiontype.KEYWORD_STUDENT,
      payload: keyword,
    };
  };
export { actDeleteStudent, actSubmitStudent,actEditStudent, actSearch };
