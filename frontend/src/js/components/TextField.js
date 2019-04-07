import React from 'react';

const TextField = ({
  initialValue,
  type,
  id,
  label,
  helpMessage,
  errorMessage,
  onChange,
  onBlur
}) => {
  let subText;
  let inputClass;
  let smallClass;
  if (errorMessage) {
    subText = errorMessage;
    inputClass = 'TextField_input--error';
    smallClass = 'text-danger';
  } else if (helpMessage) {
    subText = helpMessage;
    smallClass = 'text-muted';
  } else {
    subText = 'placeholder';
    smallClass = 'd-hidden';
  }

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type ? type : 'text'}
        value={initialValue}
        className={'form-control form-control-sm ' + inputClass}
        id={id}
        aria-describedby={errorMessage || helpMessage ? `${id}-help` : ''}
        onChange={onChange}
        onBlur={onBlur}
      />
      <small id={`${id}-help`} className={'form-text ' + smallClass}>
        {subText}
      </small>
    </div>
  );
};

export default TextField;
