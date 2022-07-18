import { AiFillSave } from 'react-icons/ai';

type Props = {
  onClick: () => void;
};

export function SaveButton({ onClick }: Props) {
  return (
    <div data-test='notepad-save-button' className='ml-2 cursor-pointer' onClick={onClick}>
      <AiFillSave size='24' />
    </div>
  );
}
