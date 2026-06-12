import { PageHeader } from '@/components/page-header'
import { RecruitmentForm } from '@/components/recruitment-form'
import { Palette, Code2, ShieldCheck, HandHelping } from 'lucide-react'

export const metadata = {
  title: 'Набір в команду — Зловісний',
  description:
    'Приєднуйся до команди серверу Зловісний. Ми шукаємо дизайнерів, розробників, модераторів та хелперів.',
}

const roles = [
  { icon: Palette, title: 'Дизайнер', desc: 'Банери, текстури, оформлення спільноти.' },
  { icon: Code2, title: 'Тех Розробник', desc: 'Плагіни, скрипти, автоматизація.' },
  { icon: ShieldCheck, title: 'Модератор', desc: 'Порядок у грі та Discord.' },
  { icon: HandHelping, title: 'Хелпер', desc: 'Допомога новим гравцям.' },
]

export default function RecruitmentPage() {
  return (
    <main className="flex-1">
      <PageHeader
        eyebrow="Спільнота"
        title="Набір в команду"
        description="Хочеш стати частиною темного світу Зловісного? Обери свою роль та подай заявку — ми завжди раді талановитим та відповідальним людям."
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role) => {
            const Icon = role.icon
            return (
              <div
                key={role.title}
                className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-emerald-500/50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-400">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-serif text-lg text-foreground">{role.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{role.desc}</p>
              </div>
            )
          })}
        </div>

        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <h2 className="mb-1 font-heading text-2xl font-bold uppercase tracking-wide text-foreground">
            Анкета кандидата
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Поля, позначені <span className="text-primary">*</span>, обов&apos;язкові для заповнення.
          </p>
          <RecruitmentForm />
        </div>
      </section>
    </main>
  )
}
