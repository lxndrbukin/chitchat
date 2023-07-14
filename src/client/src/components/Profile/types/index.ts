import { UserState } from '../../../store';

interface MatchParams {
  userId: string;
}


export interface ProfileProps {
  currentUser: UserState;
  getCurrentUser: Function;
}

export interface ShortInfoProps {
  currentUser: UserState;
}
