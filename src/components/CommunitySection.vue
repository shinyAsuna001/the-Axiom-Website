<template>
  <section class="fp-section fp-dark" :class="{ active }">
    <div class="fp-center">
      <div class="section-title">
        <h2>社区</h2>
        <span class="section-subtitle">Community</span>
      </div>
      <div class="community-grid">
        <div v-for="(item, i) in communities" :key="i" class="community-card reveal-item">
          <div class="community-icon">{{ item.icon }}</div>
          <h3>{{ item.name }}</h3>
          <p>{{ item.desc }}</p>
          <a href="#" class="btn-community">{{ item.action }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ active: Boolean })

const communities = [
  { icon: '💬', name: 'Discord', desc: '加入我们的Discord社区', action: '加入' },
  { icon: '📺', name: 'Bilibili', desc: '观看精彩视频内容', action: '关注' },
  { icon: '📱', name: 'QQ群', desc: '加入QQ交流群', action: '加入' }
]
</script>

<style scoped>
.community-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  perspective: 800px;
}

.community-card {
  text-align: center;
  padding: 36px 20px;
  background: rgba(58, 53, 48, 0.4);
  border: 1px solid rgba(58, 58, 58, 0.5);
  border-radius: 16px;
  transition: transform 0.4s var(--ease-out-quart), box-shadow 0.4s ease,
    border-color 0.3s ease, background 0.3s ease;
  transform-style: preserve-3d;
}

.community-card:hover {
  border-color: var(--gold);
  background: rgba(200, 168, 78, 0.05);
  transform: perspective(800px) rotateX(-2deg) translateY(-8px);
  box-shadow:
    0 24px 48px -16px var(--shadow-medium),
    inset 0 1px 0 rgba(200, 168, 78, 0.1);
}

.community-icon {
  font-size: 40px;
  margin-bottom: 16px;
  transition: transform 0.4s var(--ease-out-quart);
}

.community-card:hover .community-icon {
  animation: float-gentle 1.8s ease-in-out infinite;
}

.community-card h3 {
  font-size: 18px;
  color: var(--parchment-light);
  margin-bottom: 8px;
}

.community-card p {
  font-size: 14px;
  color: var(--parchment-dark);
  margin-bottom: 20px;
}

.btn-community {
  display: inline-block;
  padding: 8px 28px;
  background: linear-gradient(180deg, var(--stone-medium), var(--stone-dark));
  color: var(--parchment-light);
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  border: 1px solid var(--stone-light);
  border-radius: 10px;
  transition: transform 0.3s var(--ease-out-quart), background 0.3s ease,
    border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.btn-community:hover {
  background: linear-gradient(180deg, var(--gold), #a08030);
  border-color: var(--gold-bright);
  color: var(--text-dark);
  box-shadow: 0 4px 16px rgba(200, 168, 78, 0.2);
}

.btn-community:active {
  transform: scale(0.95);
  transition-duration: 0.1s;
}

@media (max-width: 960px) {
  .community-grid {
    grid-template-columns: 1fr;
  }
}
</style>
