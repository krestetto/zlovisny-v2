'use client'

import { useState } from 'react'
import { Loader2, CheckCircle2, AlertTriangle, TicketCheck } from 'lucide-react'
import { TextField, TextAreaField, SelectField } from '@/components/form-fields'

const CATEGORIES = [
  'Проблема з донатом',
  'Знайдено баг',
  'Скарга на гравця',
  'Інше',
] as const

type Errors = Record<string, string>
type Status = 'idle' | 'loading' | 'success' | 'error'

export function SupportForm() {
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState('')

  function validate(data: Record<string, string>): Errors {
    const e: Errors = {}
    if (!data.nickname?.trim()) e.nickname = 'Вкажіть ігровий нікнейм.'
    if (!data.discord?.trim()) e.discord = "Вкажіть Discord tag для зв'язку."
    if (!data.category) e.category = 'Оберіть категорію проблеми.'
    if (!data.description?.trim()) e.description = 'Опишіть суть проблеми.'
    return e
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>

    const validationErrors = validate(data)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setStatus('loading')
    setServerError('')
    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Сталася помилка.')
      }
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setServerError(err instanceof Error ? err.message : 'Сталася помилка.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-primary/40 bg-primary/10 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h3 className="mt-4 font-heading text-xl font-bold uppercase tracking-wide text-foreground">
          Тікет створено!
        </h3>
        <p className="mx-auto mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          Вашу заявку передано команді підтримки. Ми зв&apos;яжемося з вами у Discord якнайшвидше.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 rounded-md border border-border bg-secondary/60 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/60 hover:text-primary"
        >
          Створити новий тікет
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="nickname" label="Ігровий нікнейм" required error={errors.nickname} placeholder="Steve" />
        <TextField id="discord" label="Discord tag" required error={errors.discord} placeholder="username" />
      </div>

      <SelectField
        id="category"
        label="Категорія проблеми"
        required
        options={CATEGORIES}
        error={errors.category}
        defaultValue=""
      />

      <TextAreaField
        id="description"
        label="Суть проблеми / детальний опис"
        required
        rows={5}
        error={errors.description}
        placeholder="Опишіть проблему якомога детальніше: що сталося, коли, які дії виконували…"
      />

      <TextField
        id="evidence"
        label="Посилання на докази (скріншоти / відео)"
        type="url"
        error={errors.evidence}
        hint="Imgur, YouTube, Google Drive тощо."
        placeholder="https://"
      />

      {status === 'error' && (
        <div className="flex items-start gap-3 rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-foreground">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
          <span>{serverError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="shine inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all hover:bg-primary/85 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Надсилання…
          </>
        ) : (
          <>
            <TicketCheck className="h-4 w-4" />
            Відправити тікет
          </>
        )}
      </button>
    </form>
  )
}
