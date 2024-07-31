import { useId } from 'react';
import styles from './field.module.css';

interface FieldProps {
  children: React.ReactNode;
  label?: string;
}

const Field: React.FC<FieldProps> = ({ children, label }) => {
  const id = useId();

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {children}
    </div>
  );
};

export default Field;
