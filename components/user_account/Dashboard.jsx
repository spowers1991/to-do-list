import React, { useState } from 'react';
import Button from '@/components/html_tags/Button';
import RegistrationForm from "@/components/user_account/login_forms/RegistrationForm"
import LoginForm from "@/components/user_account/login_forms/LoginForm"
import ToDoList from "@/components/user_account/to_do_list/ToDoList"
import { useRouter } from 'next/router';
import { userSession } from '@/utils/sessionContext';

const Dashboard = () => {

    // Determine the current pages slug
    const router = useRouter();

    // if the user is on a login or registration url then use that form, else default to the registration form
    const [showForm, setShowForm] = useState(router.asPath === '/login' ? 'login' : 'register');

    // Get user data and functions from the userSession Context Provider
    const { user } = userSession();

    return (
        <div className='container mx-auto px-6'>
            {user?.isLoggedIn ?
                <div>
                    <ToDoList user={user} userId={user?.data?.userId}/>
                </div>
                :
                <div className='max-w-3xl mx-auto'> 
                    <div className='text-center mt-5 flex gap-5 sm:mb-12 px-6 sm:px-0'>
                        <Button href="/register" selected={((router.asPath === '/register' || router.asPath === '/my-account') && true)}>
                            Register
                        </Button>
                        <Button href="/login" selected={(router.asPath === '/login' && true)}>
                            Login
                        </Button>
                    </div>
                {showForm === "register" &&
                    <RegistrationForm />
                }
                {showForm === "login" &&
                    <LoginForm logIn={user.logIn}/>
                }
                </div>           
            }
        </div> 
    )
};

export default Dashboard;