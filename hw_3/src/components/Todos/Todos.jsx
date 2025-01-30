import { useEffect, useState } from 'react'
import './Todos.css'

import Form from './Form/Form';
import List from './List/List';

import { services } from '../../servises/todos';
import { actions } from '../../constants/tasks';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodos, setNewTodos] = useState([]);
  const [inProgresTodos, setInProgresTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);
  const [onHoldTodos, setOnHoldTodos] = useState([]);


  useEffect(() => {
    getTodos();
  }, [])

  useEffect(() => {
    setNewTodos(todos.filter(todo => todo.status === actions.TODO.value));
    setInProgresTodos(todos.filter(todo => todo.status === actions.IN_PROGRESS.value));
    setDoneTodos(todos.filter(todo => todo.status === actions.DONE.value));
    setOnHoldTodos(todos.filter(todo => todo.status === actions.ON_HOLD.value));

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

  const onEditHandler = async (id, actionTitle) => {
    const actualStatus = actionTitle;

    try {
      await services.put(id, { status: actualStatus })
      getTodos();
    } catch (err) {
      console.log(err)
    }
  }

  const onAddTodoHandler = async (e, ref) => {
    e.preventDefault();
    const selectedValue = +ref.select.current.value;
    const newTodo = {
      title: ref.input.current.value,
      status: selectedValue,
    }
    try {
      await services.post(newTodo);
      getTodos();
      ref.input.current.value = '';
    } catch (err) {
      console.log(err)
    }
  }

  const TASKS = [
    {
      title: 'To Do',
      tasks: newTodos,
      btns: [
        { title: `In progress`, action: actions.IN_PROGRESS.value, handler: onEditHandler, type: 'text' },
      ],
    },
    {
      title: 'On Hold',
      tasks: onHoldTodos,
      btns: [
        { title: `To do`, action: actions.TODO.value, handler: onEditHandler, type: 'text' },
        { title: `In progress`, action: actions.IN_PROGRESS.value, handler: onEditHandler, type: 'text' }
      ],
    },
    {
      title: 'In Progress',
      tasks: inProgresTodos,
      btns: [
        { title: 'To do', action: actions.TODO.value, handler: onEditHandler, type: 'text' },
        { title: 'Done', action: actions.DONE.value, handler: onEditHandler, type: 'text' },
        { title: 'On hold', action: actions.ON_HOLD.value, handler: onEditHandler, type: 'text' },
      ],
    },
    {
      title: 'Done',
      tasks: doneTodos,
      btns: [{ title: 'To archive', handler: onDeleteHandler, type: 'text' }],
    },
  ];

  return todos.length ? (
    <>
      <Form
        actionObj={actions}
        addHandler={onAddTodoHandler}
      />

      <div className='main_wrap'>
        {TASKS ? TASKS.map((task, ind) => {
          return (
            <List
              key={ind}
              title={task.title}
              todos={task.tasks}
              buttons={task.btns}
            />
          )
        }) : null}
      </div>
    </>
  ) : null;
}
