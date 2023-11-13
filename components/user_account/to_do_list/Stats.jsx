const Stats = ({toDoList}) => {

    return (
      <div className='flex flex-col sm:ml-auto gap-x-3 gap-y-1 text-base md:text-lg lg:text-xl mt-12 sm:mt-0 w-full sm:w-auto'>
        <div>
          <span className='font-bold mr-2'>
            Completed tasks: 
          </span>
          {toDoList.filter(task => task.completionStatus).length}
        </div>
        <div>
          <span className='font-bold mr-2'>
            Total tasks: 
          </span>
          {toDoList.length}
        </div>
      </div>
    )
};

export default Stats;