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
        eyebrow="Світи планети"
        title="Дивовижні чужі ландшафти"
        description="Мандруйте материками планети Зловісний — кожен наповнений плаваючими кристалічними островами, світними лісами та древніми руїнами під сяйвом фіолетових місяців. Кожен куточок створено вручну нашою командою з лиховісним задумом."
        image="/bg-landscape.png"
        href="/features"
        linkLabel="Дослідити світи"
      />

      <FeatureSection
        eyebrow="Лут та економіка"
        title="Космічний лут та торгівля"
        description="Знаходьте легендарні артефакти, насичені енергією далеких зірок, і поєднуйте їх зі здібностями для нищівних ефектів. Продавайте здобич на міжпланетному ринку й станьте найбагатшим мандрівником у одній з найбільших економік Minecraft."
        image="/bg-veins.png"
        href="/features"
        linkLabel="Переглянути предмети"
        reverse
      />

      <FeatureSection
        eyebrow="Квести та рольова гра"
        title="Інтриги поміж зірок"
        description="Виконуйте складні квести з темними поворотами, відкривайте портали до невідомих вимірів і грайте за різні класи мандрівників. Занурюйтесь у похмурий сюжет, що розгортається на поверхні проклятої планети."
        image="/bg-eyes.png"
        href="/features"
        linkLabel="Почати пригоду"
      />

      <FeatureSection
        eyebrow="Ендгейм"
        title="Древні боси та рейди"
        description="Долайте складні рейди й перемагайте колосальних космічних босів, яких ще ніколи не бачили в Minecraft. Чи ви досвідчений мандрівник, чи новачок — на Зловісному завжди знайдеться зло, готове кинути виклик вашим навичкам."
        image="/bg-veins.png"
        href="/features"
        linkLabel="Кинути виклик"
        reverse
      />

      <JoinSection />
    </main>
  )
}
