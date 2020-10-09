import React from 'react';
import styles from './Notes.module.scss';

const Notes = ({ title, content }) =>
  content ? (
    <div className={styles.note}>
      <span className={styles.noteTitle}>{title}</span>
      <ul className={styles.noteList}>
        {content.split('\n').map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  ) : null;

export default Notes;
