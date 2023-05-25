import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form,  } from 'semantic-ui-react'

export interface FormFieldProps  {
  [key: string]: any
}
interface IProps
  extends FieldRenderProps<any, HTMLElement>,
    FormFieldProps {}

const TextInput: React.FC<IProps> = ({
  label,
  input,
  width,
  type,
  min,
  max,
  step,
  readOnly,
  onKeyDown,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      {label && <label>{label}</label>}
      <input
        {...input}
        readOnly={readOnly}
        max={max}
        min={min}
        step={step}
        onKeyDown={onKeyDown}
      />
      {touched && error && (
        <label  color="red">
          {error}
        </label>
      )}
    </Form.Field>
  );
};

export default TextInput;
