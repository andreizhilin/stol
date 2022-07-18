import { NavigationRouter } from '@/components';
import { useAppearance, useLocalization } from '@/features';
import { dayjs } from '@/services';

export function App() {
  dayjs.init();
  useLocalization();
  const { isDarkMode } = useAppearance();

  return (
    <main className={isDarkMode ? 'dark' : ''}>
      <NavigationRouter />
    </main>
  );
}
