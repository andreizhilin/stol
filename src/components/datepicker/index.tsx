import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';

import { useLocalization } from '@/features';

type Props = {
  value?: Date;

  onChange?: (value: Date) => void;
};

export function Datepicker({ value = new Date(), onChange }: Props) {
  const [selectedDate, setSelectedDate] = useState(value);
  const { dateFormat } = useLocalization();

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
    <div className='flex items-center'>
      <div data-test='prev-date-button' className='mr-4 cursor-pointer' onClick={handlePrevClick}>
        <IoMdArrowBack size='24' />
      </div>
      {dayjs(selectedDate).format(dateFormat)}
      <div data-test='next-date-button' className='ml-4 cursor-pointer' onClick={handleNextClick}>
        <IoMdArrowForward size='24' />
      </div>
    </div>
  );
}
