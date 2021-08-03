import React, { useEffect, useRef, useState } from 'react';
import { func, string } from 'prop-types';

function FormInput({ onChange, value, label, ...props }) {
  const [leave, setLeave] = useState(false);
  const errorRef = useRef();
  const inputRef = useRef();

  const handleBlur = () => {
    setLeave(true);
  };

  const handleChange = (evt) => {
    const { value: inputValue, name: inputName, validity } = evt.target;
    onChange(inputValue, inputName, validity.valid);
  };

  useEffect(() => {
    if (leave) {
      const { validity, validationMessage } = inputRef.current;

      if (validity.valid) {
        errorRef.current.textContent = '';
      } else {
        errorRef.current.textContent = validationMessage;
      }
    }
  }, [value, leave]);

  return (
    <label className="form__field">
      <span className="form__label">{label}</span>
      <input
        {...props}
        value={value}
        ref={inputRef}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <span ref={errorRef} className="form__input-error name-input-error" />
    </label>
  );
}

FormInput.propTypes = {
  onChange: func.isRequired,
  value: string,
  label: string,
};

export default FormInput;
