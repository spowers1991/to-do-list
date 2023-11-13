import { useState } from 'react';

const AddNewTaskForm = ({ addTask, submissionSuccess, submissionFailure, pending, errorMessage  }) => {

  // State for form input field
  const [name, setname] = useState('');
  const [priority, setPriority] = useState('2');
  const [priorityLabel, setPriorityLabel] = useState('medium'); // Default priority label
  const [tagsInput, setTagsInput] = useState(''); // Input for adding new tags
  const [tags, setTags] = useState([]); // Array to store multiple tags

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTask({ name, priority, priorityLabel, tags });
      // Reset form fields after a successful API request
      setname('');
      setPriority('2');
      setPriorityLabel('medium')
      setTagsInput('');
      setTags([]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleAddTag = () => {
    if (tagsInput.trim() !== '') {
      setTags((prevTags) => [...prevTags, tagsInput.trim()]);
      setTagsInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  const inputClasses = `w-full py-[11px] sm:py-[12px] px-5 sm:text-xs font-[500] tracking-[1px] rounded uppercase text-[11px] bg-[#fff] p-2 border-2 focus:border-[#434bed] hover:border-[#434bed] border-solid focus:border-solid placeholder-shown:border-[#434bed] border-[#434bed] placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black ${pending ? 'border-[#ed9043]' : ''} ${submissionSuccess ? '!border-[#43ed90]' : ''} ${submissionFailure ? '!border-[red]' : ''}`;

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3 my-12 border-b pb-14'>
        <label className='mt-3 font-bold'>
          Task Name: 
        </label>
        <input className={inputClasses} type="text" placeholder='Task name' value={name} onChange={(e) => setname(e.target.value)} required />
    
        <label className='mt-3 font-bold'>
          Priority:
        </label>
        <select className={inputClasses} value={priority} onChange={(e) => {setPriority(e.target.value); setPriorityLabel(e.target.options[e.target.selectedIndex].label)}} >
          <option value="1" label="high">High</option>
          <option value="2" label="medium">Medium</option>
          <option value="3" label="low">Low</option>
        </select>

        <label className='mt-3 font-bold'> 
          Tags:
        </label>
        <div className='flex gap-3 mb-3 '>
          <input
            className={inputClasses}
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="Add tags"
          />
          <button type="button" onClick={handleAddTag} className={`!w-[min-content] flex items-center gap-x-3 ${submissionSuccess ? '!bg-[#43ed90] !text-[#000] pointer-events-none' : 'bg-[#434bed]'} ${submissionFailure ? 'bg-[red] pointer-events-none' : 'bg-[#434bed]'} ${pending && 'bg-[#ed9043] hover:bg-[#ed9043] pointer-event-none'} hover:bg-black duration-150 py-3 px-5 text-white rounded uppercase text-[11px] sm:text-xs font-[500] tracking-[1px] text-center`}>
            <div className='w-full flex items-center gap-3 sm:gap-x-4'>
                <span className='ml-auto'>
                  <svg className={`ml-auto w-5 h-5 sm:w-6 sm:h-6 `} fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm-.747 9.25h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fillRule="nonzero"/></svg>
                </span>
            </div>
          </button>
        </div>
        {tags.length > 0 && (
          <div>
            <strong>Added Tags:</strong>
            <ul className='flex flex-wrap gap-3'>
              {tags.map((tag, index) => (
                <li key={`${tag}-${index}`} className='py-4'>            
                  <button type="button" onClick={() => handleRemoveTag(tag)} className={`w-[fit-content] flex items-center gap-x-3 bg-[#ed9043] text-white hover:bg-black duration-150 py-[46px] sm:py-[8px] px-3  rounded uppercase text-[11px] sm:text-xs font-[500] tracking-[1px]`}>
                    <div className='w-[fit-content] flex items-center gap-2 sm:gap-x-2'>
                        <span className='!text-xs'>{tag}</span>
                        <span className='ml-auto'>
                          <svg className={`w-4 h-4 sm:w-5 sm:h-5`} fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fillRule="nonzero"/></svg>
                        </span>
                    </div>
                </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button type="submit" className={`mt-3 flex gap-x-3 items-center submit-button ${submissionSuccess ? '!bg-[#43ed90] !text-[#000] pointer-events-none' : 'bg-[#434bed]'} ${submissionFailure ? 'bg-[red] pointer-events-none' : 'bg-[#434bed]'} ${pending && 'bg-[#ed9043] hover:bg-[#ed9043] '} hover:bg-black duration-150 py-3 px-5 text-white rounded uppercase text-[11px] sm:text-xs font-[500] tracking-[1px] text-center`}>
            {!submissionSuccess && !submissionFailure ?
            pending ?
            // Pending status
                <div className='w-full flex gap-x-3 items-center '>
                    Adding task
                    <svg className="ml-auto w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z"/></svg>
                </div> 
                :
                // Default status
                <div className='w-full flex gap-x-3 items-center '>
                    Add task
                    <svg className={`ml-auto w-5 h-5 sm:w-6 sm:h-6 `} fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm-.747 9.25h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fillRule="nonzero"/></svg>
                </div>  
            :
                submissionSuccess ?
                // Message SENT successfully status
                <div className='w-full flex gap-x-3 items-center '>
                    Task added 
                    <svg className="ml-auto w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 16.518l-4.5-4.319 1.396-1.435 3.078 2.937 6.105-6.218 1.421 1.409-7.5 7.626z"/></svg>
                </div>             
                :
                // Message FAILED successfully status
                <div className='w-full flex gap-x-3 items-center '>
                    {errorMessage}
                    <svg className="ml-auto w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 5h2v10h-2v-10zm1 14.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/></svg>
                </div>
            }
        </button> 
    </form>
  );
};

export default AddNewTaskForm;
