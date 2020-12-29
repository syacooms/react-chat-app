import React, { useRef } from 'react';
import { IoIosChatboxes } from 'react-icons/io';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import { useSelector } from 'react-redux';
import firebase from '../../../firebase';

function UserPanel() {
  const user = useSelector((state) => state.user.currentUser);

  const inputOpenImageRef = useRef();
  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };

  const handleUploageImage = async (event) => {
    const file = event.target.files[0];

    console.log('file', file);
  };

  return (
    <div>
      {/* Logo */}
      <h3 style={{ color: 'white' }}>
        <IoIosChatboxes />
      </h3>

      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <Image
          src={user && user.photoURL}
          roundedCircle
          style={{ width: '30px', height: '30px', marginTop: '3px' }}
        />

        <Dropdown>
          <Dropdown.Toggle
            style={{ background: 'trnasparent', border: '0px' }}
            id="dropdown-basic"
          >
            {user && user.displayName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleOpenImageRef}>
              프로필 사진 변경
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <input
        onChange={handleUploageImage}
        accept="image/jpeg, image/png"
        type="file"
        style={{ display: 'none' }}
        ref={inputOpenImageRef}
      />
    </div>
  );
}

export default UserPanel;
