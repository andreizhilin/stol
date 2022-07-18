export type Reminder = {
  id: string;
  remindAt: Date;
  text: string;
};

export type FetchRemindersResponse = {
  data: Reminder[];
};

export type UpdateReminderResponse = {
  data: Reminder;
};
