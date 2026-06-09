import { PageHeader } from "@/components/page-header"
import { Skull, MessageSquareOff, UserX, Pickaxe, ShieldAlert, Bug } from "lucide-react"

const ruleCategories = [
  {
    icon: Skull,
    title: "Загальні правила",
    rules: [
      "Поважайте всіх гравців та учасників спільноти.",
      "Заборонено будь-які форми образ, погроз та дискримінації.",
      "Реклама сторонніх проєктів суворо заборонена.",
      "Адміністрація завжди має останнє слово у спірних ситуаціях.",
    ],
  },
  {
    icon: Bug,
    title: "Чесна гра",
    rules: [
      "Використання читів, X-Ray та модів на перевагу — бан назавжди.",
      "Заборонено використовувати баги та вразливості сервера.",
      "Дюпи предметів караються видаленням акаунта.",
      "Макроси та авто-клікери заборонені.",
    ],
  },
  {
    icon: Pickaxe,
    title: "Грифінг та крадіжки",
    rules: [
      "Заборонено руйнувати чужі будівлі без дозволу.",
      "Крадіжка з приватних територій карається баном.",
      "Не претендуйте на території біля чужих баз.",
      "Поважайте чужу власність у світі Зловісного.",
    ],
  },
  {
    icon: MessageSquareOff,
    title: "Чат та спілкування",
    rules: [
      "Заборонено спамити та флудити у загальному чаті.",
      "Не використовуйте КАПС без потреби.",
      "Нецензурна лексика на адресу гравців заборонена.",
      "Спілкування виключно державною або англійською мовою.",
    ],
  },
  {
    icon: UserX,
    title: "Облікові записи",
    rules: [
      "Один гравець — один акаунт. Мультиакаунтинг заборонено.",
      "Ви несете відповідальність за безпеку свого акаунта.",
      "Заборонено передавати акаунт третім особам.",
      "Видавання себе за адміністрацію — миттєвий бан.",
    ],
  },
  {
    icon: ShieldAlert,
    title: "Покарання",
    rules: [
      "Попередження видаються за дрібні порушення.",
      "Тимчасовий мут або бан за повторні порушення.",
      "Перманентний бан за серйозні порушення.",
      "Оскаржити покарання можна на нашому Discord-сервері.",
    ],
  },
]

export default function RulesPage() {
  return (
    <main className="flex-1">
        <PageHeader
          eyebrow="Закон Зловісного"
          title="Правила сервера"
          description="Дотримання правил — запорука виживання у нашому темному світі. Прочитайте уважно, перш ніж зануритися у пітьму."
        />
        <section className="mx-auto w-full max-w-6xl px-4 py-16">
          <div className="grid gap-6 md:grid-cols-2">
            {ruleCategories.map((cat) => {
              const Icon = cat.icon
              return (
                <div
                  key={cat.title}
                  className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/60"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h2 className="font-serif text-xl text-foreground">{cat.title}</h2>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {cat.rules.map((rule, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          <div className="mt-12 rounded-lg border border-primary/30 bg-primary/5 p-6 text-center">
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              Реєструючись на сервері Зловісний, ви автоматично погоджуєтесь з усіма правилами. Незнання правил не
              звільняє від відповідальності перед Оком.
            </p>
          </div>
        </section>
      </main>
  )
}
