import React, { Component } from 'react';
import { FaRegSmile } from 'react-icons/fa';
import firebase from '../../../firebase';
import { connect } from 'react-redux';
import {
  setCurrentChatRoom,
  setPrivateChatRoom,
} from '../../../redux/actions/chatRoom_action';
export class DirectMessages extends Component {
  state = {
    usersRef: firebase.database().ref('users'),
    users: [],
    activeChatRoom: '',
  };

  componentDidMount() {
    if (this.props.user) {
      this.addUsersListeners(this.props.user.uid);
    }
  }

  addUsersListeners = (currentUserId) => {
    const { usersRef } = this.state;
    let usersArray = [];
    //child가 생길 때 리스너가 데이터를 가져온다.
    usersRef.on('child_added', (DataSnapshot) => {
      // 로그인 아이디랑 스냅샷 key 정보가 다를 경우에만 redux에서 users 정보를 가져온다.
      if (currentUserId !== DataSnapshot.key) {
        let user = DataSnapshot.val();
        user['uid'] = DataSnapshot.key;
        user['status'] = 'offline';
        usersArray.push(user);
        this.setState({ users: usersArray });
      }
    });
  };

  // 리스너에서 만든 users 정보로 chatRoom 아이디를 생성.
  changeChatRoom = (user) => {
    const chatRoomId = this.getChatRoomId(user.uid);
    const chatRoomData = {
      id: chatRoomId,
      name: user.name,
    };
    this.props.dispatch(setCurrentChatRoom(chatRoomData));
    this.props.dispatch(setPrivateChatRoom(true));
    this.setActiveChatRoom(user.uid);
  };

  setActiveChatRoom = (userId) => {
    this.setState({ activeChatRoom: userId });
  };

  getChatRoomId = (userId) => {
    const currentUserId = this.props.user.uid;

    return userId > currentUserId
      ? `${userId}/${currentUserId}`
      : `${currentUserId}/${userId}`;
  };

  renderDirectMessages = (users) =>
    users.length > 0 &&
    users.map((user) => (
      <li
        style={{
          cursor: 'pointer',
          backgroundColor:
            user.uid === this.state.activeChatRoom && '#ffffff45',
        }}
        key={user.uid}
        onClick={() => this.changeChatRoom(user)}
      >
        # {user.name}
      </li>
    ));

  render() {
    const { users } = this.state;
    return (
      <div>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <FaRegSmile style={{ marginRight: 3 }} /> DIRECT MESSAGES
        </span>

        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {this.renderDirectMessages(users)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(DirectMessages);
