import type { ReactNode } from 'react'

const baseField =
  'w-full rounded-md border bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:bg-secondary/60 focus:ring-2 focus:ring-primary/30'

function Label({
  htmlFor,
  children,
  required,
  hint,
}: {
  htmlFor: string
  children: ReactNode
  required?: boolean
  hint?: string
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-foreground">
      {children}
      {required ? (
        <span className="ml-1 text-primary" aria-hidden="true">
          *
        </span>
      ) : (
        <span className="ml-2 text-xs font-normal text-muted-foreground">(необов&apos;язкове)</span>
      )}
      {hint && <span className="mt-1 block text-xs font-normal text-muted-foreground">{hint}</span>}
    </label>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1.5 text-xs text-destructive">
      {message}
    </p>
  )
}

interface BaseProps {
  id: string
  label: string
  required?: boolean
  error?: string
  hint?: string
}

export function TextField({
  id,
  label,
  required,
  error,
  hint,
  type = 'text',
  ...rest
}: BaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'>) {
  return (
    <div>
      <Label htmlFor={id} required={required} hint={hint}>
        {label}
      </Label>
      <input
        id={id}
        name={id}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${baseField} ${error ? 'border-destructive' : 'border-border'}`}
        {...rest}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  )
}

export function TextAreaField({
  id,
  label,
  required,
  error,
  hint,
  ...rest
}: BaseProps & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'>) {
  return (
    <div>
      <Label htmlFor={id} required={required} hint={hint}>
        {label}
      </Label>
      <textarea
        id={id}
        name={id}
        rows={4}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${baseField} resize-y ${error ? 'border-destructive' : 'border-border'}`}
        {...rest}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  )
}

export function SelectField({
  id,
  label,
  required,
  error,
  hint,
  options,
  placeholder,
  ...rest
}: BaseProps & {
  options: readonly string[]
  placeholder?: string
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id'>) {
  return (
    <div>
      <Label htmlFor={id} required={required} hint={hint}>
        {label}
      </Label>
      <select
        id={id}
        name={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${baseField} appearance-none ${error ? 'border-destructive' : 'border-border'}`}
        {...rest}
      >
        <option value="" disabled>
          {placeholder ?? 'Оберіть варіант…'}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  )
}
