import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../assets/components/Button';

export class ProfileShortInfo extends React.Component {
  render(): JSX.Element {
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
                <span className='full-name'>John Doe</span>
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
