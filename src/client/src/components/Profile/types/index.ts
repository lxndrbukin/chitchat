import { UserState, FriendRequestsState } from '../../../store';
import { Params } from 'react-router-dom';

interface MatchParams {
  params: Params<string>;
}

export interface ProfileProps extends MatchParams {
  session: UserState;
  user: UserState;
  getUser: Function;
  getCurrentUser: Function;
}

export interface ShortInfoProps {
  session: UserState;
  user: UserState;
  friendRequests: FriendRequestsState;
  sendFriendRequest: Function;
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