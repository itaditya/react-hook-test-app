import React from 'react';
import { render, queryAllByTestId } from 'react-testing-library';

import { UserProvider } from '../context';
import { PhotoList } from '../components/PhotoList';

describe('Test PhotoList', () => {
  const userPhotos = ['https://test.com/test-1.png', 'https://test.com/test-2.jpg'];
  let wrapper;
  beforeEach(() => {

    wrapper = render(
      <UserProvider value={{ userPhotos }} >
        <PhotoList />
      </UserProvider>
    );
  });

  test('PhotoList is a functional component', () => {
    expect(PhotoList.prototype.isReactComponent).toBeUndefined();
  });

  test('shows all photos', () => {
    const photoItemsElem = queryAllByTestId(wrapper.container, 'photo-item');
    expect(photoItemsElem).toHaveLength(userPhotos.length);
    userPhotos.forEach((photo, index) => {
      const photoItemElem = photoItemsElem[index];
      expect(photoItemElem).toHaveStyle(`background-image: url(${photo})`)
    });
  });
});
