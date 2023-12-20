import React, { CSSProperties } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const FloatingButton = () => {
  const buttonStyle: CSSProperties = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: 'black',
    color: 'white',
    padding: '10px',
    width: '40px', // Set width and height to make the button circular
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={buttonStyle}
    >
      <PlusOutlined />
    </div>
  );
};

export default FloatingButton;
