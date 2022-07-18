import { ReactNode, useCallback, useId } from 'react';

import { Spinner } from '../spinner';

type Props = {
  children: ReactNode;

  isChecked?: boolean;
  isUpdating?: boolean;

  onChange?: (isChecked: boolean) => void;
};

export function Checkbox({ children, isChecked, isUpdating, onChange }: Props) {
  const id = useId();

  const handleChange = useCallback(() => {
    onChange?.(!isChecked);
  }, [isChecked, onChange]);

  return (
    <div className='flex items-center'>
      {isUpdating ? (
        <Spinner />
      ) : (
        <input
          className='bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-6 w-6 rounded'
          id={id}
          aria-describedby={id}
          type='checkbox'
          checked={isChecked}
          onChange={handleChange}
        />
      )}
      <label className='ml-3 text-gray-900' htmlFor={id}>
        {children}
      </label>
    </div>
  );
}
