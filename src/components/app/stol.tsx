import { Provider } from 'react-redux';

import { App } from '@/components';
import { store } from '@/store';

export function Stol() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
