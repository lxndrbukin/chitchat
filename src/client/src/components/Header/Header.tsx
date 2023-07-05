import './Header.scss';
import React from 'react';
import { connect } from 'react-redux';
import { RootState, UserState, getCurrentUser } from '../../store';
import { Link } from 'react-router-dom';
import { RiSearch2Line } from 'react-icons/ri';
import { FiUsers, FiLogIn } from 'react-icons/fi';
import { BsChatDots, BsBell, BsFillChatDotsFill } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';

interface HeaderProps {
  currentUser: UserState;
  getCurrentUser: Function;
}

interface HeaderState {
  showProfileMenu: boolean;
}

class _Header extends React.Component<HeaderProps, HeaderState> {
  private profileRef: React.RefObject<HTMLDivElement>;
  constructor(props: HeaderProps) {
    super(props);
    this.profileRef = React.createRef<HTMLDivElement>();
    this.state = {
      showProfileMenu: false,
    };
  }

  handleProfileClick = (): void => {
    this.setState({ showProfileMenu: !this.state.showProfileMenu });
    console.log(this.profileRef.current);
  };

  componentDidMount() {
    if (this.profileRef && this.profileRef.current) {
      this.profileRef.current.addEventListener(
        'click',
        this.handleProfileClick
      );
    }
    this.props.getCurrentUser();
  }

  componentWillUnmount(): void {
    if (this.profileRef && this.profileRef.current) {
      this.profileRef.current.removeEventListener(
        'click',
        this.handleProfileClick
      );
    }
  }

  showProfileMenu(): JSX.Element | null {
    if (this.state.showProfileMenu) {
      return (
        <div className='profile-menu'>
          <ul className='profile-menu-links'>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <li>
              <Link to='/settings'>Settings</Link>
            </li>
            <li>
              <Link to=''>Logout</Link>
            </li>
          </ul>
        </div>
      );
    }
    return null;
  }

  showMenu(): JSX.Element | null {
    const { loggedIn } = this.props.currentUser;
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

  showProfileOrAuth(): JSX.Element {
    const { loggedIn } = this.props.currentUser;
    if (loggedIn) {
      return (
        <ul className='header-menu'>
          <li className='header-btn'>
            <div className='header-profile'>
              <div ref={this.profileRef} className='header-avatar-frame'>
                <img
                  className='header-avatar'
                  src='https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif'
                  style={{ width: '32px' }}
                />
                <BiChevronDown size={20} />
              </div>
              {this.showProfileMenu()}
            </div>
          </li>
          <li className='header-btn'>
            <Link to='/chats'>
              <BsChatDots size={23} />
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <ul className='header-menu'>
        <li className='header-btn'>
          <Link to='/login'>
            <FiLogIn size={23} />
          </Link>
        </li>
      </ul>
    );
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
          <div className='header-section'>{this.showProfileOrAuth()}</div>
        </div>
      </header>
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

export const Header = connect(mapStateToProps, { getCurrentUser })(_Header);
