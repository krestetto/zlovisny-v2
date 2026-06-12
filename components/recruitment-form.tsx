'use client'

import { useState } from 'react'
import { Loader2, CheckCircle2, AlertTriangle, Send } from 'lucide-react'
import { TextField, TextAreaField, SelectField } from '@/components/form-fields'

const POSITIONS = ['Дизайнер', 'Тех Розробник', 'Модератор', 'Хелпер'] as const

type Errors = Record<string, string>
type Status = 'idle' | 'loading' | 'success' | 'error'

export function RecruitmentForm() {
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState('')

  function validate(data: Record<string, string>): Errors {
    const e: Errors = {}
    if (!data.nickname?.trim()) e.nickname = 'Вкажіть ігровий нікнейм.'
    if (!data.discord?.trim()) e.discord = 'Вкажіть Discord tag для зв&apos;язку.'
    const age = Number(data.age)
    if (!data.age?.trim()) e.age = 'Вкажіть ваш вік.'
    else if (!Number.isFinite(age) || age < 13) e.age = 'Мінімальний вік — 13 років.'
    if (!data.position) e.position = 'Оберіть бажану посаду.'
    if (!data.experience?.trim()) e.experience = 'Опишіть ваш досвід.'
    if (!data.motivation?.trim()) e.motivation = 'Розкажіть, чому ми маємо обрати саме вас.'
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
      const res = await fetch('/api/recruitment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, age: Number(data.age) }),
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
      <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
        <h3 className="mt-4 font-heading text-xl font-bold uppercase tracking-wide text-foreground">
          Заявку надіслано!
        </h3>
        <p className="mx-auto mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          Дякуємо за інтерес до команди Зловісного. Адміністрація розгляне вашу заявку та
          зв&apos;яжеться з вами у Discord.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 rounded-md border border-border bg-secondary/60 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/60 hover:text-primary"
        >
          Подати ще одну заявку
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

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="age"
          label="Вік"
          type="number"
          min={13}
          required
          error={errors.age}
          placeholder="16"
        />
        <SelectField
          id="position"
          label="Бажана посада"
          required
          options={POSITIONS}
          error={errors.position}
          defaultValue=""
        />
      </div>

      <TextAreaField
        id="experience"
        label="Ваш досвід у цій сфері"
        required
        error={errors.experience}
        placeholder="Опишіть свій попередній досвід, навички та проєкти…"
      />

      <TextField
        id="portfolio"
        label="Посилання на портфоліо / приклади робіт"
        type="url"
        error={errors.portfolio}
        hint="Особливо актуально для дизайнерів та розробників."
        placeholder="https://"
      />

      <TextAreaField
        id="motivation"
        label="Чому ми маємо обрати саме вас?"
        required
        error={errors.motivation}
        placeholder="Розкажіть, чим ви будете корисні для проєкту…"
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
        className="shine inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-all hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Надсилання…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Надіслати заявку
          </>
        )}
      </button>
    </form>
  )
}
