import { ReactNode, useCallback, useId } from 'react';

type Props = {
  children: ReactNode;

  isChecked?: boolean;

  onChange?: (isChecked: boolean) => void;
};

export function Toggle({ children, isChecked, onChange }: Props) {
  const id = useId();

  const handleChange = useCallback(() => {
    onChange?.(!isChecked);
  }, [isChecked, onChange]);

  return (
    <label htmlFor={id} className='inline-flex relative items-center cursor-pointer'>
      <input type='checkbox' checked={isChecked} id={id} className='sr-only peer' onChange={handleChange} />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      <span className='ml-3 text-sm font-medium'>{children}</span>
    </label>
  );
}
