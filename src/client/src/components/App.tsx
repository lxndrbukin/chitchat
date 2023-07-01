import './App.scss';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { Header } from './Header/Header';
import { Profile } from './Profile/Profile';
import { Login } from './Auth/Login';

export class App extends React.Component {
  render(): JSX.Element {
    return (
      <div className='app'>
        <Header />
        <div className='container'>
          <Routes>
            <Route path='/profile' element={<Profile />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </div>
    );
  }
}
