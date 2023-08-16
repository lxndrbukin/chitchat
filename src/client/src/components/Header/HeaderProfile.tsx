import React from 'react';
import { UserProps } from '../../store';
import { HeaderProfileProps, HeaderProfileState } from './types';
import { Link } from 'react-router-dom';
import { RiSearch2Line } from 'react-icons/ri';
import { FiUsers, FiLogIn } from 'react-icons/fi';
import { BsChatDots, BsBell, BsFillChatDotsFill } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';

export class HeaderProfile extends React.Component<
  HeaderProfileProps,
  HeaderProfileState
> {
  private profileFrame: React.RefObject<HTMLDivElement>;
  private profileMenu: React.RefObject<HTMLDivElement>;
  constructor(props: HeaderProfileProps) {
    super(props);
    this.profileFrame = React.createRef<HTMLDivElement>();
    this.profileMenu = React.createRef<HTMLDivElement>();
    this.state = {
      showProfileMenu: false,
    };
  }

  componentDidMount = (): void => {
    document.addEventListener('click', this.handleOutsideClick);
  };

  logoutUser = (): void => {
    this.props.logoutUser();
  };

  handleInsideClick = () => {
    this.setState({ showProfileMenu: !this.state.showProfileMenu });
  };

  handleOutsideClick = (e: MouseEvent): void => {
    if (
      this.profileFrame &&
      !this.profileFrame.current?.contains(e.target as Element) &&
      !this.profileMenu.current?.contains(e.target as Element)
    ) {
      this.setState({ showProfileMenu: false });
    }
  };

  renderProfileMenu(): JSX.Element | null {
    if (this.props.session.userData) {
      const { _id } = this.props.session.userData as UserProps;
      if (this.state.showProfileMenu) {
        return (
          <div ref={this.profileMenu} className='profile-menu'>
            <ul className='profile-menu-links'>
              <li>
                <Link onClick={this.handleInsideClick} to={`/profile/${_id}`}>
                  Profile
                </Link>
              </li>
              <li>
                <Link onClick={this.handleInsideClick} to='/settings'>
                  Settings
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    this.logoutUser();
                    this.handleInsideClick();
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        );
      }
    }
    return null;
  }

  render(): JSX.Element {
    const { loggedIn } = this.props.session;
    if (loggedIn) {
      return (
        <ul className='header-menu'>
          <li className='header-btn'>
            <div className='header-profile'>
              <div
                ref={this.profileFrame}
                onClick={this.handleInsideClick}
                className='header-avatar-frame'
              >
                <img
                  className='header-avatar'
                  src='https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif'
                  style={{ width: '32px' }}
                />
                <BiChevronDown size={20} />
              </div>
              {this.renderProfileMenu()}
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
}
