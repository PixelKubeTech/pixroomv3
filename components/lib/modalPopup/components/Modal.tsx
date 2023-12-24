import styles from '../styles/ModalRoot.module.css';

export default function Modal(props: any) {
    return (
      <div className={styles.modalDialog}>
        { props.children }
      </div>
    );
  }