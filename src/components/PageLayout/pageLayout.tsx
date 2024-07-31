import Logo from '../Logo';
import styles from './pageLayout.module.css';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Logo />
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default PageLayout;
