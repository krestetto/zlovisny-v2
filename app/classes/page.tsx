"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Reveal } from "@/components/reveal"
import { ChevronDown, Play, Lock } from "lucide-react"

type ClassInfo = {
  id: string
  emoji: string
  name: string
  title: string
  image: string
  description: string
  videoUrl: string
  locked?: boolean
}

const CLASSES: ClassInfo[] = [
  {
    id: "marshal",
    emoji: "🔫",
    name: "Маршал",
    title: "Пробуджений Стрілець",
    image: "/class-marshal.png",
    description:
      "Клас для тих, хто надає перевагу дистанції та швидкості. Стрілець наносить величезну шкоду здалеку, використовуючи спритність, щоб уникати атак ворогів. Ваша головна зброя — влучність та мобільність.",
    videoUrl: "#",
  },
  {
    id: "dragon",
    emoji: "🐉",
    name: "Дракон",
    title: "Бойовий Митець",
    image: "/class-dragon.png",
    description:
      "Майстер бойових мистецтв, який використовує швидкі серії ударів та внутрішню енергію (Кі). Це дуже динамічний клас: ви будете постійно рухатися, комбінувати атаки та збивати ворогів з пантелику.",
    videoUrl: "#",
  },
  {
    id: "spirit",
    emoji: "🌿",
    name: "Дух",
    title: "Шаман",
    image: "/class-spirit.png",
    description:
      "Той, хто розмовляє з природою та стихіями. Шаман використовує сили землі для контролю поля бою. Він може як завдавати масової шкоди ворогам, так і підтримувати своїх союзників за допомогою тотемів та природної магії.",
    videoUrl: "#",
  },
  {
    id: "kairos",
    emoji: "⚔️",
    name: "Кайрос",
    title: "Пробуджений Воїн",
    image: "/class-kairos.png",
    description:
      "Справжній майстер ближнього бою, який покладається на грубу силу, витривалість та нищівні удари. Ідеальний вибір для тих, хто любить бути в центрі битви і приймати удар на себе, захищаючи своїх товаришів.",
    videoUrl: "#",
  },
  {
    id: "morovets",
    emoji: "🌑",
    name: "Моровець",
    title: "Тінемант",
    image: "/class-morovets.png",
    description:
      "Дуже небезпечний і таємничий клас, який керує темною магією та тінями. Тінемант чудово підходить для гравців, які люблять завдавати величезної магічної шкоди, проклинати ворогів та маніпулювати їхнім розумом.",
    videoUrl: "#",
  },
  {
    id: "elis",
    emoji: "✨",
    name: "Еліс",
    title: "Жрець",
    image: "/class-elis.png",
    description:
      "Незамінний учасник будь-якого міста чи рейду. Жрець володіє світлою магією, здатний лікувати союзників, накладати корисні бафи та рятувати команду в найскладніших ситуаціях у підземеллях.",
    videoUrl: "#",
  },
  {
    id: "secret",
    emoji: "❓",
    name: "???",
    title: "Невідомий клас",
    image: "/transition-eyes.png",
    description:
      "Цей клас ще не пробуджено. Його сила дрімає десь у надрах планети, чекаючи на гідного носія. Слідкуйте за оновленнями — незабаром завіса таємниці спаде.",
    videoUrl: "#",
    locked: true,
  },
]

function ClassCard({ info }: { info: ClassInfo }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`art-frame overflow-hidden rounded-lg border bg-card/70 backdrop-blur-sm transition-all duration-300 ${
        open
          ? "border-primary/60 shadow-[0_0_40px_oklch(0.62_0.24_320_/_35%)]"
          : "border-border hover:border-primary/40"
      }`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 p-4 text-left"
        aria-expanded={open}
      >
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border">
          <img
            src={info.image || "/placeholder.svg"}
            alt={info.locked ? "Прихований клас" : `Клас ${info.name}`}
            className="h-full w-full object-cover"
            style={{ imageRendering: "pixelated" }}
          />
          {info.locked && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/70">
              <Lock className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">
              {info.emoji}
            </span>
            <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-foreground">
              {info.name}
            </h3>
          </div>
          <p className="mt-0.5 text-sm font-medium text-accent">{info.title}</p>
        </div>
        <ChevronDown
          className={`h-6 w-6 shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border/60 p-5">
            <p className="text-pretty leading-relaxed text-muted-foreground">{info.description}</p>
            {!info.locked && (
              <a
                href={info.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shine mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_30px_oklch(0.62_0.24_320_/_55%)]"
              >
                <Play className="h-4 w-4" />
                Дивитися відео-огляд
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ClassesPage() {
  return (
    <main className="flex-1">
      <PageHeader
        title="Класи"
        subtitle="Шість пробуджених шляхів сили — та один, що досі спить. Оберіть свою долю на планеті Зловісний."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
        <div className="flex flex-col gap-5">
          {CLASSES.map((info, i) => (
            <Reveal key={info.id} delay={i * 60}>
              <ClassCard info={info} />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}
