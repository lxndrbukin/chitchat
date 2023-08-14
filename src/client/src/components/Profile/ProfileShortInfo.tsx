import React from 'react';
import { connect } from 'react-redux';
import { UserProps, RootState } from '../../store';
import { ShortInfoProps } from './types';
import { ProfileShortInfoButtons } from './ProfileShortInfoButtons';

class _ProfileShortInfo extends React.Component<ShortInfoProps> {
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
            <ProfileShortInfoButtons />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  session,
  friendRequests,
  friendsList,
}: RootState) => {
  return {
    session,
    friendRequests,
    friendsList,
  };
};

export const ProfileShortInfo = connect(mapStateToProps)(_ProfileShortInfo);
