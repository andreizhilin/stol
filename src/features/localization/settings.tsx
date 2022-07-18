import { LanguageSwitch } from './components/language-switch';

export function LocalizationSettingsWidget() {
  return (
    <div data-test='language-switch'>
      <LanguageSwitch />
    </div>
  );
}