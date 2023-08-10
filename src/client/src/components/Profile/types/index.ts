import { UserState, FriendRequestsState, FriendsListState } from '../../../store';
import { Params } from 'react-router-dom';

interface MatchParams {
  params: Params<string>;
}

export interface ProfileProps extends MatchParams {
  session: UserState;
  user: UserState;
  getUser: Function;
  getCurrentUser: Function;
  getFriendsList: Function;
}

export interface ShortInfoProps {
  session: UserState;
  user: UserState;
  friendRequests: FriendRequestsState;
  friendsList: FriendsListState;
  changeFriendRequestStatus: Function;
  addFriend: Function;
}

export interface ProfileState {
  userId: string;
}

export interface InputProps {
  name: string;
  label: string;
  placeholder: string;
}

export interface FormState {
  fieldValues: {
    [key: string]: string;
  };
  empty: {
    [key: string]: boolean;
  };
}

export enum RequestAction {
  Accept = 'Accept',
  Decline = 'Decline',
  Send = 'Send',
  Cancel = 'Cancel'
}

export interface EditFormProps {

}