import { UserState } from '../../../store';

export interface HeaderProps {
  session: UserState;
  logoutUser: Function;
}

export interface HeaderState {
  showProfileMenu: boolean;
}