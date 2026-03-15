<template>
  <section class="fp-section hero-banner" :class="{ active }">
    <div class="hero-overlay"></div>
    <div class="hero-castle"></div>
    <div class="hero-content">
      <h1>欢迎来到公理的世界</h1>
      <div class="hero-gold-line"></div>
      <p class="hero-subtitle">探索科技与魔法的完美融合，书写属于你的传说</p>
      <a href="#" class="btn-order" @click.prevent="$emit('navigate', 5)">Order</a>
    </div>
    <div class="scroll-hint">
      <span class="scroll-hint-text">向下滚动</span>
      <div class="scroll-hint-pulse"></div>
      <div class="scroll-hint-arrow"></div>
    </div>
  </section>
</template>

<script setup>
defineProps({ active: Boolean })
defineEmits(['navigate'])
</script>

<style scoped>
.hero-banner {
  background: transparent;
}

.hero-castle {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(26, 16, 8, 0.3) 0%, transparent 30%, transparent 55%, rgba(26, 16, 8, 0.75) 100%),
    linear-gradient(90deg, rgba(26, 16, 8, 0.4) 0%, transparent 25%, transparent 75%, rgba(26, 16, 8, 0.4) 100%);
  pointer-events: none;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 30%, rgba(26, 16, 8, 0.5) 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 0 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero-content h1 {
  font-size: 48px;
  font-weight: 900;
  color: #fff;
  text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.8), 0 0 30px rgba(200, 168, 78, 0.2);
  margin-bottom: 0;
  opacity: 0;
  transform: translateY(36px) scale(0.94);
  animation: hero-fade-in 1.1s 0.3s var(--ease-out-expo) forwards;
}

.hero-gold-line {
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--gold), rgba(200, 168, 78, 0.2));
  margin: 14px 0 18px;
  opacity: 0;
  animation: gold-line-draw 0.9s 1.1s var(--ease-out-expo) forwards;
}

.hero-subtitle {
  font-size: 17px;
  color: var(--parchment-light);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  margin-bottom: 28px;
  max-width: 500px;
  opacity: 0;
  transform: translateY(24px) scale(0.97);
  animation: hero-fade-in 1s 0.65s var(--ease-out-expo) forwards;
}

.btn-order {
  display: inline-block;
  padding: 12px 40px;
  background: linear-gradient(180deg, var(--wood-light), var(--wood-dark));
  color: var(--parchment-light);
  text-decoration: none;
  font-family: 'Cinzel', serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 3px;
  border: 2px solid var(--wood-highlight);
  border-radius: 10px;
  transition: transform 0.35s var(--ease-out-quart), box-shadow 0.35s ease, background 0.3s ease;
  box-shadow: 0 4px 16px var(--shadow-medium);
  opacity: 0;
  transform: translateY(24px) scale(0.97);
  animation: hero-fade-in 1s 0.95s var(--ease-out-expo) forwards;
}

.btn-order:hover {
  background: linear-gradient(180deg, var(--wood-highlight), var(--wood-light));
  box-shadow: 0 8px 28px rgba(139, 94, 60, 0.5);
  transform: translateY(-3px);
}

.btn-order:active {
  transform: translateY(0) scale(0.97);
  transition-duration: 0.1s;
}

.scroll-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  animation: hint-appear 1s 1.6s ease forwards;
}

.scroll-hint-text {
  font-size: 12px;
  color: rgba(232, 220, 192, 0.5);
  letter-spacing: 2px;
}

.scroll-hint-pulse {
  position: absolute;
  bottom: -6px;
  left: 50%;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(200, 168, 78, 0.25);
  border-radius: 50%;
  animation: hint-pulse 2.5s 2s var(--ease-out-expo) infinite;
  pointer-events: none;
}

.scroll-hint-arrow {
  width: 20px;
  height: 20px;
  border-right: 2px solid rgba(200, 168, 78, 0.5);
  border-bottom: 2px solid rgba(200, 168, 78, 0.5);
  transform: rotate(45deg);
  animation: bounce-arrow 1.5s ease-in-out infinite;
}

@media (max-width: 960px) {
  .hero-content h1 {
    font-size: 32px;
  }
}

@media (max-width: 640px) {
  .hero-content {
    padding: 0 24px;
  }
  .hero-content h1 {
    font-size: 26px;
  }
}
</style>
