import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import { UserProvider } from '../context';
import { AddPhoto } from '../components/AddPhoto';
import { PhotoForm } from '../components/PhotoForm';

describe('Test AddPhoto integration with PhotoForm', () => {
  let wrapper, addPhotoMock;
  beforeEach(() => {
    addPhotoMock = jest.fn();

    wrapper = render(
      <UserProvider
        value={{
          addPhoto: addPhotoMock
        }}
      >
        <AddPhoto />
      </UserProvider>
    );
  });

  test('AddPhoto & PhotoForm are functional components', () => {
    expect(AddPhoto.prototype.isReactComponent).toBeUndefined();
    expect(PhotoForm.prototype.isReactComponent).toBeUndefined();
  });

  test('only show add photo btn initially', () => {
    // check add photo btn is rendered
    expect(wrapper.getByTestId('add-photo-btn')).toBeInTheDocument();
  });

  test('show photo form when add photo btn clicked', () => {
    fireEvent.click(wrapper.getByTestId('add-photo-btn'));

    expect(wrapper.queryByTestId('add-photo-btn')).toBeNull();
    expect(wrapper.getByTestId('photo-form')).toBeInTheDocument();
  });

  test('show photo form when add photo btn clicked', () => {
    fireEvent.click(wrapper.getByTestId('add-photo-btn'));

    const photoInputElem = wrapper.getByTestId('photo-input');
    const photoSubmitBtnElem = wrapper.getByTestId('photo-submit-btn');
    
    const photoUrl = 'https://test.com/test.png';

    // enter photo url in input
    fireEvent.change(photoInputElem, { target: { value: photoUrl } });

    // check if url in input is set
    expect(photoInputElem.value).toBe(photoUrl);

    // submit form
    fireEvent.click(photoSubmitBtnElem);

     // check input is again empty
    expect(photoInputElem.value).toBe('');

    // check form is again hidden and add photo btn is visible
    expect(wrapper.queryByTestId('photo-form')).toBeNull();
    expect(wrapper.getByTestId('add-photo-btn')).toBeInTheDocument();

    // check if add photo method on user context was called
    expect(addPhotoMock).toBeCalledWith(photoUrl);
  });
});
