import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { ExternalLink, Gift, Trophy, Crown } from "lucide-react"

const voteSites = [
  { name: "MinecraftServers.org", reward: "2 Тіньових ключі", url: "#" },
  { name: "TopG.org", reward: "1 Темна руна", url: "#" },
  { name: "Minecraft-MP.com", reward: "150 кривавих монет", url: "#" },
  { name: "ServerList-MC.com", reward: "1 Тіньовий ключ", url: "#" },
]

const topVoters = [
  { rank: 1, name: "NightCrawler", votes: 312 },
  { rank: 2, name: "VoidWalker_77", votes: 287 },
  { rank: 3, name: "CrimsonReaper", votes: 254 },
  { rank: 4, name: "EyeOfChaos", votes: 198 },
  { rank: 5, name: "ShadowMancer", votes: 176 },
]

export default function VotePage() {
  return (
    <main className="flex-1">
        <PageHeader
          eyebrow="Підтримай сервер"
          title="Голосування"
          description="Голосуйте за Зловісний щодня та отримуйте темні нагороди. Кожен голос наближає нас до вершини рейтингів."
        />

        <section className="mx-auto w-full max-w-6xl px-4 py-16">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            {/* Vote sites */}
            <div>
              <div className="mb-6 flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                <h2 className="font-serif text-2xl text-foreground">Майданчики для голосування</h2>
              </div>
              <div className="flex flex-col gap-4">
                {voteSites.map((site) => (
                  <div
                    key={site.name}
                    className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/60 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h3 className="font-serif text-lg text-foreground">{site.name}</h3>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Gift className="h-3.5 w-3.5 text-primary" />
                        Нагорода: {site.reward}
                      </p>
                    </div>
                    <Button asChild className="shrink-0">
                      <a href={site.url}>
                        Голосувати
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Top voters */}
            <div>
              <div className="mb-6 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <h2 className="font-serif text-2xl text-foreground">Топ голосуючих</h2>
              </div>
              <div className="rounded-lg border border-border bg-card p-2">
                {topVoters.map((voter) => (
                  <div
                    key={voter.rank}
                    className="flex items-center justify-between rounded-md px-4 py-3 transition-colors hover:bg-muted/40"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-md text-sm font-bold ${
                          voter.rank === 1
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {voter.rank === 1 ? <Crown className="h-4 w-4" /> : voter.rank}
                      </span>
                      <span className="text-sm text-foreground">{voter.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">{voter.votes}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
                Рейтинг оновлюється щомісяця. Топ-3 гравці отримують ексклюзивні темні предмети.
              </p>
            </div>
          </div>
        </section>
      </main>
  )
}
