import { UserState } from '../../../store';

export interface ProfileProps {
  currentUser: UserState;
  getCurrentUser: Function;
}

export interface ShortInfoProps {
  currentUser: UserState;
}
