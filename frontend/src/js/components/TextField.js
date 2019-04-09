import React from 'react';

const TextField = ({
  initialValue,
  type,
  id,
  label,
  placeholder,
  helpMessage,
  errorMessage,
  onChange,
  onBlur
}) => {
  let subText;
  let inputClass = '';
  let smallClass = 'd-none';
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
        placeholder={placeholder}
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
