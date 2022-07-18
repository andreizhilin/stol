import { useMemo, useState } from 'react';
import dayjs from 'dayjs';

import { useInterval } from '@/services';
import { useLocalization } from '@/features';

export function Clock() {
  const { dateFormat } = useLocalization();
  const [now, setNow] = useState(dayjs());
  const today = useMemo(() => {
    return now.format(dateFormat);
  }, [now, dateFormat]);

  useInterval(() => {
    setNow(dayjs());
  }, 1000);

  return (
    <div className='font-bold cursor-default' title={today}>
      {now.format('HH:mm:ss')}
    </div>
  );
}
