import './Profile.scss';
import React from 'react';
import { ProfileShortInfo } from './ProfileShortInfo';
import { connect } from 'react-redux';
import { getCurrentUser, RootState, UserState } from '../../store';

interface ProfileProps {
  currentUser: UserState;
  getCurrentUser: Function;
}

class _Profile extends React.Component<ProfileProps> {
  componentDidMount(): void {
    // this.props.getCurrentUser();
  }

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

const mapStateToProps = ({
  currentUser,
}: RootState): { currentUser: UserState } => {
  return {
    currentUser,
  };
};

export const Profile = connect(mapStateToProps, { getCurrentUser })(_Profile);
