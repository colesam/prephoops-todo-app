import React from 'react';

const TodoItem = ({ id, name, isChecked, onCheck, onDelete }) => {
  return (
    <li className="TodoItem list-group-item">
      <div className="row">
        <div className="col-2 d-flex justify-content-center align-items-center">
          <div
            className="TodoItem_checkbox"
            onClick={() => onCheck(id, !isChecked)}
          >
            <div
              className={
                'TodoItem_checkbox_filling' + (isChecked ? '-checked' : '')
              }
            />
          </div>
        </div>
        <div className="col-9 d-flex align-items-center">{name}</div>
        <div className="col-1 px-0 d-flex justify-content-center align-items-center">
          <i
            className="TodoItem_delete fas fa-trash-alt text-danger"
            onClick={onDelete}
          />
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
