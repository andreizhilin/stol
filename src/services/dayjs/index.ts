import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

export const init = () => {
  dayjs.extend(isToday);
};
