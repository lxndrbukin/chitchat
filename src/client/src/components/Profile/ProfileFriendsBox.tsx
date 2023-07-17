import React from 'react';

export class ProfileFriendsBox extends React.Component {
  render(): JSX.Element {
    return (
      <div className='profile-friends box'>
        <h4 className='profile-box-header'>Friends</h4>
        <div className='profile-friends'></div>
      </div>
    );
  }
}
