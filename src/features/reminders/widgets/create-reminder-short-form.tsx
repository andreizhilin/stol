import React from 'react';
import TextField from '@atlaskit/textfield';
import { LoadingButton } from '@atlaskit/button';
import Form, { ErrorMessage, Field, FormApi, FormFooter, FormSection } from '@atlaskit/form';

import { useLocalization } from '@/features';

import { useUpdateReminderMutation } from '../hooks';
import { localization } from '../localization';
import { Reminder } from '../types';

type Props = {
  selectedDate: Date;
};

export function CreateReminderShortForm({ selectedDate }: Props) {
  const { t } = useLocalization(localization);
  const [addReminder] = useUpdateReminderMutation();

  const handleReminderSubmit = async (formData: Reminder, form: FormApi<Reminder>) => {
    await addReminder({
      ...formData,
      remindAt: selectedDate,
    });
    form.reset();
  };

  return (
    <Form<Reminder> onSubmit={handleReminderSubmit}>
      {({ formProps, submitting: isSubmitting }) => (
        <form {...formProps}>
          <FormSection>
            <Field defaultValue='' aria-required={true} name='text' label={t('Text')} isRequired>
              {({ fieldProps, error }) => (
                <>
                  <TextField autoComplete='off' {...fieldProps} />
                  {error && <ErrorMessage>{t('RequiredError')}</ErrorMessage>}
                </>
              )}
            </Field>
          </FormSection>
          <FormFooter>
            <LoadingButton type='submit' appearance='primary' isLoading={isSubmitting}>
              {t('Submit')}
            </LoadingButton>
          </FormFooter>
        </form>
      )}
    </Form>
  );
}
