'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

const SERVER_IP = 'zlovisny.space'

const steps = [
  'Запустіть Minecraft: Java Edition',
  'У розділі «Мережева гра» натисніть «Додати сервер»',
  'Введіть IP-адресу сервера у відповідне поле',
  'Отримайте прохідку, та насолоджуйтесь сервером.',
]

export function JoinSection() {
  const [copied, setCopied] = useState(false)

  const copyIp = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP)
    } catch {
      const el = document.createElement('textarea')
      el.value = SERVER_IP
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative overflow-hidden bg-black">
      {/* Replaceable background photo — swap /home-section-bg.png for your own */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/home-section-bg.png)' }}
        aria-hidden="true"
      />
      {/* Darkening for readability — keeps the cursed landscape visible */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/80"
        aria-hidden="true"
      />
      <div className="bg-grain absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Приєднуйся зараз
          </span>
          <h2 className="mt-4 font-heading text-4xl font-black uppercase tracking-tight text-white text-balance sm:text-5xl">
            Грай на <span className="text-glow-violet text-primary">Зловісному</span>
          </h2>
          <p className="mt-5 text-pretty text-white/65">
            Готові розпочати? Запустіть Minecraft: Java Edition і увійдіть на наш
            сервер. Жодних модів не потрібно - лише ваша рішучість.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-md border border-primary/20 bg-white/[0.04] p-4 backdrop-blur-sm transition-colors hover:border-primary/40"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-primary font-heading text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <p className="pt-1 text-sm text-white/85">{step}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center rounded-md border border-primary/30 bg-white/[0.04] p-8 text-center backdrop-blur-sm">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
              IP-адреса сервера
            </span>
            <button
              onClick={copyIp}
              className="mt-4 flex items-center gap-3 rounded-sm border border-primary/50 bg-primary/15 px-6 py-4 font-mono text-lg font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              zlovisny.space
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </button>
            <p className="mt-4 text-xs text-white/40">
              Версія: 1.21.х · Java Edition
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
