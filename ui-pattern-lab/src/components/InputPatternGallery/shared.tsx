import {
  cloneElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
  type Ref,
  useId,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

type PreviewCardProps = {
  label: string;
  description: string;
  children: ReactNode;
  className?: string;
};

export type InputFieldControlProps = {
  id?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean | 'true' | 'false';
  'aria-required'?: boolean | 'true' | 'false';
};

type InputFieldProps = {
  control: ReactElement<InputFieldControlProps>;
  label: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  className?: string;
};

export type InputDemoState = 'default' | 'error' | 'success';
export type InputControlTone = 'default' | 'brand';

type TextInputControlProps = Omit<ComponentPropsWithoutRef<'input'>, 'className' | 'size'> &
  InputFieldControlProps & {
    className?: string;
    state?: InputDemoState;
    tone?: InputControlTone;
    inputRef?: Ref<HTMLInputElement>;
    leadingAdornment?: ReactNode;
    trailingAdornment?: ReactNode;
  };

type ClearAdornmentButtonProps = {
  ariaLabel?: string;
  onClick?: () => void;
};

type ClearableTextInputControlProps = Omit<
  TextInputControlProps,
  'value' | 'defaultValue' | 'onChange' | 'trailingAdornment'
> & {
  clearAriaLabel?: string;
  initialValue?: string;
};

type CustomDesignFrameProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  badge?: string;
  footerNote?: string;
};

export function buildDescribedBy(
  currentValue: string | undefined,
  ...nextIds: Array<string | undefined>
): string | undefined {
  const ids = [currentValue, ...nextIds].filter(
    (value): value is string => value !== undefined && value.length > 0,
  );

  if (ids.length === 0) {
    return undefined;
  }

  return ids.join(' ');
}

export function PreviewCard({
  label,
  description,
  children,
  className,
}: PreviewCardProps): ReactNode {
  return (
    <section className={clsx(styles.previewCard, className)}>
      <div className={styles.previewHeader}>
        <span className={styles.previewLabel}>{label}</span>
        <p className={styles.previewDescription}>{description}</p>
      </div>
      <div className={styles.previewContent}>{children}</div>
    </section>
  );
}

export function CustomDesignFrame({
  eyebrow,
  title,
  description,
  children,
  badge,
  footerNote,
}: CustomDesignFrameProps): ReactNode {
  return (
    <section className={styles.customDesignFrame}>
      <div className={styles.customDesignHeader}>
        <div className={styles.customDesignMetaRow}>
          <span className={styles.customDesignEyebrow}>{eyebrow}</span>
          {badge ? <span className={styles.customDesignBadge}>{badge}</span> : null}
        </div>
        <strong className={styles.customDesignTitle}>{title}</strong>
        <p className={styles.customDesignDescription}>{description}</p>
      </div>
      <div className={styles.customDesignBody}>{children}</div>
      {footerNote ? <p className={styles.customDesignFooter}>{footerNote}</p> : null}
    </section>
  );
}

export function InputField({
  control,
  label,
  helperText,
  errorText,
  required = false,
  className,
}: InputFieldProps): ReactNode {
  const baseId = useId();
  const controlId = control.props.id ?? `${baseId}-control`;
  const helperId = helperText ? `${baseId}-helper` : undefined;
  const errorId = errorText ? `${baseId}-error` : undefined;
  const describedBy = buildDescribedBy(control.props['aria-describedby'], helperId, errorId);
  const enhancedControl = cloneElement(control, {
    id: controlId,
    'aria-describedby': describedBy,
    'aria-invalid': errorText ? 'true' : control.props['aria-invalid'],
    'aria-required': required
      ? control.props['aria-required'] ?? 'true'
      : control.props['aria-required'],
  });

  return (
    <div className={clsx(styles.field, className)}>
      <span className={styles.fieldText}>
        <span className={styles.fieldLabelRow}>
          <label className={styles.fieldLabel} htmlFor={controlId}>
            {label}
          </label>
          {required ? (
            <span aria-hidden="true" className={styles.requiredMark}>
              *
            </span>
          ) : null}
        </span>
      </span>
      {enhancedControl}
      {helperText ? (
        <span className={styles.fieldHelper} id={helperId}>
          {helperText}
        </span>
      ) : null}
      {errorText ? (
        <span className={styles.fieldError} id={errorId}>
          {errorText}
        </span>
      ) : null}
    </div>
  );
}

export function TextInputControl({
  className,
  inputRef,
  state = 'default',
  tone = 'default',
  leadingAdornment,
  trailingAdornment,
  type = 'text',
  disabled = false,
  readOnly = false,
  ...inputProps
}: TextInputControlProps): ReactNode {
  const inputClassName = clsx(
    styles.inputControl,
    leadingAdornment && trailingAdornment && styles.inputControlBoth,
    leadingAdornment && !trailingAdornment && styles.inputControlLeading,
    trailingAdornment && !leadingAdornment && styles.inputControlTrailing,
    state === 'error' && styles.inputControlError,
    state === 'success' && styles.inputControlSuccess,
    tone === 'brand' && styles.inputControlBrand,
    disabled && styles.inputControlDisabled,
    readOnly && styles.inputControlReadonly,
    className,
  );

  if (!leadingAdornment && !trailingAdornment) {
    return (
      <input
        className={inputClassName}
        disabled={disabled}
        ref={inputRef}
        readOnly={readOnly}
        type={type}
        {...inputProps}
      />
    );
  }

  return (
    <div className={styles.inputControlWrap}>
      {leadingAdornment ? (
        <span className={clsx(styles.inputAdornment, styles.inputAdornmentLeading)}>
          {leadingAdornment}
        </span>
      ) : null}
      <input
        className={inputClassName}
        disabled={disabled}
        ref={inputRef}
        readOnly={readOnly}
        type={type}
        {...inputProps}
      />
      {trailingAdornment ? (
        <span className={clsx(styles.inputAdornment, styles.inputAdornmentTrailing)}>
          {trailingAdornment}
        </span>
      ) : null}
    </div>
  );
}

export function SearchAdornmentIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 16 16"
      width="16">
      <circle cx="7" cy="7" r="4.4" />
      <path d="M10.4 10.4 13.4 13.4" />
    </svg>
  );
}

export function ClearAdornmentIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 16 16"
      width="16">
      <path d="M4.5 4.5 11.5 11.5" />
      <path d="M11.5 4.5 4.5 11.5" />
    </svg>
  );
}

export function ClearAdornmentButton({
  ariaLabel = '入力をクリア',
  onClick,
}: ClearAdornmentButtonProps): ReactNode {
  return (
    <button
      aria-label={ariaLabel}
      className={styles.adornmentButton}
      onClick={onClick}
      onMouseDown={(event) => {
        event.preventDefault();
      }}
      type="button">
      <ClearAdornmentIcon />
    </button>
  );
}

export function ClearableTextInputControl({
  clearAriaLabel = '入力をクリア',
  initialValue = '',
  leadingAdornment,
  ...inputProps
}: ClearableTextInputControlProps): ReactNode {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(initialValue);

  return (
    <TextInputControl
      {...inputProps}
      inputRef={inputRef}
      leadingAdornment={leadingAdornment}
      onChange={(event) => {
        setValue(event.currentTarget.value);
      }}
      trailingAdornment={
        value.length > 0 ? (
          <ClearAdornmentButton
            ariaLabel={clearAriaLabel}
            onClick={() => {
              setValue('');
              inputRef.current?.focus();
            }}
          />
        ) : undefined
      }
      value={value}
    />
  );
}
