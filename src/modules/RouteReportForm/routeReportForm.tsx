import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Button from '../../components/Button';
import CalendarSelect from '../../components/CalendarSelect';
import Field from '../../components/Field';
import Select from '../../components/Select';
import {
  useGetVehiclesListQuery,
  useLazyGetRoutesListByUnitIdQuery,
} from '../../store/services/maponApi';
import styles from './routeReportForm.module.css';
import {
  setCalendarDate,
  setStats,
  setVehicle,
} from '../../store/slices/driveHistorySlice';
import { RootState } from '../../store';

interface RouteReportProps {
  children: React.ReactNode;
}

const RouteReport: React.FC<RouteReportProps> = ({ children }) => {
  const { data, error, isLoading } = useGetVehiclesListQuery('vehicleList');
  const [
    trigger,
    {
      data: routesListData,
      isFetching: isRoutesListFetching,
      isError: isRoutesListError,
      isSuccess: isRoutesListSuccess,
    },
  ] = useLazyGetRoutesListByUnitIdQuery();
  const dispatch = useDispatch();
  const driveHistoryState = useSelector(
    (state: RootState) => state.driveHistory
  );

  useEffect(() => {
    if (!isRoutesListError && routesListData) {
      const matchedRouteDistance = routesListData.data?.units.flatMap((unit) =>
        unit.routes.find((route) => route.type === 'route')
      )[0]?.distance;

      if (matchedRouteDistance) {
        dispatch(setStats({ distance: matchedRouteDistance }));
      }
    }
  }, [dispatch, isRoutesListError, isRoutesListSuccess, routesListData]);

  if (error) {
    return <div>Something went wrong...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const options =
    data &&
    data.data?.units.map((unit) => {
      return {
        id: unit.unit_id,
        value: unit.number,
      };
    });

  const handleVehicleNumberChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const unit = options?.find((option) => option.value === event.target.value);

    if (unit) {
      dispatch(
        setVehicle({ vehicleNumber: event.target.value, unitId: unit?.id })
      );
    }
  };

  const handleCalendarChange = (from: string, to: string) => {
    dispatch(
      setCalendarDate({
        from,
        till: to,
      })
    );
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { unitId, from, till } = driveHistoryState;

    trigger({
      unitId,
      from,
      till,
    });
  };

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <div className={styles.content}>
          {isRoutesListError ? (
            <div className={styles.error}>
              <span className={styles.errorMessage}>
                Something went wrong when sending the request...
              </span>
            </div>
          ) : null}
          <h1 className={styles.heading}>Route report</h1>
          <div className={styles.fields}>
            <Field label="Vehicle number">
              <Select options={options} onChange={handleVehicleNumberChange} />
            </Field>
            <Field label="Period">
              <CalendarSelect onChange={handleCalendarChange} />
            </Field>
          </div>
        </div>
        {children}
        <div className={styles.footer}>
          <Button type="submit" disabled={isRoutesListFetching}>
            {isRoutesListFetching ? 'Generating...' : 'Generate'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RouteReport;
