<template>
  <section class="fp-section fp-dark" :class="{ active }">
    <div class="fp-center">
      <div class="section-title">
        <h2>核心玩法</h2>
        <span class="section-subtitle">Core Gameplay</span>
      </div>
      <div class="gameplay-grid">
        <div
          v-for="(item, i) in items"
          :key="i"
          class="gameplay-item reveal-item"
          @mouseenter="spawnParticles($event)"
        >
          <div class="gameplay-icon" v-html="item.icon"></div>
          <span class="gameplay-label">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ active: Boolean })

const items = [
  {
    label: 'RPG副本',
    icon: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 8L8 24v16l24 16 24-16V24L32 8z" stroke="currentColor" stroke-width="2" fill="none"/><path d="M20 28l12-8 12 8-12 8-12-8z" fill="currentColor" opacity="0.3"/><path d="M32 36v16M20 28v12M44 28v12" stroke="currentColor" stroke-width="2"/></svg>'
  },
  {
    label: '自定义天赋',
    icon: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 4L28 28H8l20 12-8 20 12-16 12 16-8-20 20-12H36L32 4z" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.2"/></svg>'
  },
  {
    label: '虚空副本',
    icon: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="20" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.15"/><circle cx="32" cy="32" r="10" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.3"/><circle cx="32" cy="32" r="4" fill="currentColor"/></svg>'
  },
  {
    label: '经济系统',
    icon: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 8c-8 0-16 4-16 12 0 4 2 7 6 9l-2 7h24l-2-7c4-2 6-5 6-9 0-8-8-12-16-12z" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.2"/><rect x="24" y="40" width="16" height="4" rx="1" fill="currentColor" opacity="0.4"/><rect x="26" y="46" width="12" height="4" rx="1" fill="currentColor" opacity="0.4"/><path d="M32 16v8M26 20h12" stroke="currentColor" stroke-width="2"/></svg>'
  }
]

const PARTICLE_COLORS = ['#c8a84e', '#f0d060', '#e8dcc0']

function spawnParticles(e) {
  const el = e.currentTarget
  for (let i = 0; i < 3; i++) {
    const particle = document.createElement('span')
    particle.style.cssText = `
      position:absolute;width:4px;height:4px;
      background:${PARTICLE_COLORS[i]};border-radius:50%;
      pointer-events:none;z-index:10;
      animation:particle-float 0.8s ease-out forwards;
      animation-delay:${i * 0.1}s;
      left:${20 + Math.random() * 60}%;
      top:${20 + Math.random() * 60}%;
    `
    el.appendChild(particle)
    setTimeout(() => particle.remove(), 1000)
  }
}
</script>

<style scoped>
.gameplay-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  perspective: 800px;
}

.gameplay-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 28px 16px;
  background: rgba(58, 53, 48, 0.5);
  border: 1px solid rgba(90, 90, 90, 0.4);
  border-radius: 14px;
  transition: transform 0.4s var(--ease-out-quart), box-shadow 0.4s ease,
    border-color 0.3s ease, background 0.3s ease;
  cursor: pointer;
  transform-style: preserve-3d;
}

.gameplay-item:hover {
  background: rgba(200, 168, 78, 0.08);
  border-color: var(--gold);
  transform: perspective(800px) rotateX(-3deg) translateY(-8px);
  box-shadow:
    0 24px 48px -16px var(--shadow-medium),
    inset 0 1px 0 rgba(200, 168, 78, 0.1);
}

.gameplay-icon {
  width: 60px;
  height: 60px;
  color: var(--parchment);
  transition: color 0.3s ease, transform 0.4s var(--ease-out-quart);
}

.gameplay-item:hover .gameplay-icon {
  color: var(--gold-bright);
  animation: float-gentle 2s ease-in-out infinite;
}

.gameplay-label {
  font-size: 15px;
  font-weight: 700;
  color: var(--parchment);
  text-shadow: 1px 1px 2px var(--shadow-heavy);
}

@media (max-width: 960px) {
  .gameplay-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .gameplay-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
}
</style>
