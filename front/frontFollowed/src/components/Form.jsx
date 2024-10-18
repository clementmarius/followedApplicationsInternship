import { useState, useContext } from 'react';

import { StoreContext } from '../store';

const Form = () => {
  const { dispatch } = useContext(StoreContext);

  const [title, setTitle] = useState('');

  const handleChange = event => {
    setTitle(event.target.value);
  };

  const handleClickButton = () => {
    const id = crypto.randomUUID()


    dispatch({
      type: 'ADD_TODO',
      payload: { title, id, isComplete: false }
    });
    setTitle('');
  };

  return (
    <div className="add-items d-flex">
      <input
        type="text"
        className="form-control todo-list-input"
        placeholder="What do you need to do today?"
        value={title}
        onChange={handleChange}
      />
      <button
        onClick={handleClickButton}
        className="add btn btn-primary font-weight-bold todo-list-add-btn"
      >
        Add
      </button>
    </div>
  );
};

export default Form;