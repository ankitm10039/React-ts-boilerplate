import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import CustomTextField from './CustomTextField';
import type { CustomTextFieldProps } from './CustomTextField';

interface FormInputProps<TFieldValues extends FieldValues> extends Omit<CustomTextFieldProps, 'name'> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
}

function FormInputInner<TFieldValues extends FieldValues>({
  name,
  control,
  ...textFieldProps
}: FormInputProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <CustomTextField
          {...textFieldProps}
          {...field}
          value={field.value ?? ''}
          errorMessage={error?.message}
        />
      )}
    />
  );
}

export const FormInput = FormInputInner as <TFieldValues extends FieldValues>(
  props: FormInputProps<TFieldValues>
) => React.ReactElement;
export default FormInput;
