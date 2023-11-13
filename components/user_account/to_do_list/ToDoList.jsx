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

  return (
    <div className=' sm:bg-white sm:p-12 rounded'>
      <Heading size="h3">
        Tasks for {user?.data?.username}
      </Heading>
      <AddNewTaskForm addTask={addTask} submissionSuccess={submissionSuccess} submissionFailure={submissionFailure} pending={pending} errorMessage={errorMessage}/>
      <div className="flex flex-col sm:flex-row mb-6 items-center">
        <div className='flex flex-wrap gap-3 '>
          <button onClick={handleReorderClick} className={`bg-[#434bed] flex gap-x-3 items-center submit-button hover:bg-black duration-150 py-3 px-5 text-white rounded uppercase text-[11px] sm:text-xs font-[500] tracking-[1px] text-center`}>
            Reorder by Priority ({sortOrder === 'asc' ? 'Ascending' : sortOrder === 'desc' ? 'Descending' : 'Unordered'})
          </button>
            <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Enter search query"
            className="px-6 uppercase text-[11px] sm:text-xs font-[500] tracking-[1px] bg-[#fff] w-[fit-content] rounded block  p-2  border-2 focus:border-[#434bed] hover:border-[#434bed] border-solid focus:border-solid placeholder-shown:border-[#434bed] border-[#434bed] ${pending && 'border-[#ed9043]'} placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black"
          />
        </div>
        <div className='flex flex-col sm:ml-auto gap-x-3 gap-y-1 text-sm sm:text-xl mt-12 sm:mt-0 w-full sm:w-auto'>
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
            />
          ))}
        </ul>
      :
        <div className='font-inter text-2xl mt-12 text-center'>
          Loading tasks...
        </div>
      }
      {(filteredToDoList.length === 0 && !loading) &&
      <div className='font-inter text-2xl mt-12 text-center'>
        Add some tasks
      </div>
      }
    </div>
  );
};

export default ToDoList;
