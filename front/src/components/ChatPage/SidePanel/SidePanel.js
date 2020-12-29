import React from 'react';
import UserPanel from './UserPanel';
import Favorited from './Favorited';
import ChatRooms from './ChatRooms';
import DirectMessages from './DirectMessages';

function SidePanel() {
  return (
    <div
      style={{
        background: 'linear-gradient(#ff6465, #7198e5)',
        borderRadius: '4px',
        padding: '2rem',
        minHeight: '100vh',
        color: 'white',
        minWidth: '275px',
      }}
    >
      <UserPanel />
      <Favorited />
      <ChatRooms />
      <DirectMessages />
    </div>
  );
}

export default SidePanel;
