import './Profile.scss';
import React from 'react';
import { ProfileShortInfo } from './ProfileShortInfo';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../store';
import { RootState } from '../../store';
import { UserState } from '../../store/slices/userSlice';

interface ProfileProps {
  currentUser: UserState;
  getCurrentUser: Function;
}

class _Profile extends React.Component<ProfileProps> {
  componentDidMount(): void {
    this.props.getCurrentUser();
    console.log(this.props.currentUser);
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
