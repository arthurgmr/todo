import { Check, Trash } from 'phosphor-react';
import styles from './Task.module.css';
import { ITask } from '../App';

interface TaskProps {
  task: ITask;
  onDeleteTask: (task: ITask) => void;
  onToggleTask: (task: ITask) => void;
}

export function Task({task, onDeleteTask, onToggleTask}: TaskProps) {

  function handleToggleTask() {
    onToggleTask(task);
  }

  function handleDeleteTask() {
    onDeleteTask(task);
  }

  const checkboxCheckedClassName = task.isChecked
    ? styles['checkbox-checked']
    : styles['checkbox-unchecked']
  const paragraphCheckedClassName = task.isChecked
    ? styles['paragraph-checked']
    : styles['paragraph']

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="checkbox" onClick={handleToggleTask}>
          <input readOnly type="checkbox" checked={task.isChecked}/>
          <span className={`${styles.checkbox} ${checkboxCheckedClassName}`}>
          {task.isChecked && <Check size={12} color='#F2F2F2' />}
          </span>

          <p className={paragraphCheckedClassName}>
            {task.text}
          </p>
        </label>
      </div>

      <button onClick={handleDeleteTask} className={styles.trashButton} >
        <Trash size={16} color="#808080" />
      </button>
    </div>
  )
}