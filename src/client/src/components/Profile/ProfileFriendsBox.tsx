import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { FriendsBoxProps, FriendProps } from './types';
import { Link } from 'react-router-dom';

export class ProfileFriendsBox extends React.Component<FriendsBoxProps> {
  renderFriends = (): JSX.Element[] => {
    return this.props.friendsList.list.map((friend) => {
      return this.renderFriend(friend);
    });
  };

  renderFriend(friend: FriendProps): JSX.Element {
    const { userId } = friend;
    const { firstName } = friend.fullName;
    return (
      <Link key={userId} to={`/profile/${userId}`} className='profile-friend'>
        <img
          className='avatar'
          style={{ height: '40px' }}
          src='https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif'
        />
        <div className='profile-friend-name'>{firstName}</div>
      </Link>
    );
  }

  render(): JSX.Element {
    return (
      <div className='profile-friends box'>
        <h4 className='profile-box-header'>Friends</h4>
        <div className='profile-friends-list'>{this.renderFriends()}</div>
      </div>
    );
  }
}
