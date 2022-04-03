import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '../List/List';
import Badge from '../Badge/Badge';

import addPng from '../../assets/img/add.png';
import closeSvg from '../../assets/img/close.svg';

import './AddButtonList.scss';

const AddButtonList = ({colors, onAdd}) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(3);
  const [isLoading ,setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    setSelectedColor(colors[0].id);
  };

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const addList = () => {
    if (!inputValue) {
      alert('Введите название списка');
      return;
    }
    setIsLoading(true);
    axios
      .post('http://localhost:3001/colors', { 
        "name": inputValue,
        "colorId": selectedColor
      })
      .then(({data}) => {
        const color = colors.filter(c => c.id === selectedColor)[0];
        const listObj = {...data, color, tasks: []};
        onAdd(listObj);
        onClose();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className='add-list'>
      <List onClick={() => setVisiblePopup(true)} items={[
        {
          className: 'list__add-button',
          icon: <img src={addPng} alt="icon" />,
          name: 'Добавить список'
        }
      ]}/>
      {visiblePopup && (<div className="add-list__popup">
        <img
          onClick={onClose}
          src={closeSvg}
          alt="close icon" className="add-list__popup-close-btn" /> 
        <input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className='field'
          type="text"
          placeholder='Название папки' />
        <div className="add-list__popup-colors">
          {
            colors.map(color => (
              <Badge
                onClick={() => setSelectedColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && 'active'}
                />
            ))
          }
        </div>
        <button onClick={addList} className='button'>
          {isLoading ? 'Adding...' : 'Добавить'}
        </button>
      </div>)}
    </div>
  );
};

export default AddButtonList;