import axios from 'axios';
import React, { useState } from 'react';
import addPng from '../../assets/img/add.png';

function AddTaskForm({list, onAddTask}) {

  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState();

  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue('');
  }

  const addTask = () => {
    const obj = {
      "listId": list.id,
      "text": inputValue,
      "completed": false
    };
    setIsLoading(true);
    axios.post('http://localhost:3001/tasks', obj).then(({data}) => {
      console.log(data);
      onAddTask(list.id, data);
      toggleFormVisible();
    })
    .finally(() => {
      setIsLoading(false);
    });
    
  }

  return (

    <div className="tasks__form">
      {!visibleForm ? <div onClick={toggleFormVisible} className="tasks__form-new">
        <img src={addPng} alt="plus icon" />
        <span>Новая задача</span>
      </div> : <div className="tasks__form-block">
        <input
          value={inputValue}
          className='field'
          type="text"
          placeholder='Текст задачи'
          onChange={e => setInputValue(e.target.value)}
          />
        <button disabled={isLoading} onClick={addTask} className='button'>
          {isLoading ? 'Добавление...' : 'Добавить задачу'}
        </button>
        <button onClick={toggleFormVisible} className='button button--grey'>
          Отмена
        </button>
      </div>}
    </div>
  )
}

export default AddTaskForm;