import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

const ModalState = ({ children }) => {
  const [modOpen, setModOpen] = useState(false);

  const handleOpen = () => setModOpen(true);
  const handleClose = () => setModOpen(false);

  return (
    <ModalContext.Provider value={{ modOpen, handleClose, handleOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalState;
