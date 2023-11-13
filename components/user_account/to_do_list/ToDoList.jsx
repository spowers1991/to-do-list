import { useState, useEffect } from 'react';
import Task from '@/components/user_account/to_do_list/Task';
import AddNewTaskForm from '@/components/user_account/to_do_list/AddNewTaskForm';
import Heading from '@/components/html_tags/Heading'

const ToDoList = ({ user, userId }) => {

  // Tasks array
  const [toDoList, setToDoList] = useState([]);
  
  // Request submission status
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionFailure, setSubmissionFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Registration failed');
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(false);

  // Request update status 
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateFailure, setUpdateFailure] = useState(false);
  const [updateErrorMessage, setUpdateErrorMessage] = useState('Update failed');
  const [updatePending, setUpdatePending] = useState(false);

  // State to track the sorting order
  const [sortOrder, setSortOrder] = useState('unordered'); // 'asc' or 'desc'

  // Api request to FETCH ALL existing task
  const fetchToDoListItems = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/users/${userId}/to-do-list/fetch`);
      const data = await response.json();

      // Update the state with the fetched to-do list items
      setToDoList(data.toDoListItems || []);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching to-do list items:', error);
    }
  };

  // Api request to FETCH ALL existing task
  useEffect(() => {
    // Fetch the to-do list when the component mounts
    fetchToDoListItems();
  }, [userId]);

  
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
  const handleResetButtonClick = () => {
    setSearchQuery('');
  };


  // Api request to ADD a new task
  const addTask = async (newTask) => {
    setPending(true)
    try {
      const response = await fetch(`/api/users/${userId}/to-do-list/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
      // Update the state with the newly added task
      setToDoList((prevList) => [...prevList, newTask]);
      // fetch items after a new one has been added to make sure we have the IDs of the new tasks
      fetchToDoListItems()
      setSubmissionSuccess(true)
      setSubmissionFailure(false)
    } catch (error) {
      console.error('Error adding task:', error);
      setSubmissionSuccess(false)
      setSubmissionFailure(true)
      setErrorMessage('Request failed');
    }
    setTimeout(() => {
      // A small delay to display response messages
      setSubmissionSuccess(false)
      setSubmissionFailure(false)
      setPending(false)
  }, 2000); 
  };

  // Track the update form that is active
  const [showUpdateForm, setShowUpdateForm] = useState('');
  const showUpdateTaskForm = (taskId) => {
    if(showUpdateForm === taskId) {
      setShowUpdateForm('')
    }
      else {
        setShowUpdateForm(taskId)
    }
  };

  // Api request to UPDATE an existing task
  const updateTask = async (updatedTask) => {
    setUpdatePending(true)
    try {
      const response = await fetch(`/api/users/${userId}/to-do-list/update/${updatedTask.taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      // Update the state with the updated task
      setToDoList((prevList) =>
        prevList.map((task) => (task._id === updatedTask._id ? { ...task, ...updatedTask } : task))
      );
      setUpdateSuccess(true)
      setUpdateFailure(false)
    } catch (error) {
      console.error('Error updating task:', error);
      setUpdateSuccess(false)
      setUpdateFailure(true)
      setUpdateErrorMessage('Request failed');
    }
    setTimeout(() => {
      // A small delay to display response messages
      setUpdateSuccess(false)
      setUpdateFailure(false)
      setUpdatePending(false)
      fetchToDoListItems()
  }, 1000); 
  };

  // Api request to DELETE an existing task
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`/api/users/${userId}/to-do-list/delete/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      // Update the state by filtering out the deleted task
      setToDoList((prevList) => prevList.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // API request for UPDATING the COMPLETION STATUS of a task
  const changeCompletionStatus = async (taskId) => {
    try {
      const response = await fetch(`/api/users/${userId}/to-do-list/completionStatus/${taskId}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
  
      // Update the completion status without fetching the entire list
      setToDoList((prevList) =>
        prevList.map((task) =>
          task._id === taskId ? { ...task, completionStatus: !task.completionStatus } : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };


  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered tasks based on search query
  const filteredToDoList = toDoList.filter(
    (task) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.priorityLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Hide completed tasks 
  const [hideCompleted, setHideCompleted] = useState(false);
  const handleHideCompletedTasks = () => {
    setHideCompleted((prevValue) => !prevValue);
  };

  return (
    <div className=' sm:bg-white sm:p-12 rounded'>
      <Heading size="h3">
        Tasks for {user?.data?.username}
      </Heading>
      <AddNewTaskForm addTask={addTask} submissionSuccess={submissionSuccess} submissionFailure={submissionFailure} pending={pending} errorMessage={errorMessage}/>
      <div className="flex flex-col sm:flex-row mb-6 items-center">
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
        <div className='flex flex-col sm:ml-auto gap-x-3 gap-y-1 text-base md:text-lg lg:text-xl mt-12 sm:mt-0 w-full sm:w-auto'>
          <div className='font-inter '>
            <span className='font-bold mr-2'>
              Completed tasks: 
            </span>
            {toDoList.filter(task => task.completionStatus).length}
          </div>
          <div className='font-inter '>
            <span className='font-bold mr-2'>
              Total tasks: 
            </span>
            {toDoList.length}
          </div>
        </div>
      </div>
      {!loading ?
        <ul className='flex flex-col'>
          {filteredToDoList && filteredToDoList.map((task, index) => (
            <Task
              key={index}
              task={task}
              userId={userId}
              updateTask={updateTask}
              deleteTask={deleteTask}
              changeCompletionStatus={changeCompletionStatus}
              updateSuccess={updateSuccess}
              updateFailure={updateFailure}
              updatePending={updatePending}
              updateErrorMessage={updateErrorMessage}
              showUpdateForm={showUpdateForm}
              showUpdateTaskForm={showUpdateTaskForm}
              hideCompleted={hideCompleted}
            />
          ))}
        </ul>
      :
        <div className='font-inter text-2xl mt-12 text-center'>
          Loading tasks...
        </div>
      }
      {(filteredToDoList.length === 0 && !loading) &&
      <div className='font-inter text-lg sm:text-2xl mt-12 text-center'>
        No tasks found...
      </div>
      }
    </div>
  );
};

export default ToDoList;
