import { useState, useEffect } from 'react';

const Filters = ({ hideCompleted, handleHideCompletedTasks, toDoList, setToDoList, setFilteredToDoList }) => {
 
  // State to track the sorting order
  const [sortOrder, setSortOrder] = useState('unordered'); // 'asc' or 'desc'

  // Function to handle the reorder button click
  const handleReorderClick = () => {
    const sortedList = [...toDoList];

    // Sort the list based on priority
    sortedList.sort((taskA, taskB) => {
      if (sortOrder === 'asc') {
        return taskA.priority.localeCompare(taskB.priority);
      } else {
        return taskB.priority.localeCompare(taskA.priority);
      }
    });

    // Update the state with the sorted list
    setToDoList(sortedList);

    // Toggle the sortOrder for the next click
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
 
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Effect to update the filtered to-do list when the search query changes
  useEffect(() => {
    setFilteredToDoList(
      toDoList.filter(
        (task) =>
          task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.priorityLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );
  }, [searchQuery, toDoList, setFilteredToDoList]);

  const handleResetButtonClick = () => {
    setSearchQuery('');
  };

  return (
    <div className='flex flex-wrap gap-3 '>
          <button onClick={handleReorderClick} className={`w-full sm:w-auto bg-[#434bed] flex gap-x-3 items-center submit-button duration-150  py-[0.8rem] sm:py-[0.85rem] px-5 text-white rounded uppercase text-[11px] sm:text-xs font-[500] tracking-[1px] text-center`}>
            Reorder by Priority ({sortOrder === 'asc' ? 'Ascending' : sortOrder === 'desc' ? 'Descending' : 'Unordered'})
            <span className='ml-auto'>
              <svg className={`w-[1.1rem]  h-[1.1rem]  sm:w-[1.1rem]  sm:h-[1.1rem] ${sortOrder === 'asc' && 'rotate-180'} ${sortOrder === 'desc' && 'rotate-0'}  ${sortOrder === 'unordered' && '-rotate-90'}`} fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 12c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm-18.005-1.568l1.415-1.414 4.59 4.574 4.579-4.574 1.416 1.414-5.995 5.988-6.005-5.988z"></path></svg>
            </span>
          </button>
          <button onClick={handleHideCompletedTasks} className={`w-full sm:w-auto bg-[#434bed] flex gap-x-3 items-center submit-button duration-150 py-[0.55rem] sm:py-[0.69rem] px-5 text-white rounded uppercase text-[11px] sm:text-xs font-[500] tracking-[1px] text-center`}>
            {hideCompleted ? 'Show completed tasks' : 'Hide completed tasks'}
            <span className='ml-auto'>
              {hideCompleted ?
                <svg className={`w-6 h-6 sm:w-6 sm:h-6`} fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.318 1.83c.967.943 1.804 2.013 2.475 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.298 0-2.553-.313-3.73-.849l2.624-2.307c.352.102.724.156 1.108.156 2.208 0 4-1.792 4-4 0-.206-.016-.408-.046-.606zm-4.932.467c-.678-.528-1.53-.843-2.455-.843-2.208 0-4 1.792-4 4 0 .741.202 1.435.553 2.03l1.16-1.019c-.137-.31-.213-.651-.213-1.011 0-1.38 1.12-2.5 2.5-2.5.474 0 .918.132 1.296.362z" fillRule="nonzero"/></svg>
              :
                <svg className={`w-6 h-6 sm:w-7 sm:h-6`} fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm.002 3c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z" fillRule="nonzero"/></svg>
              }
              </span>
          </button>
          <div className='flex w-full sm:w-auto'>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Enter search query"
              className="w-full px-6 text-sm font-[500] tracking-[1px] bg-[#fff] sm:w-[fit-content] rounded block py-[0.56rem] sm:py-[0.69rem]  border-t-2 border-l-2 border-b-2 focus:border-[#434bed] hover:border-[#434bed] border-solid focus:border-solid placeholder-shown:border-[#434bed] border-[#434bed] ${pending && 'border-[#ed9043]'} placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black"
            />
            <button className={`bg-[#434bed] relative left-[-2px] rounded-r px-5 py-1 text-white uppercase text-[11px] sm:text-xs font-[500] tracking-[1px]`} onClick={handleResetButtonClick}>Reset</button>
          </div>
        </div>
    )
};

export default Filters;