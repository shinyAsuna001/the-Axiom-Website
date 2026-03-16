<template>
  <section class="fp-section fp-dark" :class="{ active }">
    <div class="fp-center">
      <div class="section-title" :class="{ 'title-exit': newsOpen }">
        <h2>公告</h2>
        <span class="section-subtitle">Announcements</span>
      </div>
      <div class="news-grid" :class="{ 'grid-exit': newsOpen }">
        <div class="news-featured reveal-item">
          <span class="news-tag" :class="{ hot: featured.hot }">{{ featured.tag }}</span>
          <h3 class="featured-title">{{ featured.title }}</h3>
          <p class="featured-desc">{{ featured.desc }}</p>
          <span class="featured-date">{{ featured.date }}</span>
          <a href="#" class="btn-detail" @click.prevent="openNews($event, 'news-0')">详细信息 →</a>
        </div>
        <div class="news-list-panel reveal-item">
          <div
            v-for="(item, i) in rest"
            :key="i"
            class="news-item"
            @click="openNews($event, 'news-' + (i + 1))"
          >
            <span class="news-date">{{ item.date }}</span>
            <span class="news-tag" :class="{ hot: item.hot }">{{ item.tag }}</span>
            <span class="news-title">{{ item.title }}</span>
          </div>
          <a href="#" class="btn-all-news" @click.prevent="openNews($event, '__all__')">查看全部公告 →</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

defineProps({ active: Boolean, newsOpen: Boolean })
const emit = defineEmits(['openNews'])

const news = [
  { date: '2026-03-07', tag: '热门', hot: true, title: '公理服务器 3.0 版本更新公告', desc: '全新副本「混沌深渊」开放，新增传说级装备锻造系统，平衡性大幅调整……' },
  { date: '2026-03-05', tag: '活动', hot: false, title: '春日冒险节 — 限时副本开放' },
  { date: '2026-03-01', tag: '维护', hot: false, title: '服务器例行维护通知' },
  { date: '2026-02-25', tag: '更新', hot: false, title: '新增传说级武器「虚空之剑」' }
]

const featured = computed(() => news[0])
const rest = computed(() => news.slice(1))

function openNews(e, newsId) {
  const el = newsId === 'news-0' ? e.currentTarget.closest('.news-featured') : e.currentTarget
  const rect = el.getBoundingClientRect()
  emit('openNews', newsId, {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height
  })
}
</script>

<style scoped>
.news-grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 24px;
  align-items: stretch;
  transition: opacity 0.3s ease, transform 0.35s ease;
}

.news-grid.grid-exit {
  opacity: 0;
  transform: scale(0.92);
  pointer-events: none;
}

/* ── Featured Card ── */
.news-featured {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 32px 28px 24px;
  background:
    radial-gradient(ellipse at 30% 20%, rgba(200, 168, 78, 0.08), transparent 60%),
    linear-gradient(180deg, rgba(58, 53, 48, 0.55), rgba(45, 40, 34, 0.5));
  border: 1px solid rgba(200, 168, 78, 0.25);
  border-radius: 14px;
  transition: border-color 0.4s ease, box-shadow 0.4s ease;
}

.news-featured:hover {
  border-color: rgba(200, 168, 78, 0.5);
  box-shadow: 0 12px 40px -10px rgba(200, 168, 78, 0.12);
}

.featured-title {
  font-size: 24px;
  font-weight: 900;
  color: var(--parchment-light);
  text-shadow: 2px 2px 6px var(--shadow-heavy);
  line-height: 1.4;
}

.featured-desc {
  font-size: 16px;
  line-height: 1.8;
  color: var(--parchment);
  opacity: 0.85;
}

.featured-date {
  font-size: 13px;
  color: var(--stone-light);
}

.btn-detail {
  display: block;
  margin-top: auto;
  padding: 10px 0;
  color: var(--gold);
  text-decoration: none;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  border: 1px solid rgba(200, 168, 78, 0.3);
  border-radius: 10px;
  background: transparent;
  transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease,
    box-shadow 0.3s ease, transform 0.3s var(--ease-out-quart);
}

.btn-detail:hover {
  background: rgba(200, 168, 78, 0.1);
  border-color: var(--gold-bright);
  color: var(--gold-bright);
  box-shadow: 0 4px 16px rgba(200, 168, 78, 0.2);
  transform: translateY(-2px);
}

.btn-detail:active {
  transform: translateY(0) scale(0.96);
  transition-duration: 0.1s;
}

/* ── List Panel ── */
.news-list-panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 24px 20px;
  background: linear-gradient(180deg, rgba(58, 53, 48, 0.4), rgba(45, 40, 34, 0.35));
  border: 1px solid rgba(90, 90, 90, 0.35);
  border-radius: 14px;
  transition: border-color 0.4s ease, box-shadow 0.4s ease;
}

.news-list-panel:hover {
  border-color: rgba(200, 168, 78, 0.2);
  box-shadow: 0 8px 32px -8px var(--shadow-medium);
}

.news-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
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
  flex-shrink: 0;
}

.news-tag.hot {
  background: linear-gradient(135deg, rgba(192, 64, 64, 0.35), rgba(168, 50, 50, 0.18));
  color: #e8847a;
  border: 1px solid rgba(192, 64, 64, 0.5);
}

.news-featured .news-tag {
  font-size: 13px;
  padding: 4px 12px;
}

.news-title {
  font-size: 14px;
  color: var(--parchment-light);
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ── View All Button (inside list panel) ── */
.btn-all-news {
  display: block;
  margin-top: auto;
  padding: 10px 0;
  color: var(--gold);
  text-decoration: none;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  border: 1px solid rgba(200, 168, 78, 0.3);
  border-radius: 10px;
  background: transparent;
  transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease,
    box-shadow 0.3s ease, transform 0.3s var(--ease-out-quart);
}

.btn-all-news:hover {
  background: rgba(200, 168, 78, 0.1);
  border-color: var(--gold-bright);
  color: var(--gold-bright);
  box-shadow: 0 4px 16px rgba(200, 168, 78, 0.12);
  transform: translateY(-2px);
}

.btn-all-news:active {
  transform: translateY(0) scale(0.96);
  transition-duration: 0.1s;
}

/* ── Title & Grid Exit Animation ── */
.section-title {
  transition: opacity 0.3s ease, transform 0.35s ease;
}

.section-title.title-exit {
  opacity: 0;
  transform: translateY(-18px) scale(0.96);
  pointer-events: none;
}

@media (max-width: 960px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .news-featured {
    padding: 24px 20px;
  }
  .featured-title {
    font-size: 20px;
  }
}
</style>
