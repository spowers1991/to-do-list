import Heading from '@/components/html_tags/Heading'

const HomePage = () => {
    return (
        <div className="font-inter container mx-auto px-6 py-16 md:py-28"> 
            <Heading size="h1">
                Hello
            </Heading>
            <p className='text-lg'>
                Please <span className='underline'>register</span> with your own credentials and then login to access the to-do-list..
            </p>
            <ul className='text-lg mt-3 list-disc  list-inside'>
               <li>Next.js</li>
               <li>Serverless functions</li>
               <li>Document-oriented database</li>
            </ul>

            <ul className='text-lg mt-6 list-disc  list-inside'>
                <span className='font-bold'>Features:</span>
               <li>User registration and authentication</li>
               <li>Create tasks</li>
               <li>Edit tasks</li>
               <li>Delete tasks</li>
               <li>Set tasks priority</li>
               <li>Add searchable tags for each task</li>
               <li>Task completion</li>
               <li>Order tasks by priority</li>
               <li>Search for task based on name and tag names</li>
               <li>Total task compared to completed tasks</li>
               <li>Mobile responsive</li>
            </ul>
        </div> 
    )
};

export default HomePage;