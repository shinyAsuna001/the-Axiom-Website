<template>
  <section class="fp-section fp-dark" :class="{ active }">
    <div class="fp-center">
      <div class="news-story-grid">
        <div class="panel latest-news reveal-item">
          <div class="panel-header-stone">
            <h2>最新公告</h2>
            <span class="panel-subtitle">Latest News</span>
          </div>
          <div class="panel-body news-list">
            <div v-for="(item, i) in news" :key="i" class="news-item">
              <span class="news-date">{{ item.date }}</span>
              <span class="news-tag" :class="{ hot: item.hot }">{{ item.tag }}</span>
              <span class="news-title">{{ item.title }}</span>
            </div>
          </div>
        </div>
        <div class="panel story-origin reveal-item">
          <div class="panel-header-stone">
            <h2>剧情起源</h2>
            <span class="panel-note">(基于PDF)</span>
          </div>
          <div class="panel-body story-content">
            <div class="book-decoration">
              <div class="book-icon">📖</div>
            </div>
            <div class="story-text">
              <p>在RPG科技与魔法的融合之中，勇敢冒险者将探索属于自己的传说。古老的遗迹隐藏着无尽的秘密，等待着有缘人前来揭开真相……</p>
              <p class="story-more">力量在混沌中诞生，秩序由公理所守护。当虚空的裂隙再次开启，唯有掌握科技与魔法的勇者，方能重铸世界的平衡。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ active: Boolean })

const news = [
  { date: '2026-03-07', tag: '热门', hot: true, title: '公理服务器 3.0 版本更新公告' },
  { date: '2026-03-05', tag: '活动', hot: false, title: '春日冒险节 — 限时副本开放' },
  { date: '2026-03-01', tag: '维护', hot: false, title: '服务器例行维护通知' },
  { date: '2026-02-25', tag: '更新', hot: false, title: '新增传说级武器「虚空之剑」' }
]
</script>

<style scoped>
.news-story-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.panel {
  background: linear-gradient(180deg, #3a3530 0%, #2d2822 100%);
  border: 1px solid rgba(107, 66, 38, 0.5);
  border-radius: 14px;
  overflow: hidden;
  transition: border-color 0.4s ease, box-shadow 0.4s ease;
}

.panel:hover {
  border-color: rgba(200, 168, 78, 0.3);
  box-shadow: 0 8px 32px -8px var(--shadow-medium);
}

.panel-header-stone {
  background: linear-gradient(180deg, #5a5550, #454038);
  padding: 14px 20px;
  border-bottom: 1px solid rgba(122, 122, 122, 0.3);
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.panel-header-stone h2 {
  font-size: 18px;
  color: var(--parchment-light);
  text-shadow: 2px 2px 4px var(--shadow-heavy);
}

.panel-subtitle {
  font-family: 'Cinzel', serif;
  font-size: 12px;
  color: var(--stone-light);
  letter-spacing: 1px;
}

.panel-note {
  font-size: 12px;
  color: var(--stone-light);
}

.panel-body {
  padding: 16px;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.news-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(58, 58, 58, 0.5);
  border-left: 2px solid transparent;
  border-radius: 10px;
  transition: transform 0.3s var(--ease-out-quart), background 0.3s ease,
    border-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.news-item:hover {
  background: rgba(200, 168, 78, 0.06);
  border-color: rgba(200, 168, 78, 0.3);
  border-left-color: var(--gold);
  transform: translateX(4px);
  box-shadow: -2px 0 12px rgba(200, 168, 78, 0.08);
}

.news-date {
  font-size: 12px;
  color: var(--stone-light);
  white-space: nowrap;
}

.news-tag {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 6px;
  background: var(--stone-medium);
  color: #fff;
  white-space: nowrap;
}

.news-tag.hot {
  background: var(--red-accent);
}

.news-title {
  font-size: 14px;
  color: var(--parchment-light);
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.story-content {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.book-icon {
  font-size: 48px;
  filter: drop-shadow(0 2px 4px var(--shadow-medium));
}

.story-text {
  flex: 1;
}

.story-text p {
  font-size: 14px;
  line-height: 1.9;
  color: var(--parchment);
  margin-bottom: 8px;
}

.story-more {
  opacity: 0.65;
  font-style: italic;
}

@media (max-width: 960px) {
  .news-story-grid {
    grid-template-columns: 1fr;
  }
}
</style>
