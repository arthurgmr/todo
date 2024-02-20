import styles from './EmptyTask.module.css'

import clipboard from '../assets/clipboard.svg';

export function Empty() {
  return (
    <div className={styles.container}>
      <img src={clipboard} alt="ícone de prancheta" />
      <p>
        <strong>You don't have any tasks registered</strong>
        Create tasks and organize your to-do items
      </p>
    </div>
  )
}