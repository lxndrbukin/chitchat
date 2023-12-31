import { UserState, FriendRequestsState, FriendsListState } from '../../../store';
import { Params } from 'react-router-dom';

interface MatchParams {
  params: Params<string>;
}

export interface ProfileProps extends MatchParams {
  session: UserState;
  user: UserState;
  friendsList: FriendsListState;
  friendRequests: FriendRequestsState;
  getUser: Function;
  getCurrentUser: Function;
  getFriendsList: Function;
  getFriendRequests: Function;
}

export interface ShortInfoProps {
  session: UserState;
  user: UserState;
  friendRequests: FriendRequestsState;
  friendsList: FriendsListState;
}

export interface ShortInfoButtonsProps extends ShortInfoProps {
  changeFriendRequestStatus: Function;
  changeFriendStatus: Function;
}

export interface ShortInfoButtonsState {
  showFriendSettings: boolean;
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

export interface EditFormProps {

}

export interface FriendsBoxProps {
  friendsList: FriendsListState;
}

export interface FriendProps {
  userId: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
}