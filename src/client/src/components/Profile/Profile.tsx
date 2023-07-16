import './Profile.scss';
import React from 'react';
import { withParams } from '../../assets/hooks';
import { ProfileProps } from './types';
import { ProfileShortInfo } from './ProfileShortInfo';
import { connect } from 'react-redux';
import { getCurrentUser, getUser, RootState, UserProps } from '../../store';

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
    } else if (
      prevProps.user.userData &&
      this.props.params.userId !== (prevProps.user.userData as UserProps)._id
    ) {
      this.props.getUser(this.props.params.userId);
    } else if (this.props.user.userData === undefined) {
      this.props.getUser(this.props.params.userId);
    }
  }

  // componentDidMount(): void {
  //   this.props.getUser(this.props.params.userId);
  // }

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
