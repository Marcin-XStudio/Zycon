/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import {ExclamationCircleIcon} from "@heroicons/react/20/solid";
import {FieldError} from "react-hook-form";

type TextInputProps = {
    label: string;
    type: string;
    name: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
	error: FieldError | undefined;
}

export function TextInput({label, type, name, placeholder, onChange, value, error}: TextInputProps) {
	console.log("error?", error);
	
	return (
		<div>
			<label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
				{label}
			</label>
			<div className="relative mt-2 rounded-md shadow-sm">
				<input
					type={type}
					onChange={onChange}
					value={value}
					name={name}
					id={name}
					className="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
					placeholder={placeholder}
					aria-invalid="true"
					aria-describedby="error"
				/>
				{error ? <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
					<ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
				</div> : ""}
			</div>
			{error ? <p className="mt-2 text-sm text-red-600" id="email-error">
				{error.message}
			</p>: ""}
		</div>
	);
}
