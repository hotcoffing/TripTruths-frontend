import styles from './InputField.module.scss';

const SuccessIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="10" fill="var(--color-brand-500)" />
      <path
        d="M6 10.2L8.6 12.8L14 7.4"
        stroke="var(--color-text-inverse)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const InputField = ({
  value = '',
  onChange,
  placeholder = '',
  name,
  id,
  type = 'text',
  variant = 'default',
  message = '',
  icon = null,
  disabled = false,
}) => {
  const fieldClassName = [
    styles['input-field'],
    styles[`input-field--${variant}`],
  ].join(' ');

  const trailingIcon = icon ?? (variant === 'success' ? <SuccessIcon /> : null);

  const inputClassName = [
    styles['input-field__input'],
    styles[`input-field__input--${variant}`],
    trailingIcon ? styles['input-field__input--with-icon'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  const messageClassName = [
    styles['input-field__message'],
    styles[`input-field__message--${variant}`],
  ].join(' ');

  return (
    <div className={styles['input-field-group']}>
      <div className={fieldClassName}>
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClassName}
          disabled={disabled}
        />
        {trailingIcon ? (
          <div className={styles['input-field__icon']}>{trailingIcon}</div>
        ) : null}
      </div>

      {message ? <p className={messageClassName}>{message}</p> : null}
    </div>
  );
};

export default InputField;
