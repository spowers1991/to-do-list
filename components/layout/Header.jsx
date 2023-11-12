import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MobileMenu from './MobileMenu';
import { userSession } from '@/utils/sessionContext';

const Header = (props) => {

// Get user data and functions from the userSession Context Provider
const { user } = userSession();
    
const router = useRouter();

const [openMobileMenu, setOpenMobileMenu] = useState(false);

function mobileMenuState(status) {
    setOpenMobileMenu(status);
}

  return (
      <header className='relative z-30 mx-auto container font-inter px-6'>
        <div className="lg:flex lg:justify-between lg:items-center py-6">
            <div className="flex justify-between items-center">
                <div>
                    <Link href="/" className={`relative font-bold text-2xl`}>
                        To-do List
                    </Link>
                    <p className="text-sm font-light text-gray-600"></p>
                </div>
                <div className="lg:hidden">
                    <div onClick={() => mobileMenuState('open')}>
                        <svg viewBox="0 0 20 20" className="inline-block w-6 h-6" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="none" strokeWidth="1" fill="currentColor" fillRule="evenodd">
                            <g id="icon-shape">
                                <path d="M0,3 L20,3 L20,5 L0,5 L0,3 Z M0,9 L20,9 L20,11 L0,11 L0,9 Z M0,15 L20,15 L20,17 L0,17 L0,15 Z" id="Combined-Shape"></path>
                            </g>
                        </g>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="hidden bg-gray-100 mt-4 p-4 lg:mt-0 lg:p-0 lg:bg-transparent lg:block">
                {user?.isLoggedIn ?
                    <ul className="lg:flex lg:-mx-4">
                        <li className={`lg:mx-4 relative ${(router.asPath === '/my-account') && 'text-[#434bed]'} `}>
                            <Link href="/my-account">
                                My account
                            </Link>
                        </li>
                        <li className={`lg:mx-4 relative ${(router.asPath === '/log-out') && 'text-[#434bed]'}`}>
                            <button onClick={() =>{user?.logOut()}}>
                                Log out
                            </button>
                        </li>
                    </ul>
                :
                    <ul className="lg:flex lg:-mx-4">
                    <li className={`lg:mx-4 relative ${(router.asPath === '/register') && 'text-[#434bed]'}`}>
                        <Link href="/register">
                            Register
                        </Link>
                    </li>
                    <li className={`lg:mx-4 relative ${(router.asPath === '/login') && 'text-[#434bed]'}`}>
                        <Link href="/login">
                            Login
                        </Link>
                    </li>
                </ul>
            }        
            </div>
            <MobileMenu status={openMobileMenu} mobileMenuState={mobileMenuState} globalSettings={props.globalSettings}/>
        </div>
      </header>
  );
};

export default Header;
