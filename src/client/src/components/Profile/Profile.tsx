import './Profile.scss';
import React from 'react';
import { ProfileShortInfo } from './ProfileShortInfo';

export class Profile extends React.Component {
  render(): JSX.Element {
    return (
      <div className='profile'>
        <div className='profile-section'>
          <ProfileShortInfo />
        </div>
      </div>
    );
  }
}
