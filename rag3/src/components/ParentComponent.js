import React, { useState } from 'react';
import Register from './Register';

const ParentComponent = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openRegister = () => {
    setIsRegisterOpen(true);  // Open Register form
  };

  const closeRegister = () => {
    setIsRegisterOpen(false);  // Close Register form
  };

  return (
    <div>
      <button onClick={openRegister}>Register</button>  {/* Open Register form */}
      {isRegisterOpen && <Register onClose={closeRegister} />} {/* Conditional rendering */}
    </div>
  );
};

export default ParentComponent;
