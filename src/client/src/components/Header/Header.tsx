import './Header.scss';
import React from 'react';
import { connect } from 'react-redux';
import { RootState, UserState, logoutUser } from '../../store';
import { HeaderProps, HeaderState } from './types';
import { Link } from 'react-router-dom';
import { RiSearch2Line } from 'react-icons/ri';
import { FiUsers } from 'react-icons/fi';
import { BsBell, BsFillChatDotsFill } from 'react-icons/bs';
import { HeaderProfile } from './HeaderProfile';

class _Header extends React.Component<HeaderProps, HeaderState> {
  logoutUser = (): void => {
    this.props.logoutUser();
  };

  showMenu(): JSX.Element | null {
    const { loggedIn } = this.props.session;
    if (loggedIn) {
      return (
        <ul className='header-menu'>
          <li className='header-btn'>
            <Link to='/friends'>
              <FiUsers size={23} />
            </Link>
          </li>
          <li className='header-btn'>
            <div className='notifications'>
              <BsBell size={23} />
            </div>
          </li>
        </ul>
      );
    }
    return null;
  }

  render(): JSX.Element {
    return (
      <header className='header-wrapper'>
        <div className='header'>
          <div className='header-section'>
            <Link className='logo' to='/'>
              <BsFillChatDotsFill size={25} />
            </Link>
          </div>
          <div className='header-section'>
            <form className='search'>
              <button>
                <RiSearch2Line size={20} />
              </button>
              <input name='search' placeholder='Search' />
            </form>
            {this.showMenu()}
          </div>
          <div className='header-section'>
            <HeaderProfile
              session={this.props.session}
              logoutUser={this.props.logoutUser}
            />
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ session }: RootState): { session: UserState } => {
  return {
    session,
  };
};

export const Header = connect(mapStateToProps, { logoutUser })(_Header);
