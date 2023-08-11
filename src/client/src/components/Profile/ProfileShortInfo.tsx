import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  changeFriendRequestStatus,
  addFriend,
  UserProps,
  RootState,
} from '../../store';
import { ShortInfoProps } from './types';
import { Button } from '../../assets/components/Button';
import { CgSpinner } from 'react-icons/cg';
import { BsFillPersonCheckFill } from 'react-icons/bs';

class _ProfileShortInfo extends React.Component<ShortInfoProps> {
  changeFriendRequestStatus = (requestAction: string): void => {
    const user = {
      userId: (this.props.user.userData as UserProps)._id,
      firstName: (this.props.user.userData as UserProps).fullName.firstName,
      lastName: (this.props.user.userData as UserProps).fullName.lastName,
    };
    this.props.changeFriendRequestStatus({ ...user, requestAction });
    if (requestAction === 'Accept') {
      this.props.addFriend(user);
    }
  };

  renderSettings(): JSX.Element | null {
    const userId = (this.props.user.userData as UserProps)._id;
    const sessionId = (this.props.session.userData as UserProps)._id;
    if (userId === sessionId) {
      return (
        <div className='header-buttons'>
          <Link to={`/profile/${sessionId}/edit`}>
            <Button buttonType='primary'>Edit Profile</Button>
          </Link>
        </div>
      );
    }
    return null;
  }

  renderAcceptButton(): JSX.Element {
    return (
      <Button
        onClick={() => this.changeFriendRequestStatus('Accept')}
        buttonType={'primary'}
      >
        Accept
      </Button>
    );
  }

  renderLoadingSpinner(): JSX.Element {
    return (
      <Button style={{ height: '34px' }} buttonType={'primary'}>
        <CgSpinner size={20} />
      </Button>
    );
  }

  renderCancelButton(): JSX.Element {
    return (
      <Button
        onClick={() => this.changeFriendRequestStatus('Cancel')}
        buttonType={'primary'}
      >
        Cancel
      </Button>
    );
  }

  renderAddFriendButton(): JSX.Element {
    return (
      <Button
        onClick={() => this.changeFriendRequestStatus('Send')}
        buttonType={'primary'}
      >
        Add Friend
      </Button>
    );
  }

  renderAddedFriendButton(): JSX.Element {
    return (
      <Button buttonType={'primary'}>
        <BsFillPersonCheckFill size={20} />
      </Button>
    );
  }

  renderFriendButton(): JSX.Element | null {
    const { loggedIn } = this.props.session;
    const loadingReqs = this.props.friendRequests.loading;
    const { received, sent } = this.props.friendRequests.requests;
    const friendsList = this.props.friendsList.list;
    const userId = (this.props.user.userData as UserProps)._id;
    const sessionId = (this.props.session.userData as UserProps)._id;
    if (userId !== sessionId && loggedIn) {
      if (loadingReqs) {
        return this.renderLoadingSpinner();
      }
      if (received.filter((req) => req.userId === userId).length > 0) {
        return this.renderAcceptButton();
      }
      if (sent.filter((req) => req.userId === userId).length > 0) {
        return this.renderCancelButton();
      }
      if (friendsList && friendsList.length !== 0) {
        console.log('friend');
        if (
          friendsList.filter((friend) => friend.userId === sessionId).length > 0
        ) {
          return this.renderAddedFriendButton();
        }
      }
      return this.renderAddFriendButton();
    }
    return null;
  }

  renderMessageButton(): JSX.Element | null {
    const { loggedIn } = this.props.session;
    const userId = (this.props.user.userData as UserProps)._id;
    const sessionId = (this.props.session.userData as UserProps)._id;
    if (loggedIn && userId !== sessionId) {
      return (
        <Link to={`/chats?user=${userId}`}>
          <Button buttonType={'primary'}>Message</Button>
        </Link>
      );
    }
    return null;
  }

  render(): JSX.Element {
    const { loading } = this.props.user;
    const { fullName } = this.props.user.userData as UserProps;
    return (
      <div className='short-info box'>
        <div className='short-info-header'>
          <img
            className='avatar'
            src='https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif'
            alt=''
          />
          <div className='short-info-data'>
            <div className='short-info-data-rows'>
              <div className='short-info-data-row'>
                <span className='full-name'>
                  {loading || !fullName ? '' : fullName.firstName}{' '}
                  {loading || !fullName ? '' : fullName.lastName}
                </span>
              </div>
            </div>
            <div className='short-info-buttons'>
              {this.renderMessageButton()}
              {this.renderFriendButton()}
              {this.renderSettings()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  session,
  friendRequests,
  friendsList,
}: RootState) => {
  return {
    session,
    friendRequests,
    friendsList,
  };
};

export const ProfileShortInfo = connect(mapStateToProps, {
  changeFriendRequestStatus,
  addFriend,
})(_ProfileShortInfo);
