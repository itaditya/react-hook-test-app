import React, { Component, createRef, useRef, useContext } from 'react';

import { UserContext, UserConsumer } from '../context';

function PhotoForm({ onSubmit }) {
  const inputRef = useRef();
  const userContext = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    const photoUrl = inputRef.current.value;
    inputRef.current.value = '';

    userContext.addPhoto(photoUrl);

    onSubmit(event);
  };

  return (
    <form
      className="photo-form"
      onSubmit={handleSubmit}
      data-testid="photo-form"
    >
      <input
        type="url"
        placeholder="Paste Image Url"
        autoFocus
        required
        ref={inputRef}
        data-testid="photo-input"
      />
      <button type="submit" data-testid="photo-submit-btn">Add</button>
    </form>
  );
}

export { PhotoForm };
