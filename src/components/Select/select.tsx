import styles from './select.module.css';

interface SelectProps
  extends React.HTMLAttributes<HTMLSelectElement | HTMLInputElement> {
  options?: {
    id: number;
    value: string;
  }[];
}

const Select: React.FC<SelectProps> = ({ options, ...rest }) => {
  return (
    <select className={styles.select} {...rest}>
      <option className={styles.option}>Select vehicle</option>
      {options
        ? options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.value}
            </option>
          ))
        : null}
    </select>
  );
};

export default Select;
