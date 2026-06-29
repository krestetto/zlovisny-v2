'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { PageHeader } from '@/components/page-header'
import {
  Landmark,
  Building2,
  CookingPot,
  Palette,
  Swords,
  Sparkles,
  Map,
  Users,
  Search,
  ChevronRight,
  Info,
  Clock,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* ------------------------------------------------------------------ *
 *  ДАНІ ВІКІ
 *  Кожна стаття складається з блоків (heading / paragraph / list / note /
 *  table / quote). Заповнюй та редагуй текст прямо тут — макет підлаштується
 *  автоматично. Можна додавати скільки завгодно секцій та статей.
 * ------------------------------------------------------------------ */

type Block =
  | { type: 'heading'; id: string; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'note'; text: string }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'table'; head: string[]; rows: string[][] }

type Article = {
  id: string
  icon: LucideIcon
  category: string
  label: string
  title: string
  summary: string
  updated: string
  infobox: { label: string; value: string }[]
  blocks: Block[]
}

const ARTICLES: Article[] = [
  {
    id: 'politics',
    icon: Landmark,
    category: 'Механіки',
    label: 'Політика',
    title: 'Жива політична система',
    summary:
      'На Зловісному гравці самі формують владу. Створюйте фракції, укладайте союзи, оголошуйте війни та боріться за вплив на планеті.',
    updated: '—',
    infobox: [
      { label: 'Тип', value: 'Соціальна механіка' },
      { label: 'Учасники', value: 'Фракції, міста' },
      { label: 'Складність', value: 'Висока' },
    ],
    blocks: [
      { type: 'heading', id: 'politics-overview', text: 'Огляд' },
      {
        type: 'paragraph',
        text: 'Тут можна розмістити загальний опис політичної системи сервера. Розкажіть, як гравці отримують владу, які органи управління існують та як вони взаємодіють між собою.',
      },
      {
        type: 'note',
        text: 'Підказка: цей текст — приклад. Заповни його власним описом політичної механіки.',
      },
      { type: 'heading', id: 'politics-factions', text: 'Фракції та союзи' },
      {
        type: 'paragraph',
        text: 'Опишіть, як створюються фракції, як вступати до них та які переваги це дає. Додайте інформацію про дипломатію, союзи та зради.',
      },
      {
        type: 'list',
        items: [
          'Вибори лідерів та рад міст',
          'Дипломатія, союзи та зради',
          'Податки й спільна скарбниця фракції',
          'Війни за території та ресурси',
        ],
      },
      { type: 'heading', id: 'politics-wars', text: 'Війни' },
      {
        type: 'paragraph',
        text: 'Розкажіть про правила оголошення війни, захоплення територій та наслідки програшу. Тут можна детально розписати бойові механіки.',
      },
      {
        type: 'quote',
        text: 'Влада на Зловісному не дається — її виборюють.',
        author: 'Хроніки планети',
      },
    ],
  },
  {
    id: 'cities',
    icon: Building2,
    category: 'Механіки',
    label: 'Міста',
    title: 'Будівництво власних міст',
    summary:
      'Засновуйте поселення, розширюйте їх до велетенських мегаполісів та захищайте свої землі від загарбників і темних створінь.',
    updated: '—',
    infobox: [
      { label: 'Тип', value: 'Будівництво' },
      { label: 'Захист', value: 'Приватизація територій' },
      { label: 'Складність', value: 'Середня' },
    ],
    blocks: [
      { type: 'heading', id: 'cities-overview', text: 'Огляд' },
      {
        type: 'paragraph',
        text: 'Загальний опис системи міст. Поясніть, як заснувати поселення, як працює приватизація землі та як розвивати інфраструктуру.',
      },
      { type: 'heading', id: 'cities-roles', text: 'Ролі мешканців' },
      {
        type: 'list',
        items: [
          'Приватизація та захист територій',
          'Ролі мешканців і права доступу',
          'Спільні склади та інфраструктура',
          'Унікальні бафи для розвинених міст',
        ],
      },
      { type: 'heading', id: 'cities-levels', text: 'Рівні розвитку' },
      {
        type: 'table',
        head: ['Рівень', 'Мешканців', 'Бонус'],
        rows: [
          ['Поселення', '1–5', 'Базовий захист'],
          ['Місто', '6–15', '+ Спільний склад'],
          ['Мегаполіс', '16+', '+ Унікальні бафи'],
        ],
      },
    ],
  },
  {
    id: 'cooking',
    icon: CookingPot,
    category: 'Ремесла',
    label: 'Куховарство',
    title: 'Глибока система куховарства',
    summary:
      'Збирайте інгредієнти, відкривайте рецепти та готуйте страви, що дарують потужні тимчасові ефекти для пригод і боїв.',
    updated: '—',
    infobox: [
      { label: 'Тип', value: 'Ремесло' },
      { label: 'Рецептів', value: 'Сотні' },
      { label: 'Навичка', value: 'Кухар' },
    ],
    blocks: [
      { type: 'heading', id: 'cooking-overview', text: 'Огляд' },
      {
        type: 'paragraph',
        text: 'Опишіть систему куховарства: де брати інгредієнти, як відкривати рецепти та які ефекти дають страви.',
      },
      {
        type: 'list',
        items: [
          'Сотні рецептів різної складності',
          'Страви з бойовими та утиліті-ефектами',
          'Рідкісні інгредієнти з підземель',
          'Прокачування навички кухаря',
        ],
      },
    ],
  },
  {
    id: 'painting',
    icon: Palette,
    category: 'Ремесла',
    label: 'Малювання',
    title: 'Малювання та кастомізація',
    summary:
      'Перетворюйте свій світ на витвір мистецтва — створюйте власні картини, прапори фракцій та унікальний декор.',
    updated: '—',
    infobox: [
      { label: 'Тип', value: 'Творчість' },
      { label: 'Об’єкти', value: 'Картини, банери' },
      { label: 'Складність', value: 'Низька' },
    ],
    blocks: [
      { type: 'heading', id: 'painting-overview', text: 'Огляд' },
      {
        type: 'paragraph',
        text: 'Розкажіть, як гравці можуть малювати власні картини, створювати герби та декорувати свої будівлі.',
      },
      {
        type: 'list',
        items: [
          'Кастомні картини й банери',
          'Особисті герби та емблеми фракцій',
          'Декоративні блоки та меблі',
          'Галереї у містах гравців',
        ],
      },
    ],
  },
  {
    id: 'classes',
    icon: Swords,
    category: 'Розвиток',
    label: 'Прокачування класів',
    title: 'Розвиток пробуджених класів',
    summary:
      'Оберіть один із пробуджених шляхів сили та розвивайте його — відкривайте здібності, комбінуйте навички та станьте легендою.',
    updated: '—',
    infobox: [
      { label: 'Тип', value: 'Прогресія' },
      { label: 'Класів', value: '7 унікальних' },
      { label: 'Складність', value: 'Висока' },
    ],
    blocks: [
      { type: 'heading', id: 'classes-overview', text: 'Огляд' },
      {
        type: 'paragraph',
        text: 'Опишіть систему класів: як обрати клас, як прокачувати дерево навичок та як комбінувати вміння.',
      },
      {
        type: 'list',
        items: [
          '7 унікальних класів зі своїм стилем',
          'Дерева навичок та активні вміння',
          'Спорядження під кожен клас',
          'Пробудження прихованих сил',
        ],
      },
      {
        type: 'note',
        text: 'Детальніше про кожен клас читайте на сторінці «Класи».',
      },
    ],
  },
  {
    id: 'pve',
    icon: Sparkles,
    category: 'Контент',
    label: 'Боси та лут',
    title: 'Древні боси й легендарний лут',
    summary:
      'Кидайте виклик колосальним босам планети та здобувайте найрідкісніші артефакти, кожен з власним темним благословенням.',
    updated: '—',
    infobox: [
      { label: 'Тип', value: 'PvE' },
      { label: 'Босів', value: 'Десятки' },
      { label: 'Формат', value: 'Рейди' },
    ],
    blocks: [
      { type: 'heading', id: 'pve-overview', text: 'Огляд' },
      {
        type: 'paragraph',
        text: 'Розкажіть про босів сервера, де їх знайти, як зібрати команду та який лут можна отримати.',
      },
      {
        type: 'list',
        items: [
          'Десятки унікальних босів',
          'Рейди для команд та фракцій',
          'Легендарні сети спорядження',
          'Артефакти з особливими ефектами',
        ],
      },
    ],
  },
  {
    id: 'world',
    icon: Map,
    category: 'Контент',
    label: 'Світи',
    title: 'Кілька вимірів для дослідження',
    summary:
      'Окремі біоми та виміри зі своєю атмосферою, мешканцями й небезпеками чекають на найхоробріших дослідників.',
    updated: '—',
    infobox: [
      { label: 'Тип', value: 'Дослідження' },
      { label: 'Вимірів', value: 'Декілька' },
      { label: 'Мапа', value: 'Інтерактивна' },
    ],
    blocks: [
      { type: 'heading', id: 'world-overview', text: 'Огляд' },
      {
        type: 'paragraph',
        text: 'Опишіть світи та виміри сервера, їхні біоми, небезпеки та секрети.',
      },
      {
        type: 'list',
        items: [
          'Унікальні біоми та локації',
          'Жива інтерактивна мапа сервера',
          'Приховані підземелля та секрети',
          'Динамічні події у світі',
        ],
      },
    ],
  },
  {
    id: 'community',
    icon: Users,
    category: 'Спільнота',
    label: 'Спільнота',
    title: 'Активна спільнота гравців',
    summary:
      'Долучайтеся до дружньої спільноти, беріть участь в івентах та знаходьте союзників для нових звершень.',
    updated: '—',
    infobox: [
      { label: 'Тип', value: 'Соціальне' },
      { label: 'Платформа', value: 'Discord' },
      { label: 'Івенти', value: 'Регулярні' },
    ],
    blocks: [
      { type: 'heading', id: 'community-overview', text: 'Огляд' },
      {
        type: 'paragraph',
        text: 'Розкажіть про спільноту сервера, Discord, івенти та конкурси.',
      },
      {
        type: 'list',
        items: [
          'Регулярні івенти з нагородами',
          'Активний Discord-сервер',
          'Підтримка від адміністрації',
          'Конкурси будівництва та арту',
        ],
      },
    ],
  },
]

const CATEGORIES = Array.from(new Set(ARTICLES.map((a) => a.category)))

export default function FeaturesPage() {
  const [activeId, setActiveId] = useState(ARTICLES[0].id)
  const [query, setQuery] = useState('')
  const [activeHeading, setActiveHeading] = useState<string>('')
  const contentRef = useRef<HTMLDivElement | null>(null)

  const current = ARTICLES.find((a) => a.id === activeId) ?? ARTICLES[0]
  const Icon = current.icon

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ARTICLES
    return ARTICLES.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q),
    )
  }, [query])

  const headings = useMemo(
    () =>
      current.blocks.filter(
        (b): b is Extract<Block, { type: 'heading' }> => b.type === 'heading',
      ),
    [current],
  )

  // Reset scroll + active heading when switching articles
  useEffect(() => {
    setActiveHeading(headings[0]?.id ?? '')
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [activeId]) // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top, behavior: 'smooth' })
      setActiveHeading(id)
    }
  }

  return (
    <main className="flex-1">
      <PageHeader
        eyebrow="Особливості"
        title="Вікі сервера Зловісний"
        description="Енциклопедія механік, ремесел та контенту планети. Оберіть статтю ліворуч або скористайтеся пошуком."
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr] xl:grid-cols-[260px_1fr_220px]">
          {/* ===== Ліва навігація (як у вікі) ===== */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border border-border bg-card">
              <div className="border-b border-border p-3">
                <label htmlFor="wiki-search" className="sr-only">
                  Пошук по вікі
                </label>
                <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                  <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <input
                    id="wiki-search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Пошук статей…"
                    className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <nav className="max-h-[60vh] overflow-y-auto p-2" aria-label="Розділи вікі">
                {CATEGORIES.map((cat) => {
                  const items = filtered.filter((a) => a.category === cat)
                  if (items.length === 0) return null
                  return (
                    <div key={cat} className="mb-3">
                      <p className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {cat}
                      </p>
                      <ul className="mt-1 flex flex-col gap-0.5">
                        {items.map((a) => {
                          const isActive = a.id === activeId
                          const ItemIcon = a.icon
                          return (
                            <li key={a.id}>
                              <button
                                onClick={() => setActiveId(a.id)}
                                aria-current={isActive ? 'page' : undefined}
                                className={`flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors ${
                                  isActive
                                    ? 'bg-primary/10 font-semibold text-primary'
                                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                }`}
                              >
                                <ItemIcon className="h-4 w-4 shrink-0" />
                                <span className="min-w-0 truncate">{a.label}</span>
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )
                })}
                {filtered.length === 0 && (
                  <p className="px-2 py-4 text-center text-sm text-muted-foreground">
                    Нічого не знайдено.
                  </p>
                )}
              </nav>
            </div>
          </aside>

          {/* ===== Тіло статті ===== */}
          <article ref={contentRef} className="min-w-0">
            {/* Хлібні крихти */}
            <nav
              aria-label="Навігаційний ланцюжок"
              className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <span>Вікі</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span>{current.category}</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">{current.label}</span>
            </nav>

            {/* Заголовок статті */}
            <div className="flex items-start gap-4 border-b border-border pb-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary shadow-[0_0_24px_oklch(0.55_0.23_27_/_25%)]">
                <Icon className="h-7 w-7" />
              </div>
              <div className="min-w-0">
                <h1 className="font-heading text-3xl font-black uppercase tracking-tight text-foreground text-balance sm:text-4xl">
                  {current.title}
                </h1>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  Оновлено: {current.updated}
                </p>
              </div>
            </div>

            {/* Інфобокс (праворуч на десктопі) + вступ */}
            <div className="mt-6 md:flex md:items-start md:gap-6">
              <aside className="mb-6 w-full shrink-0 rounded-lg border border-primary/30 bg-secondary/40 md:order-last md:mb-0 md:w-64">
                <p className="rounded-t-lg border-b border-primary/30 bg-primary/10 px-4 py-2.5 text-center font-heading text-sm font-bold uppercase tracking-wide text-primary">
                  {current.label}
                </p>
                <dl className="divide-y divide-border">
                  {current.infobox.map((row) => (
                    <div key={row.label} className="flex gap-3 px-4 py-2.5 text-sm">
                      <dt className="w-24 shrink-0 font-semibold text-muted-foreground">
                        {row.label}
                      </dt>
                      <dd className="min-w-0 text-foreground">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </aside>

              <div className="min-w-0 flex-1">
                <p className="text-pretty text-lg leading-relaxed text-foreground">
                  {current.summary}
                </p>

                {/* Блоки контенту */}
                <div className="mt-6 flex flex-col gap-5">
                  {current.blocks.map((block, i) => {
                    switch (block.type) {
                      case 'heading':
                        return (
                          <h2
                            key={i}
                            id={block.id}
                            className="scroll-mt-28 border-b border-border pb-2 font-heading text-2xl font-bold uppercase tracking-tight text-foreground"
                          >
                            {block.text}
                          </h2>
                        )
                      case 'paragraph':
                        return (
                          <p
                            key={i}
                            className="text-pretty leading-relaxed text-muted-foreground"
                          >
                            {block.text}
                          </p>
                        )
                      case 'list':
                        return (
                          <ul key={i} className="flex flex-col gap-2">
                            {block.items.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 leading-relaxed text-foreground"
                              >
                                <Sparkles className="mt-1 h-4 w-4 shrink-0 text-accent" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )
                      case 'note':
                        return (
                          <div
                            key={i}
                            className="flex items-start gap-3 rounded-md border-l-4 border-primary bg-primary/5 px-4 py-3 text-sm leading-relaxed text-foreground"
                          >
                            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{block.text}</span>
                          </div>
                        )
                      case 'quote':
                        return (
                          <blockquote
                            key={i}
                            className="rounded-md border border-border bg-secondary/40 px-5 py-4 italic leading-relaxed text-foreground"
                          >
                            “{block.text}”
                            {block.author && (
                              <footer className="mt-2 text-sm not-italic text-muted-foreground">
                                — {block.author}
                              </footer>
                            )}
                          </blockquote>
                        )
                      case 'table':
                        return (
                          <div
                            key={i}
                            className="overflow-x-auto rounded-md border border-border"
                          >
                            <table className="w-full text-left text-sm">
                              <thead>
                                <tr className="bg-primary/10">
                                  {block.head.map((h) => (
                                    <th
                                      key={h}
                                      className="px-4 py-2.5 font-heading font-bold uppercase tracking-wide text-primary"
                                    >
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                {block.rows.map((row, ri) => (
                                  <tr key={ri} className="even:bg-secondary/30">
                                    {row.map((cell, ci) => (
                                      <td key={ci} className="px-4 py-2.5 text-foreground">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )
                      default:
                        return null
                    }
                  })}
                </div>
              </div>
            </div>
          </article>

          {/* ===== Зміст статті (праворуч, лише на xl) ===== */}
          <aside className="hidden xl:sticky xl:top-24 xl:block xl:self-start">
            {headings.length > 0 && (
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Зміст
                </p>
                <ul className="flex flex-col gap-1 border-l border-border">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <button
                        onClick={() => scrollToHeading(h.id)}
                        className={`-ml-px border-l-2 py-1 pl-3 text-left text-sm transition-colors ${
                          activeHeading === h.id
                            ? 'border-primary font-medium text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {h.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  )
}
