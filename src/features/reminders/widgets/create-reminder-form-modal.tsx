import React, { useEffect } from 'react';
import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import LoadingButton from '@atlaskit/button/loading-button';
import Form, { ErrorMessage, Field, FormFooter, FormHeader, FormSection } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import { DatePicker, DatePickerProps } from '@atlaskit/datetime-picker';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTransition } from '@atlaskit/modal-dialog';

import { useLocalization } from '@/features';

import { localization } from '../localization';
import { Reminder } from '../types';
import { useUpdateReminderMutation } from '../hooks';

type Props = {
  isOpen: boolean;

  onClose?: () => void;
};

export function CreateReminderFormModal({ isOpen = false, onClose }: Props) {
  const { t, locale, weekStartDay } = useLocalization(localization);
  const [createReminder, { isLoading: isUpdating, isSuccess }] = useUpdateReminderMutation();

  const validateRemindAt = (value?: string) => (value ? '' : t('RequiredError'));

  const handleCloseClick = () => {
    onClose?.();
  };

  const handleSubmit = (formData: Reminder) => {
    createReminder(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      onClose?.();
    }
  }, [isSuccess, onClose]);

  return (
    <ModalTransition>
      {isOpen && (
        <Modal testId='create-reminder-form-modal' onClose={handleCloseClick}>
          <Form<Reminder> onSubmit={handleSubmit}>
            {({ formProps, submitting: isSubmitting }) => (
              <form {...formProps}>
                <ModalHeader>
                  <FormHeader title={t('Title')} />
                </ModalHeader>
                <ModalBody>
                  <FormSection>
                    <Field defaultValue='' aria-required={true} name='text' label={t('Text')} isRequired>
                      {({ fieldProps, error }) => (
                        <>
                          <TextField autoComplete='off' {...fieldProps} />
                          {error && <ErrorMessage>{t('RequiredError')}</ErrorMessage>}
                        </>
                      )}
                    </Field>
                    <Field defaultValue='' name='remindAt' label={t('Date')} validate={validateRemindAt} isRequired>
                      {({ fieldProps: { id, ...rest }, error }) => (
                        <>
                          <DatePicker
                            locale={locale}
                            weekStartDay={weekStartDay as DatePickerProps['weekStartDay']}
                            selectProps={{ inputId: id }}
                            {...rest}
                          />
                          {error && <ErrorMessage>{error}</ErrorMessage>}
                        </>
                      )}
                    </Field>
                  </FormSection>
                </ModalBody>
                <ModalFooter>
                  <FormFooter>
                    <ButtonGroup>
                      <Button testId='close-button' appearance='subtle' onClick={handleCloseClick}>
                        {t('Cancel')}
                      </Button>
                      <LoadingButton type='submit' appearance='primary' isLoading={isSubmitting || isUpdating}>
                        {t('Submit')}
                      </LoadingButton>
                    </ButtonGroup>
                  </FormFooter>
                </ModalFooter>
              </form>
            )}
          </Form>
        </Modal>
      )}
    </ModalTransition>
  );
}
