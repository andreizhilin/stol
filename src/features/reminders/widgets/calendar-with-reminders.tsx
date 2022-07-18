import React from 'react';
import dayjs from 'dayjs';
import Calendar, { CalendarProps, SelectEvent } from '@atlaskit/calendar';

import { useLocalization } from '@/features';

import { useFetchRemindersQuery } from '../hooks';

type Props = {
  selectedDate: Date;
  onSelect: (date: Date) => void;
};

export function CalendarWithReminders({ selectedDate, onSelect }: Props) {
  const { locale, weekStartDay } = useLocalization();
  const { data } = useFetchRemindersQuery();

  const datesWithReminder = data?.map(reminder => dayjs(reminder.remindAt).format('YYYY-MM-DD')) ?? [];

  const handleSelect = (date: SelectEvent) => {
    onSelect(new Date(date.iso));
  };

  return (
    <Calendar
      selected={[dayjs(selectedDate).format('YYYY-MM-DD')]}
      previouslySelected={datesWithReminder}
      onSelect={handleSelect}
      testId={'calendar'}
      locale={locale}
      weekStartDay={weekStartDay as CalendarProps['weekStartDay']}
    />
  );
}
