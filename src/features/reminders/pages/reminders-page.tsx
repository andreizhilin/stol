import React, { useState } from 'react';
import dayjs from 'dayjs';

import { useLocalization } from '@/features';
import { PageWrapper } from '@/components';

import { CalendarWithReminders, CreateReminderShortForm, RemindersList } from '../widgets';
import { useFetchRemindersQuery } from '../hooks';
import { localization } from '../localization';
import { RemindersPageSkeleton } from './reminders-page.skeleton';

const DEFAULT_SELECTED_DATE = new Date();

export function RemindersPage() {
  const { dateFormat } = useLocalization(localization);
  const [selectedDate, setSelectedDate] = useState(DEFAULT_SELECTED_DATE);
  const { isFetching } = useFetchRemindersQuery();

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  if (isFetching) {
    return (
      <PageWrapper>
        <RemindersPageSkeleton />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper testId='reminders-page'>
      <div className='mt-8 mb-4 text-2xl text-center'>{dayjs(selectedDate).format(dateFormat)}</div>
      <div className='flex flex-col items-center md:flex-row md:items-start'>
        <CalendarWithReminders selectedDate={selectedDate} onSelect={handleDateChange} />
        <div className='w-full space-y-4'>
          <RemindersList selectedDate={selectedDate} />
          <CreateReminderShortForm selectedDate={selectedDate} />
        </div>
      </div>
    </PageWrapper>
  );
}
