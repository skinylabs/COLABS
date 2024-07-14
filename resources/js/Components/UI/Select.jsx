import { forwardRef, useRef } from "react";

const SelectLabel = forwardRef(
  (
    { className = "", labelName, htmlFor, value, onChange, children, ...props },
    ref
  ) => {
    const inputRef = ref || useRef();

    const handleChange = (e) => {
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="form-control w-full mt-4">
        <label htmlFor={htmlFor}>
          <div className="label">
            <span className="label-text text-white">{labelName}</span>
          </div>
          <select
            {...props}
            id={htmlFor}
            className={
              "mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
              className
            }
            ref={inputRef}
            value={value}
            onChange={handleChange}
          >
            {children}
          </select>
        </label>
      </div>
    );
  }
);

export default SelectLabel;
