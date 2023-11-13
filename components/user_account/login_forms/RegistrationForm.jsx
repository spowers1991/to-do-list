import React, {useState} from 'react';
import Heading from '@/components/html_tags/Heading';

const RegistrationForm = () => {

    // Request statuses for the Add task form (Used for adding classes to the form for user feedback)
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [submissionFailure, setSubmissionFailure] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Registration failed');
    const [pending, setPending] = useState(false);

    return(
        <div className={`bg-white font-inter mx-auto container px-6 sm:px-12 py-12 rounded duration-500`}>  
            <Heading size="h4" className="pb-5">
                {submissionSuccess ? 'You have registered an account...' : 'Register an account'}
            </Heading>
            <form className='w-full mx-auto sm:mr-16 sm:my-auto' name="contact" method="POST" onSubmit={handleFormSubmit}>
                <input type="hidden" name="bot-field" />
                <input className={`bg-[#fff]  rounded block w-full my-8 p-2  border-2 focus:border-[#434bed] hover:border-[#434bed] border-solid focus:border-solid placeholder-shown:border-[#434bed] border-[#434bed] ${pending && 'border-[#ed9043]'} ${submissionSuccess && '!border-[#43ed90]'} ${submissionFailure && '!border-[red]'} placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black`} type="text" id="username" name="username" placeholder='Username' required />
                <input className={`bg-[#fff]  rounded block w-full my-8 p-2  border-2 focus:border-[#434bed] hover:border-[#434bed] border-solid focus:border-solid placeholder-shown:border-[#434bed] border-[#434bed] ${pending && 'border-[#ed9043]'} ${submissionSuccess && '!border-[#43ed90]'} ${submissionFailure && '!border-[red]'} placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black`} type="text" id="email" name="email" placeholder='Email' required />
                <input className={`bg-[#fff]  rounded block w-full my-8 p-2  border-2 focus:border-[#434bed] hover:border-[#434bed] border-solid focus:border-solid placeholder-shown:border-[#434bed] border-[#434bed] ${pending && 'border-[#ed9043]'} ${submissionSuccess && '!border-[#43ed90]'} ${submissionFailure && '!border-[red]'} placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black`} type="password" id="password" name="password" placeholder='Chosen password' required />
                <button className={`flex gap-x-3 items-center submit-button ${submissionSuccess ? '!bg-[#43ed90] !text-[#000] pointer-events-none' : 'bg-[#434bed]'} ${submissionFailure ? 'bg-[red] pointer-events-none' : 'bg-[#434bed]'} ${pending && 'bg-[#ed9043] hover:bg-[#ed9043] '} duration-150 py-3 px-5 text-white rounded uppercase text-[11px] sm:text-xs font-[500] tracking-[1px] text-center" type="submit`}>
                    {!submissionSuccess && !submissionFailure ?
                    pending ?
                    // Pending status
                        <div className='flex gap-x-3 items-center '>
                            Registering account
                            <svg className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z"/></svg>
                        </div> 
                        :
                        // Default status
                        <div className='flex gap-x-3 items-center '>
                            Register
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.568 18.005l-1.414-1.415 4.574-4.59-4.574-4.579 1.414-1.416 5.988 5.995-5.988 6.005z"/></svg>
                        </div>  
                    :
                        submissionSuccess ?
                        // Message SENT successfully status
                        <div className='flex gap-x-3 items-center '>
                            Registration success
                            <svg className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 16.518l-4.5-4.319 1.396-1.435 3.078 2.937 6.105-6.218 1.421 1.409-7.5 7.626z"/></svg>
                        </div>             
                        :
                        // Message FAILED successfully status
                        <div className='flex gap-x-3 items-center '>
                            {errorMessage}
                            <svg className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 5h2v10h-2v-10zm1 14.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/></svg>
                        </div>
                    }
                </button>            
            </form>
        </div>         
    )

    async function handleFormSubmit(event) {

        const encode = (data) => {
            return Object.keys(data).map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])).join('&');
        }

        event.preventDefault();
        
        const formData = [...event.target.elements].filter(element => Boolean(element.name)).reduce((json, element) => {
            json[element.name] = element.value;
            return json;
         }, {});

        setPending(true); // Set loading to true when the form is being submitted
        
        const response = await fetch('/api/authentication/register', {
            method: 'POST',
            body: encode(formData),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        });
        
        if (response.ok) {
            // Form submitted successfully
            setSubmissionSuccess(true)
            setSubmissionFailure(false)
        } else {
            // Handle the error
            setSubmissionFailure(true)
            setSubmissionSuccess(false)
            setErrorMessage('Registration failed');
            if (response.status === 400) {
                // Handle the case where the username or email already exists
                setSubmissionFailure(true);
                setSubmissionSuccess(false);
                setErrorMessage('Username or email already exists');
            }
            setTimeout(() => {
                setSubmissionFailure(false)
                setSubmissionSuccess(false)
                setPending(false)
            }, 2000); 
        }
    }
}



export default RegistrationForm;
