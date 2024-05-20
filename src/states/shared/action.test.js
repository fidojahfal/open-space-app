import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { asyncPopulateUsersAndTalks } from './action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { receiveTalksActionCreator } from '../talks/action';
import { receiveUsersActionCreator } from '../users/action';
import api from '../../utils/api';

const fakeTalksResponse = [
  {
    id: 'talk-1',
    text: 'Talk Test 1',
    user: 'user-1',
    replyTo: '',
    likes: [],
    createdAt: '2022-09-22T10:06:55.588Z',
  },
];

const fakeUsersResponse = [
  {
    id: 'user-1',
    name: 'User Test 1',
    photo: 'https://generated-image-url.jpg',
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong!');

describe('asyncPopulateUsersAndTalks thunk', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllTalks = api.getAllTalks;
  });
  afterEach(() => {
    api.getAllTalks = api._getAllTalks;
    api.getAllUsers = api._getAllUsers;

    delete api._getAllTalks;
    delete api._getAllUsers;
  });
  it('should dispatch action correctly when data fetching success', async () => {
    api.getAllTalks = () => Promise.resolve(fakeTalksResponse);
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);

    const dispatch = vi.fn();

    await asyncPopulateUsersAndTalks()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveTalksActionCreator(fakeTalksResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveUsersActionCreator(fakeUsersResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    api.getAllTalks = () => Promise.reject(fakeTalksResponse);
    api.getAllUsers = () => Promise.reject(fakeUsersResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncPopulateUsersAndTalks()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse[0]);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
