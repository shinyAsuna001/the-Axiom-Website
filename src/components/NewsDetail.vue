<template>
  <div class="news-detail" ref="detailRef" @click="$emit('close')">
    <div class="news-detail-bg" ref="bgRef"></div>
    <div class="news-detail-inner" ref="innerRef" @click.stop>
      <button class="news-detail-back" @click="$emit('close')">← 返回公告</button>

      <template v-if="mode === 'single' && activePage">
        <div class="news-detail-header">
          <span class="news-detail-tag" :class="{ hot: activePage.hot }">{{ activePage.tag }}</span>
          <h2>{{ activePage.title }}</h2>
          <span class="news-detail-date">{{ activePage.date }}</span>
        </div>
        <div class="news-detail-body">
          <p v-for="(para, i) in activePage.content" :key="i" :style="{ '--i': i }">{{ para }}</p>
        </div>
      </template>

      <template v-if="mode === 'all'">
        <div class="news-detail-header">
          <h2>全部公告</h2>
          <span class="news-detail-sub">All Announcements</span>
        </div>
        <div class="news-all-grid">
          <div
            v-for="(item, i) in newsPages"
            :key="item.id"
            :style="{ '--i': i }"
            class="news-all-card"
          >
            <div class="news-all-card-top">
              <span class="news-detail-tag" :class="{ hot: item.hot }">{{ item.tag }}</span>
              <span class="news-all-date">{{ item.date }}</span>
            </div>
            <h4>{{ item.title }}</h4>
            <p>{{ item.content[0] }}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  activeNews: String,
  cardRect: Object,
  open: Boolean
})

defineEmits(['close'])

const detailRef = ref(null)
const bgRef = ref(null)
const innerRef = ref(null)

const mode = computed(() => {
  if (props.activeNews === '__all__') return 'all'
  return props.activeNews ? 'single' : null
})

const activePage = computed(() => newsPages.find(p => p.id === props.activeNews))

function getInverseTransform(rect) {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const scaleX = rect.width / vw
  const scaleY = rect.height / vh
  return {
    transform: `translate(${rect.left}px, ${rect.top}px) scale(${scaleX}, ${scaleY})`,
    borderRadius: `${14 / scaleX}px / ${14 / scaleY}px`
  }
}

watch(() => props.open, (isOpen) => {
  if (isOpen) openAnimation()
  else closeAnimation()
})

function openAnimation() {
  const d = detailRef.value
  const bg = bgRef.value
  if (!d || !bg || !props.cardRect) return

  const inv = getInverseTransform(props.cardRect)

  bg.style.willChange = 'transform, border-radius'
  bg.style.transition = 'none'
  bg.style.transform = inv.transform
  bg.style.borderRadius = inv.borderRadius

  d.classList.add('active')

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      bg.style.transition =
        'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1), border-radius 0.5s cubic-bezier(0.32, 0.72, 0, 1)'
      bg.style.transform = 'none'
      bg.style.borderRadius = '0'
    })
  })

  function onBgExpand(e) {
    if (e.propertyName !== 'transform') return
    bg.removeEventListener('transitionend', onBgExpand)
    bg.style.willChange = ''
    d.classList.add('content-visible')
  }
  bg.addEventListener('transitionend', onBgExpand)
}

function closeAnimation() {
  const d = detailRef.value
  const bg = bgRef.value
  const inner = innerRef.value
  if (!d || !bg) return

  const hadContent = d.classList.contains('content-visible')
  d.classList.remove('content-visible')
  d.classList.add('closing')

  if (!hadContent) {
    d.classList.remove('active', 'closing')
    bg.style.cssText = ''
    return
  }

  function shrinkBg() {
    if (inner) inner.scrollTop = 0

    if (props.cardRect) {
      const inv = getInverseTransform(props.cardRect)
      bg.style.willChange = 'transform, border-radius'
      bg.style.transition =
        'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.45s cubic-bezier(0.4, 0, 0.2, 1)'
      bg.style.transform = inv.transform
      bg.style.borderRadius = inv.borderRadius

      function onBgShrink(e) {
        if (e.propertyName !== 'transform') return
        bg.removeEventListener('transitionend', onBgShrink)
        d.classList.remove('active', 'closing')
        bg.style.cssText = ''
      }
      bg.addEventListener('transitionend', onBgShrink)
    } else {
      d.classList.remove('active', 'closing')
      bg.style.cssText = ''
    }
  }

  if (inner) {
    function onContentFade(e) {
      if (e.target !== inner || e.propertyName !== 'opacity') return
      inner.removeEventListener('transitionend', onContentFade)
      shrinkBg()
    }
    inner.addEventListener('transitionend', onContentFade)
  } else {
    shrinkBg()
  }
}

const newsPages = [
  {
    id: 'news-0',
    date: '2026-03-07',
    tag: '热门',
    hot: true,
    title: '公理服务器 3.0 版本更新公告',
    content: [
      '全新副本「混沌深渊」正式开放！这是公理世界目前最高难度的 10 人团队副本，推荐等级 70+，包含 4 个阶段 Boss 战和多种随机机制。',
      '新增传说级装备锻造系统：玩家可通过收集副本掉落的「混沌精华」和「秩序碎片」，在公理城锻造大师处合成全新传说级装备。每件装备拥有独特的外观和专属特效。',
      '平衡性调整：战士「狂战士」天赋树暴击伤害从 200% 下调至 180%；法师「元素师」AOE 范围提升 15%；游侠「暗影刺客」隐身冷却从 15s 降至 12s。',
      '新增赛季排行榜系统，每赛季（30 天）结束后根据副本通关速度和 PvP 积分发放专属奖励。'
    ]
  },
  {
    id: 'news-1',
    date: '2026-03-05',
    tag: '活动',
    hot: false,
    title: '春日冒险节 — 限时副本开放',
    content: [
      '春日冒险节活动将于 3 月 5 日至 3 月 19 日期间限时开放！活动期间，特殊副本「花之迷宫」全天开放，所有等级玩家均可参与。',
      '完成活动任务可获取限定道具「春之花瓣」，收集足够数量可在活动商店兑换限定外观、坐骑和称号。活动结束后道具将自动回收。',
      '每日首次通关「花之迷宫」可获得双倍经验和金币奖励。组队通关还有额外的友谊值加成。'
    ]
  },
  {
    id: 'news-2',
    date: '2026-03-01',
    tag: '维护',
    hot: false,
    title: '服务器例行维护通知',
    content: [
      '服务器将于 2026 年 3 月 1 日凌晨 4:00-6:00 进行例行维护。维护期间所有服务将暂时不可用，请提前做好下线准备。',
      '本次维护内容包括：服务器硬件升级、数据库优化、已知 Bug 修复（包括部分副本掉落异常和技能描述错误）。',
      '维护完成后所有在线玩家将获得补偿礼包，包含 500 金币和 1 小时双倍经验卷轴。'
    ]
  },
  {
    id: 'news-3',
    date: '2026-02-25',
    tag: '更新',
    hot: false,
    title: '新增传说级武器「虚空之剑」',
    content: [
      '传说级武器「虚空之剑」现已加入游戏！这是目前攻击力最高的单手武器，拥有独特的虚空撕裂特效。',
      '获取方式：通关「虚空裂隙」副本传说难度后，有 5% 几率直接掉落；或收集 100 个「虚空碎片」在锻造大师处合成。',
      '武器属性：攻击力 +180，暴击率 +15%，附带被动效果「虚空撕裂」—— 每次攻击有 10% 几率撕裂空间，对目标周围敌人造成额外 40% 范围伤害。'
    ]
  }
]
</script>

<style>
/* ======== NEWS DETAIL CONTAINER ======== */
.news-detail {
  position: fixed;
  inset: 0;
  z-index: 300;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}

.news-detail.active {
  opacity: 1;
  pointer-events: auto;
  transition: opacity 0.15s ease;
}

/* ======== BG PANEL (FLIP target) ======== */
.news-detail-bg {
  position: absolute;
  inset: 0;
  background: rgba(20, 14, 10, 0.72);
  backdrop-filter: blur(28px) saturate(1.3);
  -webkit-backdrop-filter: blur(28px) saturate(1.3);
  transform-origin: 0 0;
}

.news-detail-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 0 0 99999px rgba(0, 0, 0, 0.35);
  opacity: 0;
  pointer-events: none;
}

.news-detail.active .news-detail-bg::after {
  opacity: 1;
  transition: opacity 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.news-detail.closing .news-detail-bg::after {
  opacity: 0;
  transition: opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ======== CONTENT LAYER ======== */
.news-detail-inner {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 80px 60px 60px;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.35s ease, transform 0.4s var(--ease-out-expo);
  scrollbar-width: thin;
  scrollbar-color: var(--wood-highlight) transparent;
}

.news-detail.content-visible .news-detail-inner {
  opacity: 1;
  transform: translateY(0);
}

/* ======== BACK BUTTON ======== */
.news-detail-back {
  position: fixed;
  top: 20px;
  left: 30px;
  z-index: 310;
  background: rgba(58, 53, 48, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(200, 168, 78, 0.3);
  color: var(--parchment-light);
  font-family: 'Noto Serif SC', serif;
  font-size: 14px;
  font-weight: 700;
  padding: 10px 24px;
  border-radius: 10px;
  cursor: pointer;
  opacity: 0;
  transform: translateY(-14px) scale(0.95);
  transition: opacity 0.3s ease, transform 0.35s var(--ease-out-expo),
    background 0.2s ease, border-color 0.2s ease;
}

.news-detail.content-visible .news-detail-back {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.news-detail-back:hover {
  background: rgba(200, 168, 78, 0.2);
  border-color: var(--gold);
}

.news-detail-back:active {
  transform: scale(0.95);
  transition-duration: 0.1s;
}

/* ======== HEADER ======== */
.news-detail-header {
  text-align: center;
  margin-bottom: 40px;
}

.news-detail-header h2 {
  font-size: 32px;
  color: var(--parchment-light);
  text-shadow: 2px 2px 8px var(--shadow-heavy);
  margin-bottom: 10px;
  line-height: 1.4;
}

.news-detail-tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  padding: 3px 14px;
  border-radius: 6px;
  background: var(--stone-medium);
  color: #fff;
  margin-bottom: 14px;
  letter-spacing: 1px;
}

.news-detail-tag.hot {
  background: linear-gradient(135deg, rgba(192, 64, 64, 0.35), rgba(168, 50, 50, 0.18));
  color: #e8847a;
  border: 1px solid rgba(192, 64, 64, 0.5);
}

.news-detail-date {
  display: block;
  font-size: 13px;
  color: var(--stone-light);
  letter-spacing: 1px;
}

.news-detail-sub {
  font-family: 'Cinzel', serif;
  font-size: 14px;
  color: var(--stone-light);
  letter-spacing: 3px;
}

/* ======== SINGLE NEWS BODY ======== */
.news-detail-body {
  max-width: 720px;
  margin: 0 auto;
}

.news-detail-body p {
  font-size: 15px;
  line-height: 2;
  color: var(--parchment);
  margin-bottom: 20px;
  text-indent: 2em;
}

.news-detail.content-visible .news-detail-body p {
  animation: news-para-appear 0.5s var(--ease-out-expo) backwards;
  animation-delay: calc(var(--i, 0) * 0.08s);
}

@keyframes news-para-appear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
}

/* ======== ALL NEWS GRID ======== */
.news-all-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.news-all-card {
  background: rgba(58, 53, 48, 0.5);
  border: 1px solid rgba(90, 90, 90, 0.4);
  border-radius: 14px;
  padding: 22px 24px;
  transition: transform 0.35s var(--ease-out-quart), border-color 0.3s ease,
    background 0.3s ease, box-shadow 0.35s ease;
}

.news-detail.content-visible .news-all-card {
  animation: news-card-appear 0.5s var(--ease-out-expo) backwards;
  animation-delay: calc(var(--i, 0) * 0.07s);
}

@keyframes news-card-appear {
  from {
    opacity: 0;
    transform: translateY(28px) scale(0.96);
  }
}

.news-all-card:hover {
  border-color: var(--gold);
  background: rgba(200, 168, 78, 0.08);
  transform: translateY(-4px);
  box-shadow:
    0 12px 28px -4px var(--shadow-medium),
    inset 0 1px 0 rgba(200, 168, 78, 0.08);
}

.news-all-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.news-all-card-top .news-detail-tag {
  margin-bottom: 0;
}

.news-all-date {
  font-size: 12px;
  color: var(--stone-light);
}

.news-all-card h4 {
  font-size: 17px;
  color: var(--parchment-light);
  margin-bottom: 8px;
  text-shadow: 1px 1px 2px var(--shadow-heavy);
  line-height: 1.4;
}

.news-all-card p {
  font-size: 13px;
  line-height: 1.7;
  color: var(--parchment-dark);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ======== RESPONSIVE ======== */
@media (max-width: 960px) {
  .news-detail-inner {
    padding: 70px 30px 40px;
  }
  .news-all-grid {
    grid-template-columns: 1fr;
  }
}
</style>
