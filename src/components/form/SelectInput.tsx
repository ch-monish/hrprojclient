import React from 'react'
import { FieldRenderProps } from 'react-final-form';
import {  Form } from 'react-final-form';
import {SelectItem as Select} from 'primereact/selectitem'
export interface FormFieldProps  {
  [key: string]: any
}
interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}


const SelectInput: React.FC<IProps> = ({
    input,
    width,
    options,
    placeholder,
    isMultiple,
    meta: { touched, error }
  }) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
        <Select 
            value={input.value}
            onChange={(e, data) => input.onChange(data.value)}
            placeholder={placeholder}
            options={options}
            multiple={isMultiple}
            search
        />
        {touched && error && (
          <Label basic color='red'>
            {error}
          </Label>
        )}
      </Form.Field>
    )
}

export default SelectInput
