import { Hero } from '@/components/hero'
import { StatsBar } from '@/components/stats-bar'
import { FeatureSection } from '@/components/feature-section'
import { JoinSection } from '@/components/join-section'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsBar />

      <FeatureSection
        eyebrow="Світ"
        title="Темні готичні споруди"
        description="Мандруйте проклятими землями Зловісного — кожна з них наповнена моторошними готичними соборами, зруйнованими замками та похмурими ландшафтами, створеними нашою командою будівельників протягом років. Жодних зовнішніх генераторів — усе зроблено вручну з лиховісним задумом."
        image="/feature-builds.png"
        href="/features"
        linkLabel="Дослідити світ"
      />

      <FeatureSection
        eyebrow="Лут та економіка"
        title="Проклятий лут та торгівля"
        description="Знаходьте легендарні артефакти й поєднуйте їх зі здібностями для нищівних ефектів. Продавайте здобич на темному ринку й станьте найбагатшим — або найжаднішим — гравцем у одній з найбільших економік серверів Minecraft."
        image="/feature-loot.png"
        href="/features"
        linkLabel="Переглянути предмети"
        reverse
      />

      <FeatureSection
        eyebrow="Квести та рольова гра"
        title="Інтриги та таємниці"
        description="Виконуйте складні квести, повні темних поворотів. Грайте за різні класи та архетипи, занурюйтесь у похмурий сюжет і розкривайте секрети, що ховаються в тінях занедбаних селищ."
        image="/feature-quests.png"
        href="/features"
        linkLabel="Почати пригоду"
      />

      <FeatureSection
        eyebrow="Ендгейм"
        title="Моторошні боси та рейди"
        description="Долайте складні рейди й перемагайте жахливих босів, яких ще ніколи не бачили в Minecraft. Чи ви досвідчений мисливець, чи новачок — у Зловісному завжди знайдеться темрява, готова кинути виклик вашим навичкам."
        image="/feature-bosses.png"
        href="/features"
        linkLabel="Кинути виклик"
        reverse
      />

      <JoinSection />
    </main>
  )
}
