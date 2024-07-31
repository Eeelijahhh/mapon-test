import { Provider } from 'react-redux';
import { store } from './store';
import PageLayout from './components/PageLayout';
import RouteReportForm from './modules/RouteReportForm';
import RouteReport from './modules/RouteReport';

const App = () => {
  return (
    <Provider store={store}>
      <PageLayout>
        <RouteReportForm>
          <RouteReport />
        </RouteReportForm>
      </PageLayout>
    </Provider>
  );
};

export default App;
