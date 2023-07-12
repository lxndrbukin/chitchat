import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { UserState } from '../../store';
import { ShortInfoProps } from './types';
import { Link } from 'react-router-dom';
import { Button } from '../../assets/components/Button';

class _ProfileShortInfo extends React.Component<ShortInfoProps> {
  render(): JSX.Element {
    const { fullName } = this.props.currentUser.userData;
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
                  {this.props.firstName} {this.props.lastName}
                </span>
              </div>
            </div>
            <div className='header-buttons'>
              <Link to='/profile/edit'>
                <Button buttonType='primary'>Edit Profile</Button>
              </Link>
            </div>
          </div>
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

export const ProfileShortInfo = connect(mapStateToProps)(_ProfileShortInfo);
