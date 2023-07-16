import React from 'react';
import { connect } from 'react-redux';
import { UserProps, RootState, UserState } from '../../store';
import { ShortInfoProps } from './types';
import { Link } from 'react-router-dom';
import { Button } from '../../assets/components/Button';

class _ProfileShortInfo extends React.Component<ShortInfoProps> {
  showSettings(): JSX.Element | null {
    const userId = (this.props.user.userData as UserProps)._id;
    const sessionId = (this.props.session.userData as UserProps)._id;
    if (userId === sessionId) {
      return (
        <div className='header-buttons'>
          <Link to='/profile/edit'>
            <Button buttonType='primary'>Edit Profile</Button>
          </Link>
        </div>
      );
    }
    return null;
  }

  showAddFriend(): JSX.Element | null {
    const { loggedIn } = this.props.session;
    const userId = (this.props.user.userData as UserProps)._id;
    const sessionId = (this.props.session.userData as UserProps)._id;
    if (userId !== sessionId && loggedIn) {
      return <Button buttonType={'primary'}>Add Friend</Button>;
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

const mapStateToProps = ({ session }: RootState): { session: UserState } => {
  return {
    session,
  };
};

export const ProfileShortInfo = connect(mapStateToProps)(_ProfileShortInfo);
