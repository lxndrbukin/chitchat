import './App.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState, UserState } from '../store';
import { Header } from './Header/Header';
import { Profile } from './Profile/Profile';
import { Login } from './Auth/Login';
import { Signup } from './Auth/Signup';

interface AppProps {
  currentUser: UserState;
}

class _App extends React.Component<AppProps> {
  render(): JSX.Element {
    return (
      <div className='app'>
        <Header />
        <div className='container'>
          <Routes>
            <Route path='/profile' element={<Profile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  currentUser,
}: RootState): { currentUser: UserState } => {
  return {
    currentUser,
  };
};

export const App = connect(mapStateToProps)(_App);
