import { SET_CURRENT_CHAT_ROOM } from '../actions/types';

// 로그인 시작시 isLoading true
// 로그인 완료시 false
const initialChatRoomState = {
  currentChatRoom: null,
};

export default function (state = initialChatRoomState, action) {
  switch (action.type) {
    case SET_CURRENT_CHAT_ROOM:
      return {
        ...state,
        currentChatRoom: action.payload,
      };
    default:
      return state;
  }
}
