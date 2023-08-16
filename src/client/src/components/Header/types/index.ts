import { UserState } from '../../../store';

export interface HeaderProps {
  session: UserState;
  logoutUser: Function;
}
export interface HeaderProps {
  session: UserState;
  logoutUser: Function;
}

export interface HeaderState {
  showProfileMenu: boolean;
}

export interface HeaderProfileProps {
  session: UserState;
  logoutUser: Function;
}

export interface HeaderProfileState {
  showProfileMenu: boolean;
}