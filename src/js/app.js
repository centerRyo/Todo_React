import React from 'react';
import ReactDOM from 'react-dom';
import TodoCreator from './components/TodoCreator';
import Search from './components/Search';
import TodoList from './components/TodoList';
import _ from 'lodash';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: this.createHashId(),
          text: 'sample todo01'
        },
        {
          id: this.createHashId(),
          text: 'sample todo02'
        }
      ],
      searchText: ''
    };

    this.callBackAddTask = this.callBackAddTask.bind(this);
    this.callBackRemoveTask = this.callBackRemoveTask.bind(this);
    this.callBackSearch = this.callBackSearch.bind(this);
    this.filterCollection = this.filterCollection.bind(this);
  }

  createHashId() {
    return Math.random().toString(36).slice(-16);
  }

  callBackAddTask(val) {
    let nextData = this.state.data;
    nextData.push({id: this.createHashId(), text: val});
    this.setState({
      data: nextData
    });
  }

  callBackRemoveTask(id) {
    let data = _.reject(this.state.data, {'id': id});
    this.setState({
      data: data
    });
  }

  callBackSearch(val) {
    this.setState({
      searchText: val
    });
  }

  filterCollection(elm) {
    const regexp = new RegExp('^' + this.state.searchText, 'i');
    return (elm.text.match(regexp));
  }

  render() {
    const data = (this.state.searchText) ? this.state.data.filter(this.filterCollection) : this.state.data;
    return (
      <div>
        <TodoCreator callBackAddTask={this.callBackAddTask} />

        <Search callBackSearch={this.callBackSearch} />

        <TodoList data={data} callBackRemoveTask={this.callBackRemoveTask} />
      </div>
    );
  }
}

ReactDOM.render(
  <TodoApp />,
  document.getElementById('app')
);