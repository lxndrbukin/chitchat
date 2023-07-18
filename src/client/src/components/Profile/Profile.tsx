import './Profile.scss';
import React from 'react';
import { withParams } from '../../assets/hooks';
import { ProfileProps } from './types';
import { connect } from 'react-redux';
import { getCurrentUser, getUser, RootState, UserProps } from '../../store';
import { ProfileShortInfo } from './ProfileShortInfo';
import { ProfilePosts } from './ProfilePosts';
import { ProfileFriendsBox } from './ProfileFriendsBox';

class _Profile extends React.Component<ProfileProps> {
  constructor(props: ProfileProps) {
    super(props);
  }

  componentDidUpdate(
    prevProps: Readonly<ProfileProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    if (this.props.params.userId !== prevProps.params.userId) {
      this.props.getUser(this.props.params.userId);
    }
  }

  render(): JSX.Element {
    const { session, user } = this.props;
    if (user) {
      if (session.loading) {
        return <div>Loading</div>;
      }
    }
    return (
      <div className='profile'>
        {user.userData ? (
          <div className='profile-section'>
            <ProfileShortInfo user={this.props.user} />
            <div className='profile-section-left'>
              <ProfilePosts />
            </div>
            <div className='profile-section-right'>
              <ProfileFriendsBox />
            </div>
          </div>
        ) : (
          'Loading'
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ session, user }: RootState) => {
  return {
    session,
    user,
  };
};

export const Profile = connect(mapStateToProps, { getCurrentUser, getUser })(
  withParams(_Profile)
);
