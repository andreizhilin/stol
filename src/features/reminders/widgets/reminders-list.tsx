import React from 'react';
import dayjs from 'dayjs';
import SectionMessage from '@atlaskit/section-message';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';

import { useLocalization } from '@/features';
import { useTheme } from '@/services';

import { useFetchRemindersQuery, useDeleteReminderMutation } from '../hooks';
import { localization } from '../localization';
import { Reminder } from '../types';

type Props = {
  selectedDate: Date;
};

export function RemindersList({ selectedDate }: Props) {
  const { t } = useLocalization(localization);
  const { colors } = useTheme();
  const { data } = useFetchRemindersQuery();
  const remindersForSelectedDate =
    data?.filter(
      (reminder: Reminder) =>
        dayjs(reminder.remindAt).format('YYYY-MM-DD') === dayjs(selectedDate).format('YYYY-MM-DD'),
    ) ?? [];
  const [deleteReminder] = useDeleteReminderMutation();

  const handleRemoveClick = (id: string) => {
    deleteReminder({ id });
  };

  return (
    <>
      {remindersForSelectedDate.length === 0 && <div className='mt-4'>{t('EmptyState')}</div>}
      {remindersForSelectedDate.map(reminder => (
        <SectionMessage key={reminder.id}>
          <div className='flex justify-between align-center font-bold'>
            {reminder.text}
            <div
              data-testid='remove-reminder'
              className='flex cursor-pointer align-center'
              onClick={() => handleRemoveClick(reminder.id)}
            >
              <CrossCircleIcon primaryColor={colors.red} label={t('Remove')} />
            </div>
          </div>
        </SectionMessage>
      ))}
    </>
  );
}
