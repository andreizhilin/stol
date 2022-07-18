import { Clock } from '@/components';

export function Header() {
  return (
    <div className='p-5 hidden md:flex justify-end border-b sticky top-0 bg-white z-50'>
      <Clock />
    </div>
  );
}
