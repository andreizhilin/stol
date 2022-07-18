import { useState } from 'react';
import dayjs from 'dayjs';

import { useInterval } from '@/hooks';

export function Clock() {
  const [now, setNow] = useState(dayjs());

  useInterval(() => {
    setNow(dayjs());
  }, 1000);

  return (
    <div className='flex flex-col text-center'>
      <div>{now.format('HH:mm:ss')}</div>
      <div>{now.format('DD.MM.YYYY')}</div>
    </div>
  );
}
