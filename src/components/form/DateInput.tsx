import React from 'react'
import { FieldRenderProps } from 'react-final-form';
import {Calendar as  DateTimePicker } from 'primereact/calendar';
import { FormFieldProps, Form,Field} from 'react-final-form';

interface IProps
  extends FieldRenderProps<Date, HTMLElement>,
    FormFieldProps { }

const DateInput: React.FC<IProps> = ({
    input,
    id = null,
    width,
    placeholder,
    date=false,
    time=false,
    format="MM/dd/yyyy",
    // readOnly,
    meta: { touched, error },
    ...rest
  }) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
        <DateTimePicker
            placeholder={placeholder}
            value={input.value || null}
            onChange={input.onChange}
            date={date}
            time={time}
            // readOnly={false}
            onBlur={e=>input.onBlur}
            onKeyDown={(e) => e.preventDefault()}
            format={format}
            {...rest}
        />
        {touched && error && (
          <label  color='red'>
            {error}
          </label>
        )}
      </Form.Field>
    )
}

export default DateInput
