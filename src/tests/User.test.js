import React, { useContext } from 'react';
import { render, fireEvent, firstResultOrNull } from 'react-testing-library';

import localStorage from '../localStorage';
import { UserContext } from '../context';
import { User } from '../components/User';

describe('Test User', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <User>
        <TestComponent />
      </User>
    );
  });

  test('renders children components', () => {
    expect(wrapper.getByTestId('user-driver')).toBeInTheDocument();
  });

  test('actual localStorage is updated', () => {
    const addPhotoBtnElem = wrapper.getByTestId('add-photo-btn');
    const setUserBtnElem = wrapper.getByTestId('set-user-btn');

    expect(localStorage.store).toMatchSnapshot();

    fireEvent.click(addPhotoBtnElem, {
      target: { photoUrl: 'https://test.com/test-1.png' }
    });
    fireEvent.click(setUserBtnElem, {
      target: { userId: 1 }
    });

    expect(localStorage.store).toMatchSnapshot();

    fireEvent.click(addPhotoBtnElem, {
      target: { photoUrl: 'https://test.com/test-2.png' }
    });
    fireEvent.click(setUserBtnElem, {
      target: { userId: 0 }
    });

    expect(localStorage.store).toMatchSnapshot();

    fireEvent.click(setUserBtnElem, {
      target: { userId: 1 }
    });

    expect(localStorage.store).toMatchSnapshot();

    wrapper.rerender();

    expect(localStorage.store).toMatchSnapshot();
  });

  test('changes user id', () => {
    return;
    const userId = 1;
    const oldUserId = 0;
    const oldUserPhotos = localStorage.getItem(oldUserId) || '[]';

    localStorage.setItem = jest.fn();

    expect(wrapper.getByTestId('user-id')).toHaveTextContent(oldUserId);

    fireEvent.click(wrapper.getByTestId('set-user-btn'));
    
    expect(wrapper.getByTestId('user-id')).toHaveTextContent(userId);
  });
});

function TestComponent() {
  const userContext = useContext(UserContext);
  return (
    <div data-testid="user-driver">
      Current User:
      <p
        data-testid="user-id"
      >
        {userContext.currentUserId}
      </p>
      Current User:
      <ul>
        {userContext.userPhotos.map((photo, index) => (
          <li
            key={index}
            className="photo"
            style={{ backgroundImage: 'url(' + photo + ')' }}
            data-testid="photo-item"
          />
        ))}
      </ul>
      <button
        onClick={(event) => userContext.setUserById(event.target.userId)}
        data-testid="set-user-btn"
      >
        Set User By Id
      </button>
      <button
        onClick={(event) => userContext.addPhoto(event.target.photoUrl)}
        data-testid="add-photo-btn"
      >
        Set User By Id
      </button>
    </div>
  );
}
