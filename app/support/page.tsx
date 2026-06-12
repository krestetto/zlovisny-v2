import { PageHeader } from '@/components/page-header'
import { SupportForm } from '@/components/support-form'
import { CreditCard, Bug, UserX, HelpCircle, ArrowUpCircle } from 'lucide-react'

export const metadata = {
  title: 'Підтримка — Зловісний',
  description:
    'Потрібна допомога на сервері Зловісний? Створіть тікет — наша команда підтримки допоможе вам.',
}

const categories = [
  { icon: CreditCard, title: 'Проблема з донатом', desc: 'Не зарахувалась покупка чи привілей.' },
  { icon: ArrowUpCircle, title: 'Покращити прохідку', desc: 'Доплатіть різницю та підніміть ранг.' },
  { icon: Bug, title: 'Знайдено баг', desc: 'Повідомте про помилку у грі.' },
  { icon: UserX, title: 'Скарга на гравця', desc: 'Порушення правил іншими.' },
  { icon: HelpCircle, title: 'Інше', desc: 'Будь-яке інше питання.' },
]

export default function SupportPage() {
  return (
    <main className="flex-1">
      <PageHeader
        eyebrow="Спільнота"
        title="Підтримка"
        description="Зіткнулися з проблемою у світі Зловісного? Опишіть її детально — і наша команда підтримки прийде на допомогу крізь пітьму."
      />

      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <div
                key={cat.title}
                className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/60"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-serif text-lg text-foreground">{cat.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{cat.desc}</p>
              </div>
            )
          })}
        </div>

        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <h2 className="mb-1 font-heading text-2xl font-bold uppercase tracking-wide text-foreground">
            Створити тікет
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Поля, позначені <span className="text-primary">*</span>, обов&apos;язкові для заповнення.
          </p>
          <SupportForm />
        </div>
      </section>
    </main>
  )
}
