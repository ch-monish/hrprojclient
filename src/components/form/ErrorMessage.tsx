import React from 'react';
import { AxiosResponse } from 'axios';
import { Message } from 'primereact/message';

interface IProps {
  error: AxiosResponse;
  text?: string;
}

const ErrorMessage: React.FC<IProps> = ({ error, text }) => {
  return (
    // <Message severity="error">
    //   <Message.Header>{error.statusText}</Message.Header>
    //   {error.data && Object.keys(error.data.errors).length > 0 && (
    //     <Message.List>
    //       {Object.values(error.data.errors).flat().map((err : any, i) => (
    //         <Message.Item key={i}>{err}</Message.Item>
    //       ))}
    //     </Message.List>
    //   )}
    //   {text && <Message.Content content={text} />}
    // </Message>
    <>
    {error.data && Object.keys(error.data.errors).length > 0 && (
      <span>
        {Object.values(error.data.errors).flat().map((err : any, i) => (
          <Message key={i}>{err}</Message>
        ))}
        </span>
    )}
    </>
    // <Message severity={"error"}></Message>
  );
};

export default ErrorMessage;
