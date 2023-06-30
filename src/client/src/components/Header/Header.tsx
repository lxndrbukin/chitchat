import './Header.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { RiSearch2Line } from 'react-icons/ri';
import { FiUsers } from 'react-icons/fi';
import { BsChatDots, BsBell, BsFillChatDotsFill } from 'react-icons/bs';

export class Header extends React.Component {
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
              <input
                onChange={(e) => console.log(e.target.value)}
                name='search'
                placeholder='Search'
              />
            </form>
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
          </div>
          <div className='header-section'>
            <ul className='header-menu'>
              <li className='header-btn'>
                <Link className='profile-link' to='/profile'>
                  <img
                    className='header-avatar'
                    src='https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif'
                    style={{ width: '32px' }}
                  />
                </Link>
              </li>
              <li className='header-btn'>
                <Link to='/chats'>
                  <BsChatDots size={23} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}
