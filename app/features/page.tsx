import { PageHeader } from '@/components/page-header'
import { FeatureSection } from '@/components/feature-section'
import {
  Skull,
  Swords,
  Gem,
  Map,
  Users,
  Crown,
  Flame,
  Ghost,
} from 'lucide-react'

const classes = [
  {
    icon: Swords,
    name: 'Жнець',
    desc: 'Майстер ближнього бою, що живиться душами полеглих ворогів.',
  },
  {
    icon: Flame,
    name: 'Підпалювач',
    desc: 'Володар проклятого вогню, спалює все на своєму шляху.',
  },
  {
    icon: Ghost,
    name: 'Спіритист',
    desc: 'Прикликає духів темряви та керує силами потойбіччя.',
  },
  {
    icon: Crown,
    name: 'Тиран',
    desc: 'Танк-командир, що веде союзників у найжахливіші битви.',
  },
]

const highlights = [
  { icon: Skull, title: '120+ босів', desc: 'Унікальні моторошні боси з власними механіками.' },
  { icon: Map, title: '4 проклятих світи', desc: 'Окремі біоми зі своєю атмосферою жаху.' },
  { icon: Gem, title: 'Легендарний лут', desc: 'Сотні проклятих предметів та артефактів.' },
  { icon: Users, title: 'Гільдії', desc: 'Об\u2019єднуйтесь та захоплюйте території.' },
]

export default function FeaturesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Особливості"
        title="Що приховує темрява"
        description="Зловісний — це не просто сервер. Це проклятий світ, наповнений небезпеками, таємницями та винагородами для найхоробріших."
      />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-md border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <item.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-heading text-lg font-bold uppercase tracking-wide text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <FeatureSection
        eyebrow="Боси"
        title="Жахи, що чекають на тебе"
        description="Кожен бос Зловісного — це випробування на межі можливого. Від велетенських ельдрітч-створінь до проклятих лицарів — кожен бій вимагає стратегії, координації та неабиякої сміливості. Перемога приносить найрідкісніший лут на сервері."
        image="/feature-bosses.png"
        href="/store"
        linkLabel="Підготуватися до бою"
      />

      <FeatureSection
        eyebrow="Лут"
        title="Сила проклятих артефактів"
        description="Збирайте легендарні зброю та обладунки, кожна частина яких несе власне темне благословення. Комбінуйте ефекти, куйте набори та станьте легендою серед гравців проклятого світу."
        image="/feature-loot.png"
        href="/store"
        linkLabel="Переглянути артефакти"
        reverse
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Класи
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
              Обери свій шлях у темряві
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {classes.map((cls) => (
              <div
                key={cls.name}
                className="group flex flex-col items-center rounded-md border border-border bg-card p-8 text-center transition-all hover:border-accent/50 hover:bg-secondary/40"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-sm border border-accent/30 bg-accent/10 transition-colors group-hover:bg-accent/20">
                  <cls.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold uppercase tracking-wide text-foreground">
                  {cls.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {cls.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
