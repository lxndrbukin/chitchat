import React from 'react';
import { connect } from 'react-redux';
import { ShortInfoProps } from './types';
import {
  UserProps,
  RootState,
  changeFriendRequestStatus,
  changeFriendStatus,
} from '../../store';
import { Link } from 'react-router-dom';
import { CgSpinner } from 'react-icons/cg';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { FiChevronDown } from 'react-icons/fi';
import { Button } from '../../assets/components/Button';

class _ProfilShortInfoButtons extends React.Component<ShortInfoProps> {
  state = {
    showFriendSettings: false,
  };

  changeFriendRequestStatus = (requestAction: string): void => {
    const user = {
      userId: (this.props.user.userData as UserProps)._id,
      firstName: (this.props.user.userData as UserProps).fullName.firstName,
      lastName: (this.props.user.userData as UserProps).fullName.lastName,
    };
    this.props.changeFriendRequestStatus({ ...user, requestAction });
    if (requestAction === 'Accept') {
      this.props.changeFriendStatus({ ...user, requestAction: 'Add' });
    }
  };

  removeFriend = (): void => {
    const user = {
      userId: (this.props.user.userData as UserProps)._id,
      firstName: (this.props.user.userData as UserProps).fullName.firstName,
      lastName: (this.props.user.userData as UserProps).fullName.lastName,
    };
    this.props.changeFriendStatus({ ...user, requestAction: 'Remove' });
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
      <Button
        onMouseOver={() => this.setState({ showFriendSettings: true })}
        buttonType={'primary'}
      >
        <BsFillPersonCheckFill size={20} />
        <FiChevronDown size={20} />
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

  renderFriendSettings(): JSX.Element | null {
    if (this.state.showFriendSettings) {
      return (
        <div className='short-info-friend-settings'>
          <button onClick={this.removeFriend}>Remove</button>
        </div>
      );
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
    return <div className='short-info-buttons'></div>;
  }
}

const mapStateToProps = ({
  session,
  user,
  friendRequests,
  friendsList,
}: RootState) => {
  return {
    session,
    user,
    friendRequests,
    friendsList,
  };
};

export const ProfileShortInfoButtons = connect(mapStateToProps, {
  changeFriendRequestStatus,
  changeFriendStatus,
})(_ProfilShortInfoButtons);
