import './App.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  RootState,
  UserProps,
  UserState,
  getCurrentUser,
  getFriendRequests,
} from '../store';
import { Header } from './Header/Header';
import { Profile } from './Profile/Profile';
import { ProfileEdit } from './Profile/ProfileEdit';
import { Login } from './Auth/Login';
import { Signup } from './Auth/Signup';
import { Chat } from './Chats/Chat';

interface AppProps {
  session: UserState;
  getCurrentUser: Function;
  getFriendRequests: Function;
}

class _App extends React.Component<AppProps> {
  componentDidMount(): void {
    this.props.getCurrentUser();
  }

  componentDidUpdate(
    prevProps: Readonly<AppProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    if (this.props.session.loggedIn) {
      this.props.getFriendRequests(
        (this.props.session.userData as UserProps)._id
      );
    }
  }

  render(): JSX.Element {
    return (
      <div className='app'>
        <Header />
        <div className='container'>
          <Routes>
            <Route path='/profile/:userId' element={<Profile />} />
            <Route path='/profile/:userId/edit' element={<ProfileEdit />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/chats/?user=:userId' element={<Chat />} />
          </Routes>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ session }: RootState): { session: UserState } => {
  return {
    session,
  };
};

export const App = connect(mapStateToProps, {
  getCurrentUser,
  getFriendRequests,
})(_App);
