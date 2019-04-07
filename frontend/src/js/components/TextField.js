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
  let subText = 'placeholder';
  let inputClass = '';
  let smallClass = 'd-hidden';
  const ariaDescribedBy = '';

  if (errorMessage) {
    subText = errorMessage;
    inputClass = 'TextField_input--error';
    smallClass = 'text-danger';
  } else if (helpMessage) {
    subText = helpMessage;
    smallClass = 'text-muted';
  }

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type || 'text'}
        value={initialValue}
        className={`form-control form-control-sm ${inputClass}`}
        id={id}
        aria-describedby={ariaDescribedBy}
        onChange={onChange}
        onBlur={onBlur}
      />
      <small id={`${id}-help`} className={`form-text ${smallClass}`}>
        {subText}
      </small>
    </div>
  );
};

export default TextField;
