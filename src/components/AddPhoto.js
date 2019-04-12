import React, { Component, useState } from 'react';

import { PhotoForm } from './PhotoForm';

function AddPhoto() {
  const [formShow, setFormShow] = useState(false);

  function showForm() {
    setFormShow(true);
  }

  function hideForm() {
    setFormShow(false);
  }

  return (
    <li className="add-photo-card">
      {formShow ? (
        <PhotoForm onSubmit={hideForm} />
      ) : (
        <button onClick={showForm} data-testid="add-photo-btn">
          Add Photo
        </button>
      )}
    </li>
  );
}

export { AddPhoto };
