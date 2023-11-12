import Link from 'next/link';

const Button = ({ href, color, children, className, newTab, selected }) => {    

    let bgColor = '';
    let svgIcon = null
    if (color === 'purple') {
        bgColor = 'bg-[#9043ed] text-white';
        svgIcon = (
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor"  clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m20.998 8.498h-17.996c-.569 0-1.001.464-1.001.999 0 .118-.105-.582 1.694 10.659.077.486.496.842.988.842h14.635c.492 0 .911-.356.988-.842 1.801-11.25 1.693-10.54 1.693-10.66 0-.558-.456-.998-1.001-.998zm-.964-3.017h-16.03c-.524 0-1.001.422-1.001 1.007 0 .081-.01.016.14 1.01h17.752c.152-1.012.139-.931.139-1.009 0-.58-.469-1.008-1-1.008zm-15.973-1h15.916c.058-.436.055-.426.055-.482 0-.671-.575-1.001-1.001-1.001h-14.024c-.536 0-1.001.433-1.001 1 0 .056-.004.043.055.483z" fillRule="nonzero"/></svg>
        );
    } else if (color === 'green') {
        bgColor = 'bg-[#43ed90] text-[#000] hover:text-[#fff]';
        svgIcon = (
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 12c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm-18.005-1.568l1.415-1.414 4.59 4.574 4.579-4.574 1.416 1.414-5.995 5.988-6.005-5.988z"/></svg>
        );
}     else if (color === 'orange') {
        bgColor = 'bg-[#ed9043] text-[#fff] hover:text-[#fff]';
        svgIcon = (
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z"/></svg>
        );
    } else {
        bgColor = 'bg-[#434bed] text-white';
        svgIcon = (
            <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${selected && 'rotate-90'}`} fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.568 18.005l-1.414-1.415 4.574-4.59-4.574-4.579 1.414-1.416 5.988 5.995-5.988 6.005z"/></svg>
        );
    }

    return (
        href && 
            <Link href={href} target={newTab === true ? '_blank' : null} className={`${className} flex items-center gap-x-3 ${bgColor} ${selected && '!bg-black'} hover:bg-black duration-150 py-[11px] sm:py-[12px] px-5  rounded uppercase text-[11px] sm:text-xs font-[500] tracking-[1px]`}>
                <div className='flex items-center gap-3 sm:gap-x-4'>
                    {children} 
                    {svgIcon && svgIcon}
                </div>
            </Link>
    )
}

export default Button;