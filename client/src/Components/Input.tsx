export default function Input({
  label,
  id,
  type,
  value,
  placeHolder,
  clsx,
  onChange,
  onBlur,
  required = true,
}: {
  value?: string;
  onBlur?: any;
  onChange?: any;
  label: string;
  placeHolder: string;
  id: string;
  type: string;
  required?: boolean;
  clsx?: string;
}) {
  return (
    <div className={`flex flex-col gap-1  ${clsx}`}>
      <label htmlFor={id}> {label}</label>
      <input
        onBlur={onBlur}
        onChange={onChange}
        type={type}
        id={id}
        value={value}
        className="p-2 border-2 rounded focus:outline-chat-logo"
        name={id}
        placeholder={placeHolder}
        required={required}
      />
    </div>
  );
}
