import { UserState } from '../../../store';
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
  sendFriendRequest: Function;
}

export interface ProfileState {
  userId: string;
}