import styles from './core-fe-shell-ui.module.css';

/* eslint-disable-next-line */
export interface CoreFeShellUiProps {}

export function CoreFeShellUi(props: CoreFeShellUiProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CoreFeShellUi!</h1>
    </div>
  );
}

export default CoreFeShellUi;
