import React, { Component, useState, useEffect } from 'react';

import localStorage from '../localStorage';
import { UserProvider } from '../context';

function getUserPhotos(userId) {
  return JSON.parse(localStorage.getItem(userId)) || [];
}

function User({ children }) {
  const [currentUserId, setCurrentUserId] = useState(0);
  const [userPhotos, setUserPhotos] = useState([]);

  useEffect(() => {
    let userId = parseInt(localStorage.getItem('currentUserId'));

    if (!userId) {
      // If there is no userId saved in local storage

      userId = currentUserId;

      // Persist the current userId in local storage
      localStorage.setItem('currentUserId', userId);
    }

    const photos = getUserPhotos(userId);

    setCurrentUserId(userId);
    setUserPhotos(photos);

  }, []);

  function addPhoto(photoUrl) {
    setUserPhotos((oldUserPhotos) => {
      return [...oldUserPhotos, photoUrl];
    })
  }

  const setUserById = (userId) => {
    const oldUserId = currentUserId;
    const oldUserPhotos = userPhotos;

    // store photos of previous user
    const jsonPhotoData = JSON.stringify(oldUserPhotos);
    localStorage.setItem(oldUserId, jsonPhotoData);

    // set new user in local storage
    localStorage.setItem('currentUserId', userId);

    // get photos of new user from local storage
    const photos = getUserPhotos(userId);

    setCurrentUserId(userId);
    setUserPhotos(photos);
  }

  return (
    <UserProvider
      value={{
        currentUserId,
        userPhotos,
        addPhoto,
        setUserById
      }}
    >
      {children}
    </UserProvider>
  );
}

export { User };
