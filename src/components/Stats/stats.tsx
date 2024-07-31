import styles from './stats.module.css';

interface StatsProps {
  stats?: {
    value: string;
    label: string;
  }[];
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  if (!stats?.length) {
    return null;
  }

  return (
    <div className={styles.root}>
      {stats.map((item, index) => (
        <div key={index} className={styles.item}>
          <span className={styles.value}>{item.value}</span>
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Stats;
