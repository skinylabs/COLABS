import { forwardRef, useEffect, useRef, useState } from "react";

export const Input = forwardRef(
  (
    {
      labelName,
      isFocused = false,
      name,
      htmlFor,
      type,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    // Mengatur referensi untuk input
    const inputRef = ref ? ref : useRef();
    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState("");

    // Fokus pada input jika isFocused adalah true
    useEffect(() => {
      if (isFocused && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isFocused]);

    // Event handler untuk drag and drop
    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        setFileName(e.dataTransfer.files[0].name);
        onChange(e);
      }
    };

    const handleChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setFileName(e.target.files[0].name);
        onChange(e);
      }
    };

    const handleRemoveFile = () => {
      setFileName("");
      inputRef.current.value = "";
      onChange({ target: { name, value: "" } });
    };

    // Menentukan jenis input
    const isFileInput = type === "file";
    const InputComponent = isFileInput
      ? "input"
      : type === "textarea"
      ? "textarea"
      : "input";

    return (
      <div className="form-control w-full mt-4">
        <label className="label" htmlFor={htmlFor}>
          <span className="label-text text-white">{labelName}</span>
        </label>
        {isFileInput ? (
          <div
            className={`flex items-center justify-center w-full ${
              dragActive ? "border-blue-500" : "border-gray-300"
            }`}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <label
              htmlFor={htmlFor}
              className={`mt-2 flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ${
                fileName ? "hidden" : ""
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id={htmlFor}
                type="file"
                name={htmlFor}
                onChange={handleChange}
                className="hidden"
                {...props}
                ref={inputRef}
              />
            </label>
          </div>
        ) : (
          <InputComponent
            id={htmlFor}
            type={type !== "file" ? type : undefined}
            value={value}
            onChange={onChange}
            className={
              type === "textarea"
                ? // Kelas untuk TEXTAREA
                  "mt-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                : // Kelas untuk INPUT
                  "mt-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            }
            {...props}
            ref={inputRef}
          />
        )}
        {fileName && (
          <div className="mt-2 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Selected file: {fileName}</span>
            <button
              type="button"
              className="ml-2 text-red-500 hover:text-red-700"
              onClick={handleRemoveFile}
            >
              X
            </button>
          </div>
        )}
      </div>
    );
  }
);

export const InputError = ({ message, className = "", ...props }) => {
  return message ? (
    <p
      {...props}
      className={"text-sm text-red-600 dark:text-red-400 " + className}
    >
      {message}
    </p>
  ) : null;
};
