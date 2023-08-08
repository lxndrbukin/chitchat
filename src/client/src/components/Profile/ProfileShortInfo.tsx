import React from 'react';
import { connect } from 'react-redux';
import {
  changeFriendRequestStatus,
  addFriend,
  UserProps,
  RootState,
} from '../../store';
import { ShortInfoProps, RequestAction } from './types';
import { Link } from 'react-router-dom';
import { Button } from '../../assets/components/Button';

class _ProfileShortInfo extends React.Component<ShortInfoProps> {
  changeFriendRequestStatus = (requestAction: string): void => {
    const user = {
      userId: (this.props.user.userData as UserProps)._id,
      firstName: (this.props.user.userData as UserProps).fullName.firstName,
      lastName: (this.props.user.userData as UserProps).fullName.lastName,
    };
    this.props.changeFriendRequestStatus({ ...user, requestAction });
    if (requestAction === RequestAction.Accept) {
      this.props.addFriend(user);
    }
  };

  showSettings(): JSX.Element | null {
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

  showAddFriend(): JSX.Element | null {
    const { loggedIn } = this.props.session;
    const friendRequests = this.props.friendRequests.requests;
    const userId = (this.props.user.userData as UserProps)._id;
    const sessionId = (this.props.session.userData as UserProps)._id;
    if (userId !== sessionId && loggedIn) {
      if (friendRequests.received.filter((req) => req.userId === userId)) {
        return (
          <Button
            onClick={() => this.changeFriendRequestStatus('Accept')}
            buttonType={'primary'}
          >
            Accept
          </Button>
        );
      }
      if (friendRequests.sent.filter((req) => req.userId === userId)) {
        return (
          <Button
            onClick={() => this.changeFriendRequestStatus('Cancel')}
            buttonType={'primary'}
          >
            Cancel
          </Button>
        );
      }
      return (
        <Button
          onClick={() => this.changeFriendRequestStatus('Send')}
          buttonType={'primary'}
        >
          Add Friend
        </Button>
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
            {this.showAddFriend()}
            {this.showSettings()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ session, friendRequests }: RootState) => {
  return {
    session,
    friendRequests,
  };
};

export const ProfileShortInfo = connect(mapStateToProps, {
  changeFriendRequestStatus,
  addFriend,
})(_ProfileShortInfo);
