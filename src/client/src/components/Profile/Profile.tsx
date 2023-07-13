import './Profile.scss';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { ProfileProps } from './types';
import { ProfileShortInfo } from './ProfileShortInfo';
import { connect } from 'react-redux';
import { getCurrentUser, RootState, UserState, UserProps } from '../../store';

class _Profile extends React.Component<ProfileProps> {
  componentDidUpdate(
    prevProps: Readonly<ProfileProps>,
    prevState: Readonly<{}>
  ): void {
    if (prevProps.currentUser.loggedIn !== this.props.currentUser.loggedIn) {
      this.props.getCurrentUser();
    }
  }

  render(): JSX.Element {
    if (!this.props.currentUser.loggedIn) {
      return <Navigate to='/' />;
    }
    return (
      <div className='profile'>
        <div className='profile-section'>
          <ProfileShortInfo />
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

export const Profile = connect(mapStateToProps, { getCurrentUser })(_Profile);
