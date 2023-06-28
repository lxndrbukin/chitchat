import './Header.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { RiSearch2Line } from 'react-icons/ri';
import { FiUser, FiUsers } from 'react-icons/fi';
import {
  BsChatDots,
  BsBell,
  BsHouse,
  BsFillChatDotsFill,
} from 'react-icons/bs';

export class Header extends React.Component {
  render(): JSX.Element {
    return (
      <header className='header'>
        <div className='header-section'>
          <Link className='logo' to='/'>
            <BsFillChatDotsFill size={32} />
          </Link>
        </div>
        <div className='header-section'>
          <ul className='header-menu'>
            <li className='header-btn'>
              <Link to='/'>
                <BsHouse size={20} />
              </Link>
            </li>
            <li className='header-btn'>
              <Link to='/friends'>
                <FiUsers size={20} />
              </Link>
            </li>
          </ul>
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
        </div>
        <div className='header-section'>
          <ul className='header-menu'>
            <li className='header-btn'>
              <Link className='profile-link' to='/profile'>
                <FiUser size={20} />
              </Link>
            </li>
            <li className='header-btn'>
              <Link to='/chats'>
                <BsChatDots size={20} />
              </Link>
            </li>
            <li className='header-btn'>
              <div className='notifications'>
                <BsBell size={20} />
              </div>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}
