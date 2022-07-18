import { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import CalendarFilledIcon from '@atlaskit/icon/glyph/calendar-filled';
import Button from '@atlaskit/button';
import Popup from '@atlaskit/popup';
import Calendar, { CalendarProps, SelectEvent } from '@atlaskit/calendar';

import { useLocalization } from '@/features';

type Props = {
  selectedDate: Date;
  onSelect: (date: Date) => void;
  label?: string;
};

const DEFAULT_IS_CALENDAR_OPEN = false;

export function DatePickerButton({ selectedDate, onSelect, label }: Props) {
  const { locale, weekStartDay } = useLocalization();
  const [isCalendarOpen, setIsCalendarOpen] = useState(DEFAULT_IS_CALENDAR_OPEN);

  const handleSelectDateClick = useCallback(() => {
    setIsCalendarOpen(true);
  }, []);

  const handleCalendarClose = useCallback(() => {
    setIsCalendarOpen(false);
  }, []);

  const handleSelect = useCallback(
    (date: SelectEvent) => {
      setIsCalendarOpen(false);
      onSelect(new Date(date.iso));
    },
    [onSelect],
  );

  return (
    <Popup
      placement='bottom'
      onClose={handleCalendarClose}
      content={() => (
        <Calendar
          selected={[dayjs(selectedDate).format('YYYY-MM-DD')]}
          onSelect={handleSelect}
          testId={'calendar'}
          locale={locale}
          weekStartDay={weekStartDay as CalendarProps['weekStartDay']}
        />
      )}
      isOpen={isCalendarOpen}
      trigger={triggerProps => (
        <Button {...triggerProps} onClick={handleSelectDateClick} testId='select-date'>
          <div className='flex items-center space-x-1'>
            <CalendarFilledIcon label='' />
            <div>{label}</div>
          </div>
        </Button>
      )}
    />
  );
}
