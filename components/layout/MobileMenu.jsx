import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { userSession } from '@/utils/sessionContext';

const MobileMenu = (props) => {

  const router = useRouter();

  // Get user data and functions from the userSession Context Provider
  const { user } = userSession();

  return (
      <div className={`${props.status === 'open' ? 'translate-x-0' : 'translate-x-[100%] round'} duration-300 top-0 left-0 z-20 fixed w-full h-full bg-white lg:hidden mx-auto font-inter px-6 xl:px-6`}>
        <div className="container lg:flex lg:justify-between lg:items-center py-6">
            <div onClick={() => props.mobileMenuState('close')} className='absolute top-6 right-6'>
                Close Menu
            </div>
            {user?.isLoggedIn ?
                <ul className="container flex flex-col lg:-mx-4 pt-32 mx-[auto] px-12">
                    <li onClick={() => props.mobileMenuState('close')} className={`font-semibold text-2xl mb-8 w-[fit-content] lg:mx-4 relative ${(router.asPath === '/my-account') && 'text-[#434bed]'}`}>
                        <Link href="/my-account">
                            My account
                        </Link>
                    </li>
                    <li onClick={() => props.mobileMenuState('close')} className={`font-semibold text-2xl mb-8 w-[fit-content] lg:mx-4 relative `}>
                        <button onClick={() =>{user?.logOut()}}>
                            Log out
                        </button>
                    </li>              
                </ul>
                :
                <ul className="container flex flex-col lg:-mx-4 pt-32 mx-[auto] px-12">
                    <li onClick={() => props.mobileMenuState('close')} className={`font-semibold text-2xl mb-8 w-[fit-content] lg:mx-4 relative ${(router.asPath === '/register') && 'text-[#434bed]'}`}>
                        <Link href="/register">
                            Register
                        </Link>
                    </li>    
                    <li onClick={() => props.mobileMenuState('close')} className={`font-semibold text-2xl mb-8 w-[fit-content] lg:mx-4 relative ${(router.asPath === '/login') && 'text-[#434bed]'}`}>
                        <Link href="/login">
                            Login
                        </Link>
                    </li>           
                </ul>
            }
        </div>
      </div>
  );
};

export default MobileMenu;
