import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import List from './components/List/List';
import AddButtonList from './components/AddButtonList/AddButtonList';
import Tasks from './components/Tasks/Tasks';
import listSvg from './assets/img/list.svg';

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  
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

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  };

  const onEditListTitle = (id, title) => {
    const newList = lists.map(item => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  };

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={[
          {
            active: true,
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
            onClickItem={item => {
              setActiveItem(item);
            }}
            activeItem={activeItem}
            isRemovable/>
          ) : (
            'Loading...'
          )}
        <AddButtonList onAdd={onAddList} colors={colors}/>
      </div>
      <div className="todo__tasks">
        <Route>
          {lists && 
            lists.map(list => (
              <Tasks
                list={list}
                onAddTask={onAddTask}
                onEditTitle={onEditListTitle}
                withoutEmpty/>
            ))}
        </Route>
        <Route path='/lists/:id'>
          {lists && activeItem && (<Tasks
            list={activeItem}
            onEditTitle={onEditListTitle}
            onAddTask={onAddTask}
            />)}
        </Route>
      </div>
    </div>
  );
}

export default App;
