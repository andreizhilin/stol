import { Clock } from '@/components';

export function Header() {
  return (
    <div
      data-test='clock'
      className='p-5 hidden md:flex justify-end border-b sticky top-0 z-50 bg-white dark:bg-gray-900 dark:border-gray-700'
    >
      <Clock />
    </div>
  );
}
