import { useId, useState } from 'react';
import dayjs from 'dayjs';
import styles from './calendarSelect.module.css';

interface CalendarSelectProps {
  onChange: (from: string, to: string) => void;
}

const CalendarSelect: React.FC<CalendarSelectProps> = ({ onChange }) => {
  const fromInputId = useId();
  const toInputId = useId();

  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');

  const handleChangeCalendarInput = (date: string, key: 'from' | 'to') => {
    const formattedDate = `${dayjs(date).format('YYYY-MM-DDTHH:mm:ss')}Z`;

    if (key === 'from') {
      setFrom(formattedDate);
      onChange(formattedDate, to);
    } else {
      setTo(formattedDate);
      onChange(from, formattedDate);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.field}>
        <label htmlFor={fromInputId} className={styles.label}>
          <span className={styles.title}>From</span>
          <input
            className={styles.input}
            id={fromInputId}
            type="date"
            onChange={(event) =>
              handleChangeCalendarInput(event.target.value, 'from')
            }
          />
        </label>
      </div>
      <div className={styles.field}>
        <label htmlFor={toInputId} className={styles.label}>
          <span className={styles.title}>To</span>
          <input
            className={styles.input}
            type="date"
            onChange={(event) =>
              handleChangeCalendarInput(event.target.value, 'to')
            }
          />
        </label>
      </div>
    </div>
  );
};

export default CalendarSelect;
