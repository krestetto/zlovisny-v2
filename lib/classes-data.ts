import type { LucideIcon } from 'lucide-react'
import { Crosshair, Flame, Leaf, Swords, Moon, Sparkles, HelpCircle } from 'lucide-react'

export type ClassInfo = {
  id: string
  icon: LucideIcon
  name: string
  title: string
  image: string
  description: string
  stats: { label: string; value: number }[]
  videoUrl: string
  locked?: boolean
}

export const CLASSES: ClassInfo[] = [
  {
    id: 'marshal',
    icon: Crosshair,
    name: 'Маршал',
    title: 'Пробуджений Стрілець',
    image: '/class-marshal.png',
    description:
      'Клас для тих, хто надає перевагу дистанції та швидкості. Стрілець наносить величезну шкоду здалеку, використовуючи спритність, щоб уникати атак ворогів. Ваша головна зброя — влучність та мобільність.',
    stats: [
      { label: 'Шкода', value: 90 },
      { label: 'Мобільність', value: 85 },
      { label: 'Захист', value: 35 },
      { label: 'Складність', value: 60 },
    ],
    videoUrl: '#',
  },
  {
    id: 'dragon',
    icon: Flame,
    name: 'Дракон',
    title: 'Бойовий Митець',
    image: '/class-dragon.png',
    description:
      'Майстер бойових мистецтв, який використовує швидкі серії ударів та внутрішню енергію (Кі). Це дуже динамічний клас: ви будете постійно рухатися, комбінувати атаки та збивати ворогів з пантелику.',
    stats: [
      { label: 'Шкода', value: 80 },
      { label: 'Мобільність', value: 90 },
      { label: 'Захист', value: 45 },
      { label: 'Складність', value: 75 },
    ],
    videoUrl: '#',
  },
  {
    id: 'spirit',
    icon: Leaf,
    name: 'Дух',
    title: 'Шаман',
    image: '/class-spirit.png',
    description:
      'Той, хто розмовляє з природою та стихіями. Шаман використовує сили землі для контролю поля бою. Він може як завдавати масової шкоди ворогам, так і підтримувати своїх союзників за допомогою тотемів та природної магії.',
    stats: [
      { label: 'Шкода', value: 65 },
      { label: 'Підтримка', value: 80 },
      { label: 'Захист', value: 55 },
      { label: 'Складність', value: 70 },
    ],
    videoUrl: '#',
  },
  {
    id: 'kairos',
    icon: Swords,
    name: 'Кайрос',
    title: 'Пробуджений Воїн',
    image: '/class-kairos.png',
    description:
      'Справжній майстер ближнього бою, який покладається на грубу силу, витривалість та нищівні удари. Ідеальний вибір для тих, хто любить бути в центрі битви і приймати удар на себе, захищаючи своїх товаришів.',
    stats: [
      { label: 'Шкода', value: 75 },
      { label: 'Мобільність', value: 40 },
      { label: 'Захист', value: 95 },
      { label: 'Складність', value: 35 },
    ],
    videoUrl: '#',
  },
  {
    id: 'morovets',
    icon: Moon,
    name: 'Моровець',
    title: 'Тінемант',
    image: '/class-morovets.png',
    description:
      'Дуже небезпечний і таємничий клас, який керує темною магією та тінями. Тінемант чудово підходить для гравців, які люблять завдавати величезної магічної шкоди, проклинати ворогів та маніпулювати їхнім розумом.',
    stats: [
      { label: 'Шкода', value: 95 },
      { label: 'Мобільність', value: 55 },
      { label: 'Захист', value: 30 },
      { label: 'Складність', value: 85 },
    ],
    videoUrl: '#',
  },
  {
    id: 'elis',
    icon: Sparkles,
    name: 'Еліс',
    title: 'Жрець',
    image: '/class-elis.png',
    description:
      'Незамінний учасник будь-якого міста чи рейду. Жрець володіє світлою магією, здатний лікувати союзників, накладати корисні бафи та рятувати команду в найскладніших ситуаціях у підземеллях.',
    stats: [
      { label: 'Зцілення', value: 95 },
      { label: 'Підтримка', value: 90 },
      { label: 'Шкода', value: 30 },
      { label: 'Складність', value: 65 },
    ],
    videoUrl: '#',
  },
  {
    id: 'secret',
    icon: HelpCircle,
    name: '???',
    title: 'Невідомий клас',
    image: '/transition-eyes.png',
    description:
      'Цей клас ще не пробуджено. Його сила дрімає десь у надрах планети, чекаючи на гідного носія. Слідкуйте за оновленнями — незабаром завіса таємниці спаде.',
    stats: [
      { label: '???', value: 0 },
      { label: '???', value: 0 },
      { label: '???', value: 0 },
      { label: '???', value: 0 },
    ],
    videoUrl: '#',
    locked: true,
  },
]
