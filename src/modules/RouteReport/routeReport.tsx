import { useSelector } from 'react-redux';
import Stats from '../../components/Stats';
import styles from './routeReport.module.css';
import { RootState } from '../../store';

const RouteReport = () => {
  const statsState = useSelector(
    (state: RootState) => state.driveHistory.stats
  );

  const stats = statsState.distance
    ? [
        {
          value: String((statsState.distance / 1000).toFixed(0)),
          label: 'Km driven',
        },
      ]
    : [];

  return (
    <div className={styles.root}>
      {/* Map goes here... */}
      <Stats stats={stats} />
    </div>
  );
};

export default RouteReport;
