<template>
  <section class="fp-section fp-dark" :class="{ active }">
    <div class="fp-center">
      <div class="section-title" :class="{ 'title-exit': wikiOpen }">
        <h2>游戏百科</h2>
        <span class="section-subtitle">Game Wiki</span>
      </div>
      <div class="wiki-grid">
        <a
          v-for="(card, i) in cards"
          :key="card.id"
          href="#"
          class="wiki-card reveal-item"
          :class="{ 'card-exit': wikiOpen }"
          :style="{ '--ci': i }"
          @click.prevent="openCard($event, card.id)"
        >
          <div class="wiki-icon" v-html="card.icon"></div>
          <h3>{{ card.title }}</h3>
          <p>{{ card.desc }}</p>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ active: Boolean, wikiOpen: Boolean })
const emit = defineEmits(['openWiki'])

const cards = [
  {
    id: 'items',
    title: '物品图鉴',
    desc: '武器、防具、材料与传说级道具',
    icon: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 6L18 16v32l14 10 14-10V16L32 6z" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.15"/><path d="M24 30h16M24 36h12M24 42h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="32" cy="20" r="4" fill="currentColor" opacity="0.4"/></svg>'
  },
  {
    id: 'monsters',
    title: '怪物图鉴',
    desc: 'Boss 属性、掉落表与弱点解析',
    icon: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 48c0-8 6-12 12-18 6 6 12 10 12 18" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.15"/><circle cx="32" cy="22" r="10" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.1"/><circle cx="28" cy="20" r="2" fill="currentColor" opacity="0.5"/><circle cx="36" cy="20" r="2" fill="currentColor" opacity="0.5"/><path d="M28 26c2 2 4 2 8 0" stroke="currentColor" stroke-width="1.5"/></svg>'
  },
  {
    id: 'skills',
    title: '技能大全',
    desc: '天赋树、技能搭配与流派推荐',
    icon: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 8l4 12h12l-10 8 4 12-10-8-10 8 4-12-10-8h12l4-12z" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.2"/><circle cx="32" cy="48" r="6" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.15"/><path d="M32 42v-6" stroke="currentColor" stroke-width="2"/></svg>'
  },
  {
    id: 'dungeons',
    title: '副本攻略',
    desc: '通关策略、阵容推荐与隐藏机制',
    icon: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="14" width="44" height="36" rx="4" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.1"/><path d="M10 26h44" stroke="currentColor" stroke-width="2"/><circle cx="22" cy="38" r="4" fill="currentColor" opacity="0.3"/><circle cx="42" cy="38" r="4" fill="currentColor" opacity="0.3"/><path d="M26 38h12" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2"/></svg>'
  },
  {
    id: 'classes',
    title: '职业介绍',
    desc: '战士、法师、游侠与隐藏职业',
    icon: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 12v40l12-8 12 8V12H20z" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.15"/><path d="M26 24h12M26 30h12M26 36h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
  },
  {
    id: 'worldmap',
    title: '世界地图',
    desc: '区域探索、传送点与隐藏地点',
    icon: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="22" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.1"/><path d="M32 10v44M10 32h44" stroke="currentColor" stroke-width="1" opacity="0.3"/><circle cx="24" cy="26" r="3" fill="currentColor" opacity="0.4"/><circle cx="40" cy="22" r="2" fill="currentColor" opacity="0.3"/><circle cx="36" cy="38" r="4" fill="currentColor" opacity="0.35"/><circle cx="22" cy="40" r="2.5" fill="currentColor" opacity="0.3"/></svg>'
  }
]

function openCard(e, wikiId) {
  const rect = e.currentTarget.getBoundingClientRect()
  emit('openWiki', wikiId, {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height
  })
}
</script>

<style scoped>
.wiki-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  perspective: 800px;
}

.wiki-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 28px 20px 24px;
  background: rgba(58, 53, 48, 0.5);
  border: 1px solid rgba(90, 90, 90, 0.4);
  border-radius: 14px;
  text-decoration: none;
  transition: transform 0.4s var(--ease-out-quart), box-shadow 0.4s ease,
    border-color 0.3s ease, background 0.3s ease;
  cursor: pointer;
  transform-style: preserve-3d;
}

.wiki-card:hover {
  background: rgba(200, 168, 78, 0.08);
  border-color: var(--gold);
  transform: perspective(800px) rotateX(-2.5deg) translateY(-8px);
  box-shadow:
    0 24px 48px -16px var(--shadow-medium),
    inset 0 1px 0 rgba(200, 168, 78, 0.1);
}

.wiki-icon {
  width: 52px;
  height: 52px;
  color: var(--parchment);
  transition: color 0.3s ease;
}

.wiki-card:hover .wiki-icon {
  color: var(--gold-bright);
  animation: float-gentle 2s ease-in-out infinite;
}

.wiki-card h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--parchment-light);
  text-shadow: 1px 1px 2px var(--shadow-heavy);
}

.wiki-card p {
  font-size: 13px;
  color: var(--parchment-dark);
  text-align: center;
  line-height: 1.5;
}

/* ── card & title exit animation ── */
.section-title {
  transition: opacity 0.3s ease, transform 0.35s ease;
}

.section-title.title-exit {
  opacity: 0;
  transform: translateY(-18px) scale(0.96);
  pointer-events: none;
}

.fp-section.active .wiki-card.card-exit {
  opacity: 0;
  transform: scale(0.78);
  transition: opacity 0.3s ease, transform 0.38s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: calc(var(--ci) * 0.025s);
  pointer-events: none;
}

@media (max-width: 960px) {
  .wiki-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .wiki-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
}
</style>
