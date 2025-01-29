import { useEffect, useState } from 'react'
import './Todos.css'
import List from './List/List';
import { services } from '../../servises/todos';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodos, setNewTodos] = useState([]);
  const [inProgresTodos, setInProgresTodo] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);

  const actions = {
    TODO: 'TODO',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE'
  }

  useEffect(() => {
    getTodos();
  }, [])

  useEffect(() => {
    setNewTodos(todos.filter(todo => todo.status === 0));
    setInProgresTodo(todos.filter(todo => todo.status === 1));
    setDoneTodos(todos.filter(todo => todo.status === 2));

  }, [todos])

  const getTodos = async () => {
    try {
      const res = await services.get();
      setTodos(res);
    } catch (err) {
      console.log(err);
    }
  }

  const onDeleteHandler = async (id) => {
    try {
      await services.delete(id);
      getTodos();
    } catch (err) {
      console.log(err);
    }
  }

  const onEditHandler = async (id, action) => {
    let actualStatus = null;
    switch (action) {
      case 'IN_PROGRESS': actualStatus = 1;
        break;
      case 'DONE': actualStatus = 2;
        break;
      case 'TODO': actualStatus = 0;
        break;
      default: actualStatus = 0
    }
    try {
      await services.put(id, { status: actualStatus })
      getTodos();
    } catch (err) {
      console.log(err)
    }
  }

  return todos.length ? (
    <div className='main_wrap'>
      <List
        title={'To Do'}
        buttonTitle={'In Progress'}
        todos={newTodos}
        action={actions.IN_PROGRESS}
        actionFn={onEditHandler}
      />
      <List
        title={'In Progress'}
        buttonTitle={'Todo'}
        secondButtonTitle={'Done'}
        todos={inProgresTodos}
        action={actions.TODO}
        secondAction={actions.DONE}
        actionFn={onEditHandler}
      />
      <List
        title={'Done'}
        buttonTitle={'To archive'}
        todos={doneTodos}
        action={actions.DONE}
        actionFn={onDeleteHandler}
      />
    </div>
  ) : null;
}
