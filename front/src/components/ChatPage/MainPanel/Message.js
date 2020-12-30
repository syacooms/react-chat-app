import React from 'react';
import Media from 'react-bootstrap/Media';
import moment from 'moment';

function Message({ message, user }) {
  const timeFromNow = (timestamp) => {
    return moment(timestamp).fromNow();
  };

  const isImage = (message) => {
    return (
      message.hasOwnProperty('image') && !message.hasOwnProperty('content')
    );
  };

  const isMessageMine = (message, user) => {
    return message.user.id === user.uid;
  };
  return (
    <div>
      <Media style={{ marginBottom: '3px' }}>
        <img
          style={{ borderRadius: '10px' }}
          width={48}
          height={48}
          className="mr-3"
          src={message.user.image}
          alt={message.user.name}
        />
        <Media.Body
          style={{ backgroundColor: isMessageMine(message, user) && '#ECECEC' }}
        >
          <h6>
            {message.user.name}{' '}
            <span style={{ fontsize: '10px', color: 'grey' }}>
              {timeFromNow(message.timestamp)}
            </span>
          </h6>
          {isImage(message) ? (
            <img
              style={{ maxWidth: '300px' }}
              alt="이미지"
              src={message.image}
            />
          ) : (
            <p>{message.content}</p>
          )}
        </Media.Body>
      </Media>
    </div>
  );
}

export default Message;
