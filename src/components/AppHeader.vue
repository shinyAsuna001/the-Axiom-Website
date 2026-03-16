<template>
  <header class="main-header" :class="{ 'header-hidden': headerHidden }">
    <div class="logo">
      <img src="/logo.png" alt="AXIOM Logo" class="logo-icon">
      <span class="logo-text">公理 - <span class="logo-en">AXIOM</span></span>
    </div>
    <nav class="main-nav" ref="navRef">
      <div class="nav-slider" ref="sliderRef"></div>
      <a
        v-for="(item, index) in navItems"
        :key="index"
        href="#"
        class="nav-link"
        :class="{ active: currentPage === index }"
        @click.prevent="$emit('navigate', index)"
      >{{ item }}</a>
    </nav>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  currentPage: { type: Number, default: 0 },
  headerHidden: { type: Boolean, default: false }
})

defineEmits(['navigate'])

const navItems = ['首页', '百科', '公告', '社区', '加入']
const navRef = ref(null)
const sliderRef = ref(null)

function getNavLinkRect(index) {
  if (!navRef.value) return null
  const links = navRef.value.querySelectorAll('.nav-link')
  const link = links[index]
  if (!link) return null
  const navRect = navRef.value.getBoundingClientRect()
  const linkRect = link.getBoundingClientRect()
  return {
    left: linkRect.left - navRect.left,
    width: linkRect.width
  }
}

function positionSliderAt(index, animate) {
  const rect = getNavLinkRect(index)
  if (!rect || !sliderRef.value) return

  const pad = 2
  const targetLeft = rect.left - pad
  const targetWidth = rect.width + pad * 2
  const slider = sliderRef.value

  if (!animate) {
    slider.className = 'nav-slider ready'
    slider.style.left = targetLeft + 'px'
    slider.style.width = targetWidth + 'px'
    return
  }

  const currentLeft = parseFloat(slider.style.left) || 0
  const goingRight = targetLeft > currentLeft
  const stretchExtra = Math.min(Math.abs(targetLeft - currentLeft) * 0.3, 30)

  slider.className = `nav-slider ready moving ${goingRight ? 'stretch-right' : 'stretch-left'}`

  if (goingRight) {
    slider.style.width = (targetLeft + targetWidth - currentLeft + stretchExtra) + 'px'
  } else {
    const newLeft = targetLeft - stretchExtra
    const oldRight = currentLeft + parseFloat(slider.style.width)
    slider.style.left = newLeft + 'px'
    slider.style.width = (oldRight - newLeft) + 'px'
  }

  setTimeout(() => {
    slider.className = 'nav-slider ready settle'
    slider.style.left = targetLeft + 'px'
    slider.style.width = targetWidth + 'px'
  }, 300)
}

watch(() => props.currentPage, (newPage) => {
  positionSliderAt(newPage, true)
})

function onResize() {
  positionSliderAt(props.currentPage, false)
}

onMounted(() => {
  nextTick(() => positionSliderAt(props.currentPage, false))
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 60px;
  background: rgba(26, 16, 8, 0.5);
  backdrop-filter: blur(24px) saturate(1.4);
  -webkit-backdrop-filter: blur(24px) saturate(1.4);
  border-bottom: 1px solid rgba(139, 94, 60, 0.2);
  transition: background 0.3s ease, transform 0.5s var(--ease-out-expo);
}

.main-header.header-hidden {
  transform: translateY(-110%);
  pointer-events: none;
}

.main-header:hover {
  background: rgba(26, 16, 8, 0.7);
}

.main-header::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(200, 168, 78, 0.3), transparent);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  height: 36px;
  width: auto;
  filter: invert(1) drop-shadow(0 0 6px rgba(200, 168, 78, 0.5));
}

.logo-text {
  font-size: 22px;
  font-weight: 900;
  color: var(--text-light);
  text-shadow: 2px 2px 4px var(--shadow-heavy);
}

.logo-en {
  font-family: 'Cinzel', serif;
  letter-spacing: 3px;
}

.main-nav {
  display: flex;
  gap: 4px;
  position: relative;
  align-items: center;
}

.nav-slider {
  position: absolute;
  height: 36px;
  border-radius: 10px;
  background: radial-gradient(ellipse at 50% 40%, rgba(240, 208, 96, 0.25), rgba(200, 168, 78, 0.12));
  border: 1px solid rgba(200, 168, 78, 0.5);
  box-shadow:
    0 0 12px rgba(200, 168, 78, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  pointer-events: none;
  z-index: 0;
  will-change: transform, width, border-radius;
  opacity: 0;
  transition: none;
}

.nav-slider.ready { opacity: 1; }

.nav-slider.moving {
  transition:
    left 0.45s cubic-bezier(0.4, 0, 0.2, 1),
    width 0.45s cubic-bezier(0.4, 0, 0.2, 1),
    border-radius 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-slider.stretch-right { border-radius: 10px 20px 20px 10px; }
.nav-slider.stretch-left { border-radius: 20px 10px 10px 20px; }

.nav-slider.settle {
  transition:
    left 0.3s cubic-bezier(0.34, 1.2, 0.64, 1),
    width 0.3s cubic-bezier(0.34, 1.2, 0.64, 1),
    border-radius 0.3s cubic-bezier(0.34, 1.2, 0.64, 1);
  border-radius: 10px;
}

.nav-slider::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: radial-gradient(ellipse at 50% 30%, rgba(240, 208, 96, 0.1), transparent 70%);
  animation: slider-glow 2.5s ease-in-out infinite;
}

.nav-link {
  color: var(--parchment);
  text-decoration: none;
  padding: 8px 18px;
  font-size: 15px;
  font-weight: 700;
  border-radius: 8px;
  transition: color 0.25s ease, text-shadow 0.25s ease;
  border: 1px solid transparent;
  cursor: pointer;
  position: relative;
  z-index: 1;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  width: 0;
  height: 1.5px;
  background: var(--gold);
  border-radius: 1px;
  transition: width 0.3s var(--ease-out-expo), left 0.3s var(--ease-out-expo);
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 50%;
  left: 25%;
}

.nav-link:hover {
  color: var(--gold-bright);
  text-shadow: 0 0 8px rgba(200, 168, 78, 0.4);
}

.nav-link.active {
  color: var(--gold-bright);
  text-shadow: 0 0 10px rgba(200, 168, 78, 0.5);
}

@media (max-width: 960px) {
  .main-header {
    padding: 12px 24px;
    flex-direction: column;
    gap: 10px;
  }
  .main-nav {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
