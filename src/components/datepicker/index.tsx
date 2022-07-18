import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

import { Locale, useLocalization } from '@/features';

type Props = {
  value?: Date;

  onChange?: (value: Date) => void;
};

export function Datepicker({ value = new Date(), onChange }: Props) {
  const [selectedDate, setSelectedDate] = useState(value);
  const { locale } = useLocalization();

  const handlePrevClick = useCallback(() => {
    const newDate = dayjs(value).add(-1, 'day').toDate();
    setSelectedDate(newDate);
    onChange?.(newDate);
  }, [value, onChange]);

  const handleNextClick = useCallback(() => {
    const newDate = dayjs(value).add(1, 'day').toDate();
    setSelectedDate(newDate);
    onChange?.(newDate);
  }, [value, onChange]);

  return (
    <div className='flex'>
      <div data-test='prev-date-button' className='mr-4 cursor-pointer' onClick={handlePrevClick}>
        <GrFormPrevious size='24' />
      </div>
      {dayjs(selectedDate).format(locale === Locale.Ru ? 'D MMMM YYYY' : 'MMMM D, YYYY')}
      <div data-test='next-date-button' className='ml-4 cursor-pointer' onClick={handleNextClick}>
        <GrFormNext size='24' />
      </div>
    </div>
  );
}
