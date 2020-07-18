import React from 'react';
import ReactDOM from 'react-dom';
import TodoCreator from './components/TodoCreator';
import Search from './components/Search';
import TodoList from './components/TodoList';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TodoList />
      </div>
    );
  }
}

ReactDOM.render(
  <TodoApp />,
  document.getElementById('app')
);