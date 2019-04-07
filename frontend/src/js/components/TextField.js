import React from 'react';

const TextField = ({
  initialValue,
  isPassword,
  id,
  label,
  helpMessage,
  errorMessage,
  onChange,
  onBlur
}) => {
  let subText;
  let smallClasses = ['form-text'];
  if (errorMessage) {
    subText = errorMessage;
    smallClasses.push('text-danger');
  } else if (helpMessage) {
    subText = helpMessage;
    smallClasses.push('text-muted');
  } else {
    subText = 'placeholder';
    smallClasses.push('d-hidden');
  }

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={isPassword ? 'password' : 'text'}
        value={initialValue}
        className="form-control form-control-sm"
        id={id}
        aria-describedby={errorMessage || helpMessage ? `${id}-help` : ''}
        onChange={onChange}
        onBlur={onBlur}
      />
      <small id={`${id}-help`} className={smallClasses.join(' ')}>
        {subText}
      </small>
    </div>
  );
};

export default TextField;
