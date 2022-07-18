import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import isToday from 'dayjs/plugin/isToday';

export const init = () => {
  dayjs.locale('ru');
  dayjs.extend(isToday);
};
