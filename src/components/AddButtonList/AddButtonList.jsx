import React, { useState } from 'react';
import List from '../List/List';
import Badge from '../Badge/Badge';

import addPng from '../../assets/img/add.png';
import closeSvg from '../../assets/img/close.svg';

import './AddButtonList.scss';

const AddButtonList = ({colors}) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

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
        <img onClick={() => setVisiblePopup(false)} src={closeSvg} alt="close icon" className="add-list__popup-close-btn" />
        <input className='field' type="text" placeholder='Название папки' />
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
        <button className='button'>Добавить</button>
      </div>)}
    </div>
  );
};

export default AddButtonList;