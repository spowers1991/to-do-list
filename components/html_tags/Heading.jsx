
const Heading = ({children, size, className}) => {

    switch(size) {

        case 'h1':
            return <h1 className={`font-inter text-4xl sm:text-5xl md:text-6xl xl:text-6xl 2xl:text-7xl font-bold z-20 mb-12 md:mb-20 leading-[1.1] md:leading-[1] [&_u]:text-[#434bed] [&_u]:underline ${className ? className : ""}`}>{children}</h1>
        case 'h2':
            return <h2 className={`font-inter  text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold z-20 mb-12 md:mb-20 leading-[1.1] md:leading-[1] [&_u]:text-[#434bed] [&_u]:underline ${className ? className : ""}`}>{children}</h2>
        case 'h3':
            return <h3 className={`font-inter  text-3xl sm:text-4xl md:text-5xl font-bold z-20 leading-[1.1] md:leading-[1] [&_u]:text-[#434bed] [&_u]:underline ${className ? className : ""}`}>{children}</h3>
        case 'h4':
            return <h4 className={`font-inter  text-3xl sm:text-3xl md:text-4xl font-bold z-20 leading-[1.1] md:leading-[1] [&_u]:text-[#434bed] [&_u]:underline ${className ? className : ""}`}>{children}</h4>
        default:
            return null
    }

}

export default Heading