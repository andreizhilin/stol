import { NavigationRouter } from '@/components';
import { useLocalization } from '@/features';
import { dayjs } from '@/services';

export function App() {
  dayjs.init();
  useLocalization();

  return <NavigationRouter />;
}
