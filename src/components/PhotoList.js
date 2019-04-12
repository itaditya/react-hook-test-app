import React, { useContext } from 'react';

import { UserContext, UserConsumer } from '../context';

function PhotoList() {
  const userContext = useContext(UserContext);
  return userContext.userPhotos.map((photo, index) => (
    <li
      key={index}
      className="photo"
      style={{ backgroundImage: 'url(' + photo + ')' }}
      data-testid="photo-item"
    />
  ));
}

export { PhotoList };
