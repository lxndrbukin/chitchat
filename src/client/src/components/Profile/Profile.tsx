import './Profile.scss';
import React from 'react';
import { withParams } from '../../assets/hooks';
import { ProfileProps, ProfileState } from './types';
import { ProfileShortInfo } from './ProfileShortInfo';
import { connect } from 'react-redux';
import { getCurrentUser, getUser, RootState, UserState } from '../../store';

class _Profile extends React.Component<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      userId: this.props.params.userId as string,
    };
  }

  componentDidMount(): void {
    this.setState({ userId: this.props.params.userId as string });
    console.log(this.state.userId);
    this.props.getUser(this.state.userId);
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
        <div className='profile-section'>
          {user.userData ? (
            <ProfileShortInfo user={this.props.user} />
          ) : (
            'Loading'
          )}
        </div>
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
