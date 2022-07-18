import { images } from '@/assets';
import { useLocalization } from '@/features';

export function Logo() {
  const { t } = useLocalization();

  return (
    <div className='flex text-lg items-center'>
      <img src={images.logo} className='h-7 mr-1' />
      {t('AppName')}
    </div>
  );
}
