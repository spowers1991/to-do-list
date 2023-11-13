import { useState, useEffect } from 'react';
import UpdateTaskForm from './UpdateTaskForm'

const Task = ({ task, deleteTask, updateTask, changeCompletionStatus, updateSuccess, updateFailure, updateaddPending, updateErrorMessage, showUpdateForm, showUpdateTaskForm, setShowUpdateForm, hideCompleted }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async (confirm) => {
    if (confirm) {
      try {
        await deleteTask(task._id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }

    // Reset confirmation state after deletion or cancellation
    setShowConfirmation(false);
  };

  const handleCompletionStatus = async () => {
      try {
        await changeCompletionStatus(task._id);
      } catch (error) {
        console.error('Error updating task:', error);
      }
  };

  // Accordion COLLAPSE tasks 
  const [collapseAccordion, setCollapseAccordion] = useState(true);
  const handleCollapseAccordion = () => {
    setCollapseAccordion((prevValue) => !prevValue);
    showUpdateForm === task._id &&
    setShowUpdateForm('')
  };

  // useEffect to set collapseAccordion when the component mounts
  useEffect(() => {
    // Set collapseAccordion to false if showUpdateForm is equal to task._id
    if (showUpdateForm === task._id) {
      setCollapseAccordion(false);
    }
  }, [showUpdateForm, task._id]);


  return (
    <li className={`font-inter flex flex-col gap-x-3  border-b ${task.completionStatus && 'border-[#43ed90]'} ${(hideCompleted && task.completionStatus)&& 'hidden'}`}>
      <div className="flex flex-col sm:flex-row w-full gap-3">
        <div className='flex flex-col w-full'>
        <span className='flex items-center gap-x-4 lg:gap-x-0'>
          <span onClick={() => handleCollapseAccordion()} className={`cursor-pointer  py-8 flex flex-wrap gap-3 lg:gap-0 w-full gap-x-5 items-center capitalize-first font-bold min-w-[80px] text-lg sm:text-xl `}>
            <span className={`${task.completionStatus && 'line-through'}`}>
              {task.name}
            </span>
            <div className={`flex ${collapseAccordion ? 'block' : 'hidden' } `}> 
              <span className={` ${task?.completionStatus && ' opacity-20'} capitalize text-sm  lg:ml-8 ${task.priorityLabel === 'High' && 'bg-[red]'} py-1 px-3 rounded text-white ${task.priorityLabel === 'Medium' && 'bg-[orange]'} ${task.priorityLabel === 'Low' && 'bg-[#43ed90]'} `}>
                  {task.priorityLabel} 
              </span>
              <span className='flex items-center ext-sm sm:text-base'>
                <span className={`ml-3  text-sm text-white py-1 px-3 rounded ${task.completionStatus ? 'bg-[#43ed90]' : 'bg-[#ed9043]'}`}>
                  {task.completionStatus ? 'Completed' : 'In progress'}
                </span>
              </span>
            </div>
          </span>
          <span onClick={() => handleCollapseAccordion()} className={`cursor-pointer  ml-auto ${collapseAccordion ? 'text-[#000]' : 'text-[#434bed]' } ${task.completionStatus && 'text-[#43ed90]'}`}>
            <svg className={`w-5 h-5 sm:w-5 sm:h-5 ${collapseAccordion ? 'rotate-0' : 'rotate-90'}`} fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.568 18.005l-1.414-1.415 4.574-4.59-4.574-4.579 1.414-1.416 5.988 5.995-5.988 6.005z"/></svg>
          </span>
        </span>

        
        <div className={`${collapseAccordion ? 'hidden' : 'block' } `}>
        <span className={`flex items-center mb-5 `}>
          Priority:
            <span className={`capitalize text-sm  ml-3 ${task.priorityLabel === 'High' && 'bg-[red]'} py-1 px-3 rounded text-white ${task.priorityLabel === 'Medium' && 'bg-[orange]'} ${task.priorityLabel === 'Low' && 'bg-[#43ed90]'} `}>
              {task.priorityLabel} 
            </span>
        </span>
        {task?.tags?.length > 0 &&
          <span className={`flex gap-x-3 items-center  capitalize  break-all mb-5 `}>
            Tags: 
            <span className='flex flex-wrap gap-2'>            
              {task?.tags.map((tag, index) => (
                <span key={index} className='text-sm rounded py-1 px-3 bg-[#9043ed] text-white'>
                  {tag}
                </span>
              ))} 
            </span>
          </span>
        }
        <span className='flex items-center ext-sm sm:text-base'>
          Status:
          <span className={`ml-3  text-sm text-white py-1 px-3 rounded ${task.completionStatus ? 'bg-[#43ed90]' : 'bg-[#ed9043]'}`}>
            {task.completionStatus ? 'Completed' : 'In progress'}
          </span>
        </span>
          <button type="button" onClick={() => showUpdateTaskForm(task._id)} className={`${task.completionStatus && 'pointer-events-none bg-[#43ed90] line-through'} my-8 w-[fit-content] flex items-center gap-x-3 bg-[#434bed]  text-white duration-150 py-[13px] sm:py-[12px] px-5 rounded uppercase text-[11px] sm:text-xs font-[500] tracking-[1px]`}>
              <div className='w-[fit-content] flex items-center gap-3 sm:gap-x-4'>
              {(showUpdateForm === task._id && !task.completionStatus)
                ? 'Hide form'
                : 
                  'Edit task'
              }
              </div>
              <span className='ml-auto'>
                <svg className={`w-4 h-4 sm:w-4 sm:h-4`}  fill="currentColor" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z" fillRule="nonzero"/></svg>
              </span>
          </button>
          <span className={`${task.completionStatus && 'hidden'}`}>
            {(showUpdateForm === task._id) &&
              <UpdateTaskForm task={task} updateTask={updateTask} updateSuccess={updateSuccess} updateFailure={updateFailure} updateaddPending={updateaddPending} updateErrorMessage={updateErrorMessage}  />
            }
          </span>
        <div className={`${showConfirmation ? 'flex flex-row sm:flex-col' : 'flex flex-row '}  sm:flex sm:self-end sm:ml-auto w-full sm:w-1/4 gap-3 mb-8`}>
        <button type="button" onClick={() => handleCompletionStatus(true)} className={`self-end sm:ml-auto w-1/2 sm:w-[fit-content] flex items-center gap-x-3 ${task.completionStatus ? 'bg-[#43ed90]' : 'bg-[#434bed]'} text-white duration-150 py-[13px] sm:py-[14px] px-[20px] sm:px-[22px] rounded uppercase text-[11px] sm:text-xs font-[500] tracking-[1px]`}>
              <div className='w-full sm:w-[fit-content] flex items-center gap-3 sm:gap-x-4'>
                  <span className='sm:hidden'>
                      Complete
                  </span>
                  <span className='ml-auto'>
                      <svg className={`w-4 h-4 sm:w-5 sm:h-5`}  fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 16.518l-4.5-4.319 1.396-1.435 3.078 2.937 6.105-6.218 1.421 1.409-7.5 7.626z"/></svg>
                  </span>
              </div>
          </button>
        {showConfirmation ? (
          <div className='flex flex-col gap-3'>
            <p className='text-right'>Delete this task?</p>
            <div className='flex gap-3 ml-auto w-[fit-content]'>
              <button type="button" onClick={() => handleDelete(true)} className={`self-end sm:self-end w-[fit-content] flex items-center gap-x-3 bg-[red] text-white duration-150 py-[13px] sm:py-[16px] px-5 rounded uppercase text-[11px] sm:text-xs font-[500] tracking-[1px]`}>
                  <div className='w-[fit-content] flex items-center gap-3 sm:gap-x-4'>
                      Yes
                  </div>
              </button>
              <button type="button" onClick={() => handleDelete(false)} className={`self-end w-[fit-content] flex items-center gap-x-3 bg-[#434bed]  text-white duration-150 py-[13px] sm:py-[16px] px-5 rounded uppercase text-[11px] sm:text-xs font-[500] tracking-[1px]`}>
                  <div className='w-[fit-content] flex items-center gap-3 sm:gap-x-4'>
                      No
                  </div>
              </button>
            </div>
          </div>
        ) : (
          <button type="button" onClick={() => setShowConfirmation(true)} className={`self-end sm:self-auto w-1/2 sm:w-[fit-content] flex items-center gap-x-3 bg-[red] text-white duration-150 py-[11px] sm:py-[12px] px-5 rounded uppercase text-[11px] sm:text-xs font-[500] tracking-[1px]`}>
              <div className='w-full sm:w-[fit-content] flex items-center gap-3 sm:gap-x-4'>
                  <span className='sm:hidden'>
                    Delete
                  </span>
                  <span className='ml-auto'>
                      <svg className={`w-5 h-5 sm:w-6 sm:h-6`} fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fillRule="nonzero"/></svg>
                  </span>
              </div>
          </button>
        )}
        </div>
        </div>
      </div> </div>
    </li>
  );
};

export default Task;
