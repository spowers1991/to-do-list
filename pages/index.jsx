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
               <li>Add tags to tasks</li>
               <li>Task completion status</li>
               <li>Order tasks by priority</li>
               <li>Search for tasks based on name and tag names</li>
               <li>Total tasks compared to completed tasks</li>
               <li>Show/hide completed tasks</li>
               <li>Collapse tasks for organisation</li>
               <li>Mobile responsive</li>
            </ul>

            <ul className='text-lg mt-6 list-disc  list-inside'>
                <span className='font-bold'>Potential future features:</span>
                <li>Generate task pages that are unique to each userId based on their tasks array</li>
                <li>Add sub tasks for each task</li>
                <li>Add a projects array</li>
                <li>Drag and drop task ordering</li>
            </ul>
        </div> 
    )
};

export default HomePage;