
import { PlusCircle } from 'phosphor-react';
import styles from './App.module.css';

import { Header } from './components/Header';

import './global.css';
import { Empty } from './components/EmptyTask';
import { Task } from './components/Task';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

export interface ITask {
  id: number
  text: string
  isChecked: boolean
}


export function App() {

  const [tasks, setTasks] = useState<ITask[]>([])
  const [newTask, setNewTask] = useState('');

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const task: ITask = {
      id: tasks.length + 1,
      text: newTask,
      isChecked: false
    }

    setTasks([...tasks, task]);
    setNewTask('');
    
    console.log(tasks);
  }
  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    // use to handleCommentInvalid function has correct behavior;
    event.target.setCustomValidity('');

    setNewTask(event.target.value);
  }
  function handleTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('This field needs has value!')
  }

  function deleteTask(taskToDelete: ITask) {
    const tasksWithoutDeleteOne = tasks.filter(task => {
      return task != taskToDelete;
    });

    setTasks(tasksWithoutDeleteOne);
  }

  function handleToggleTask(taskConcluded: ITask) {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskConcluded.id) {
        return { ...task, isChecked: !task.isChecked };
      }
      return task;
    });
  
    setTasks(updatedTasks);
  }


  return (
    <div>

      <Header />

      <div className={styles.wrapper}>
        <form onSubmit={handleCreateNewTask} className={styles.taskForm}>

          <input
            type="text"
            placeholder='Add a new task'
            className={styles.input}
            onChange={handleNewTaskChange}
            onInvalid={handleTaskInvalid}
            value={newTask}
            required
          />

          <button
            type='submit'
            className={styles.button}
          >
            Post
            <PlusCircle size={20} />
          </button>
        </form>

        <div className={styles.tasksList}>
          <header className={styles.tasksListHeader}>
            <aside>
              <p>Created tasks</p>
              <span>{tasks.length}</span>
            </aside>

            <aside>
              <p>Completed tasks</p>
              <span>
                {tasks.filter(t => t.isChecked).length}
              </span>
            </aside>
          </header>

          {tasks.length > 0 ? tasks.map(task => {
            return(
              <Task 
                key={task.id}
                task={task}
                onDeleteTask={deleteTask}
                onToggleTask={handleToggleTask}
              />
            )
          }) : <Empty />}


        </div>


      </div>
    </div>
  )
}
