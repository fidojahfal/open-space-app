import api from "../../utils/api";
import { receiveUsersActionCreator } from "../users/action";
import { receiveTalksActionCreator } from "../talks/action";
import { hideLoading, showLoading } from "react-redux-loading-bar";

function asyncPopulateUsersAndTalks() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      const talks = await api.getAllTalks();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveTalksActionCreator(talks));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export { asyncPopulateUsersAndTalks };
