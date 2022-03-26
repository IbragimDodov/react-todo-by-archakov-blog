import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from './components/List/List';
import AddButtonList from './components/AddButtonList/AddButtonList';
import Tasks from './components/Tasks/Tasks';
import listSvg from './assets/img/list.svg';

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  
  // const [lists, setLists] = useState(db.lists.map(item => {
  //   item.color = db.colors.filter(color => color.id === item.colorId)[0].name;
  //   return item;
  // }));

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks')
    .then(({data}) => {
      setLists(data);
    });
    axios.get('http://localhost:3001/colors')
    .then(({data}) => {
      setColors(data);
    });
  }, []);

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
        {lists ? (
          <List
            items={lists}
            onRemove={(id) => {
              const newList = lists.filter(item => item.id !== id);
              setLists(newList);
            }}
            isRemovable/>
          ) : (
            'Loading...'
          )}
        {/* <List items={db.lists} isRemovable /> */}
        <AddButtonList onAdd={onAddList} colors={colors}/>
      </div>
      <div className="todo__tasks">
        {lists && <Tasks list={lists[1]} />}
      </div>
    </div>
  );
}

export default App;
