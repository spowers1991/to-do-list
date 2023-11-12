import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Dashboard from "@/components/user_account/Dashboard";
import { userSession } from '@/utils/sessionContext';

const Register = () => {
  const router = useRouter();

  // Get user data and functions from the userSession Context Provider
  const { user } = userSession();

  useEffect(() => {
    // Check if the user is logged in
    if (user.isLoggedIn) {
      // Redirect to another page
      router.push('/my-account'); // Replace '/dashboard' with the path you want to redirect to
    }
  }, [user.isLoggedIn, router]);

    return (
        <div className="py-8 md:py-16"> 
            <Dashboard />
        </div> 
    )
};

export default Register;