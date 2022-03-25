import React, { useState } from 'react';
import List from './components/List/List';
import listSvg from './assets/img/list.svg';
import AddButtonList from './components/AddButtonList/AddButtonList';

import db from './assets/db.json';
import Tasks from './components/Tasks/Tasks';

function App() {
  const [lists, setLists] = useState(db.lists.map(item => {
    item.color = db.colors.filter(color => color.id === item.colorId)[0].name;
    return item;
  }));

  const onAddList = obj => {
    const newList = [ ...lists, obj ];
    setLists(newList);
  };

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={[
          {
            icon: <img src={listSvg} alt="icon" />,
            name: 'Все задачи',
          }
        ]} />
        <List items={lists} onRemove={() => alert(1)} isRemovable/>
        {/* <List items={db.lists} isRemovable /> */}
        <AddButtonList onAdd={onAddList} colors={db.colors}/>
      </div>
      <div className="todo__tasks">
        <Tasks/>
      </div>
    </div>
  );
}

export default App;
