import React from 'react';

const TextField = ({ id, label, helpMessage, errorMessage }) => {
  let subText;

  console.log(errorMessage);
  if (errorMessage) {
    subText = (
      <small id={`${id}-help`} className="form-text text-muted text-danger">
        {errorMessage}
      </small>
    );
  } else if (helpMessage) {
    subText = (
      <small id={`${id}-help`} className="form-text text-muted">
        {helpMessage}
      </small>
    );
  }

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        className="form-control form-control-sm"
        id={id}
        aria-describedby={`${id}-help`}
      />
      {subText}
    </div>
  );
};

export default TextField;
