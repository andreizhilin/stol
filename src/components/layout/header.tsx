import { Clock } from '../clock';

export function Header() {
  return (
    <div className='p-5 hidden md:flex justify-end border border-l-0 sticky top-0 bg-white z-50'>
      <Clock />
    </div>
  );
}
