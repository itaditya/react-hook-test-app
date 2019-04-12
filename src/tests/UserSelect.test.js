import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import { UserProvider } from '../context';
import { UserSelect } from '../components/UserSelect';

describe('Test PhotoList', () => {
  let wrapper, setUserByIdMock;
  const currentUserId = 0;

  beforeEach(() => {
    setUserByIdMock = jest.fn();
    wrapper = render(
      <UserProvider
        value={{
          currentUserId,
          setUserById: setUserByIdMock
        }}
      >
        <UserSelect />
      </UserProvider>
    );
  });

  test('UserSelect is a functional component', () => {
    expect(UserSelect.prototype.isReactComponent).toBeUndefined();
  });

  test('current user is shown as default in select menu', () => {
    const userSelectValue = parseInt(wrapper.queryByTestId('user-select').value);
    expect(userSelectValue).toBe(currentUserId);
  });

  test('change user on selection from menu', () => {
    const newUserId = 1;
    const userSelectElem = wrapper.queryByTestId('user-select');
    const userOptionElem = userSelectElem.querySelector('option');

    fireEvent.change(userOptionElem, { target: { value: newUserId }});
    
    const userSelectValue = parseInt(userSelectElem.value);
    expect(userSelectValue).toBe(newUserId);

    fireEvent.change(userSelectElem);
    expect(setUserByIdMock).toBeCalledWith(newUserId);
  });
});
