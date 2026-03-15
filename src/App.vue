<template>
  <div class="bg-layer">
    <div class="bg-image" ref="bgImageRef"></div>
  </div>

  <AppHeader
    :current-page="currentPage"
    :header-hidden="wikiOpen"
    @navigate="goToPage"
  />

  <div class="fullpage-wrapper" ref="wrapperRef">
    <HeroSection :active="visiblePage === 0" @navigate="goToPage" />
    <GameplaySection :active="visiblePage === 1" />
    <WikiSection :active="visiblePage === 2" :wiki-open="wikiOpen" @open-wiki="handleOpenWiki" />
    <NewsSection :active="visiblePage === 3" />
    <CommunitySection :active="visiblePage === 4" />
    <JoinSection :active="visiblePage === 5" />
  </div>

  <WikiDetail
    :active-wiki="activeWiki"
    :card-rect="savedCardRect"
    :open="wikiOpen"
    @close="closeWiki"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import GameplaySection from './components/GameplaySection.vue'
import WikiSection from './components/WikiSection.vue'
import NewsSection from './components/NewsSection.vue'
import CommunitySection from './components/CommunitySection.vue'
import JoinSection from './components/JoinSection.vue'
import WikiDetail from './components/WikiDetail.vue'

const TOTAL_PAGES = 6
const TRANSITION_MS = 900
const COOLDOWN_MS = 1000
const BLUR_PER_PAGE = 6
const WHEEL_THRESHOLD = 50
const SWIPE_THRESHOLD = 50

const currentPage = ref(0)
const visiblePage = ref(0)
const isAnimating = ref(false)
const wikiOpen = ref(false)
const activeWiki = ref(null)
const savedCardRect = ref(null)

const wrapperRef = ref(null)
const bgImageRef = ref(null)

let revealTimer = null

function goToPage(index) {
  if (index < 0 || index >= TOTAL_PAGES || index === currentPage.value || isAnimating.value) return
  isAnimating.value = true
  visiblePage.value = -1
  currentPage.value = index

  if (wrapperRef.value) {
    wrapperRef.value.style.transform = `translateY(-${index * 100}vh)`
  }
  if (bgImageRef.value) {
    bgImageRef.value.style.filter = `blur(${index * BLUR_PER_PAGE}px)`
    bgImageRef.value.style.transform = `scale(${1 + index * 0.018})`
  }

  clearTimeout(revealTimer)
  revealTimer = setTimeout(() => {
    visiblePage.value = index
  }, TRANSITION_MS * 0.3)

  setTimeout(() => {
    isAnimating.value = false
  }, COOLDOWN_MS)
}

function handleOpenWiki(wikiId, cardRect) {
  activeWiki.value = wikiId
  savedCardRect.value = cardRect
  wikiOpen.value = true
}

function closeWiki() {
  wikiOpen.value = false
}

let wheelAccum = 0
function onWheel(e) {
  e.preventDefault()
  if (isAnimating.value || wikiOpen.value) return
  wheelAccum += e.deltaY
  if (Math.abs(wheelAccum) >= WHEEL_THRESHOLD) {
    goToPage(wheelAccum > 0 ? currentPage.value + 1 : currentPage.value - 1)
    wheelAccum = 0
  }
}

function onKeydown(e) {
  if (wikiOpen.value) {
    if (e.key === 'Escape') closeWiki()
    return
  }
  if (isAnimating.value) return
  switch (e.key) {
    case 'ArrowDown':
    case 'PageDown':
    case ' ':
      e.preventDefault()
      goToPage(currentPage.value + 1)
      break
    case 'ArrowUp':
    case 'PageUp':
      e.preventDefault()
      goToPage(currentPage.value - 1)
      break
    case 'Home':
      e.preventDefault()
      goToPage(0)
      break
    case 'End':
      e.preventDefault()
      goToPage(TOTAL_PAGES - 1)
      break
  }
}

let touchStartY = 0
function onTouchStart(e) {
  touchStartY = e.changedTouches[0].screenY
}
function onTouchEnd(e) {
  if (isAnimating.value || wikiOpen.value) return
  const diff = touchStartY - e.changedTouches[0].screenY
  if (Math.abs(diff) > SWIPE_THRESHOLD) {
    goToPage(diff > 0 ? currentPage.value + 1 : currentPage.value - 1)
  }
}

onMounted(() => {
  window.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchend', onTouchEnd, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('wheel', onWheel)
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchend', onTouchEnd)
})
</script>
