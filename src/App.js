import React from 'react';
import List from './components/List/List';
import listSvg from './assets/img/list.svg';
// import './App.css';

function App() {
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={[
          {
            icon: <img src={listSvg} alt="icon" />,
            name: 'Все задачи',
            
          }
        ]} />
        <List items={[
          {
            color: 'green',
            name: 'Покупки'
          },
          {
            color: 'blue',
            name: 'Фронтенд',
            active: true
          },
          {
            color: 'pink',
            name: 'Фильмы и сериалы'
          },
        ]} />
      </div>
      <div className="todo__tasks">

      </div>
    </div>
  );
}

export default App;
