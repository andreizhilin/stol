import { Provider } from 'react-redux';

import { NavigationRouter } from '@/components';
import { store } from '@/store';
import { dayjs } from '@/services';

export function App() {
  dayjs.init();

  return (
    <Provider store={store}>
      <NavigationRouter />
    </Provider>
  );
}
