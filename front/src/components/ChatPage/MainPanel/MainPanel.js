import React, { Component } from 'react';
import MessageHeader from './MessageHeader';
import Message from './Message';
import MessageForm from './MessageForm';
import { connect } from 'react-redux';
import firebase from '../../../firebase';
import { setUserPosts } from '../../../redux/actions/chatRoom_action';

export class MainPanel extends Component {
  state = {
    messages: [],
    messagesRef: firebase.database().ref('messages'),
    messagesLoading: true,
    searchTerm: '',
    searchResults: [],
    searchLoading: false,
    typingRef: firebase.database().ref('typing'),
    typingUsers: [],
  };

  componentDidMount() {
    const { chatRoom } = this.props;

    if (chatRoom) {
      this.addMessagesListeners(chatRoom.id);
      this.addTypingListeners(chatRoom.id);
    }
  }

  addTypingListeners = (chatRoomId) => {
    // typing이 새로 들어올 때
    let typingUsers = [];
    this.state.typingRef.child(chatRoomId).on('child_added', (DataSnapshot) => {
      if (DataSnapshot.key !== this.props.user.uid) {
        typingUsers = typingUsers.concat({
          id: DataSnapshot.key,
          name: DataSnapshot.val(),
        });
        this.setState({ typingUsers });
      }
    });

    // typing을 지워줄 때
    this.state.typingRef
      .child(chatRoomId)
      .on('child_removed', (DataSnapshot) => {
        const index = typingUsers.findIndex(
          (user) => user.id === DataSnapshot.key,
        );
        if (index !== -1) {
          typingUsers = typingUsers.filter(
            (user) => user.id !== DataSnapshot.key,
          );
          this.setState({ typingUsers });
        }
      });
  };

  handleSearchMessages = () => {
    const chatRoomMessages = [...this.state.messages];
    const regex = new RegExp(this.state.searchTerm, 'gi');
    const searchResults = chatRoomMessages.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    this.setState({ searchResults });
  };

  handleSearchChange = (event) => {
    this.setState(
      {
        searchTerm: event.target.value,
        searchLoading: true,
      },
      () => this.handleSearchMessages(),
    );
  };

  addMessagesListeners = (chatRoomId) => {
    let messagesArray = [];
    this.state.messagesRef
      .child(chatRoomId)
      .on('child_added', (DataSnapshot) => {
        messagesArray.push(DataSnapshot.val());
        this.setState({ messages: messagesArray, messagesLoading: false });
      });
    this.userPostsCount(messagesArray);
  };

  userPostsCount = (messages) => {
    let userPosts = messages.reduce((acc, message) => {
      if (message.user.name in acc) {
        acc[message.user.name].count += 1;
      } else {
        acc[message.user.name] = {
          image: message.user.image,
          count: 1,
        };
      }
      return acc;
    }, {});
    this.props.dispatch(setUserPosts(userPosts));
  };

  renderMessages = (messages) =>
    messages.length > 0 &&
    messages.map((message) => (
      <Message
        key={message.timeStamp}
        message={message}
        user={this.props.user}
      />
    ));

  renderTypingUsers = (typingUsers) =>
    typingUsers.length > 0 &&
    typingUsers.map((user) => (
      <span>{user.name}님이 채팅을 입력하고 있습니다...</span>
    ));

  render() {
    const { messages, searchTerm, searchResults, typingUsers } = this.state;
    return (
      <div style={{ padding: '2rem 2rem 0 2rem' }}>
        <MessageHeader handleSearchChange={this.handleSearchChange} />

        <div
          style={{
            width: '100%',
            height: '450px',
            border: '.2rem solid #ececec',
            borderRadius: '4px',
            padding: '1rem',
            marginBottom: '1rem',
            overflowY: 'auto',
          }}
        >
          {searchTerm
            ? this.renderMessages(searchResults)
            : this.renderMessages(messages)}
          {this.renderTypingUsers(typingUsers)}
        </div>

        <MessageForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    chatRoom: state.chatRoom.currentChatRoom,
  };
};

export default connect(mapStateToProps)(MainPanel);
