import { useState, useEffect } from 'react';
import Task from '@/components/user_account/to_do_list/Task';
import AddNewTaskForm from '@/components/user_account/to_do_list/AddNewTaskForm';
import Heading from '@/components/html_tags/Heading'
import Filters from '@/components/user_account/to_do_list/Filters';
import Stats from '@/components/user_account/to_do_list/Stats';

const ToDoList = ({ user, userId }) => {

  // Tasks array
  const [toDoList, setToDoList] = useState([]);
  const [filteredToDoList, setFilteredToDoList] = useState([]);
  
  // Tasks loading state
  const [loading, setLoading] = useState(false);

  // Request add states
  const [addSuccess, setAddSuccess] = useState(false);
  const [addFailure, setAddFailure] = useState(false);
  const [addErrorMessage, setAddErrorMessage] = useState('Registration failed');
  const [addPending, setAddPending] = useState(false);

  // Request update states 
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateFailure, setUpdateFailure] = useState(false);
  const [updateErrorMessage, setUpdateErrorMessage] = useState('Update failed');
  const [updatePending, setUpdatePending] = useState(false);

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

  useEffect(() => {
    // Fetch the to-do list when the component mounts
    fetchToDoListItems();
  }, [userId]);

  
  // Api request to ADD a new task
  const addTask = async (newTask) => {
    setAddPending(true)
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
      setAddSuccess(true)
      setAddFailure(false)
    } catch (error) {
      console.error('Error adding task:', error);
      setAddSuccess(false)
      setAddFailure(true)
      setAddErrorMessage('Request failed');
    }
    setTimeout(() => {
      // A small delay to display response messages
      setAddSuccess(false)
      setAddFailure(false)
      setAddPending(false)
  }, 2000); 
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
  
  // Track the update form that is currently active
  const [showUpdateForm, setShowUpdateForm] = useState('');
  const showUpdateTaskForm = (taskId) => {
    if(showUpdateForm === taskId) {
      setShowUpdateForm('')
    }
      else {
        setShowUpdateForm(taskId)
    }
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
      <AddNewTaskForm 
        addTask={addTask} 
        addSuccess={addSuccess} 
        addFailure={addFailure} 
        addPending={addPending} 
        addErrorMessage={addErrorMessage}
      />
      <div className="flex flex-col sm:flex-row mb-6 items-center">
          <Filters 
            hideCompleted={hideCompleted} 
            handleHideCompletedTasks={handleHideCompletedTasks} 
            toDoList={toDoList}
            filteredToDoList={filteredToDoList}
            setFilteredToDoList={setFilteredToDoList}
            setToDoList={setToDoList}
          />
          <Stats 
            toDoList={toDoList}
          />
      </div>
      {!loading ?
        <ul className='flex flex-col'>
          {filteredToDoList && filteredToDoList.map((task) => (
            <Task
              key={task._id}
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
              setShowUpdateForm={setShowUpdateForm}
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
