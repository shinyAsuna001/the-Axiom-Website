<template>
  <div class="wiki-detail" ref="detailRef" @click="$emit('close')">
    <div class="wiki-detail-bg" ref="bgRef"></div>
    <div class="wiki-detail-inner" ref="innerRef" @click.stop>
      <button class="wiki-detail-back" @click="$emit('close')">← 返回百科</button>

      <template v-if="activePage">
        <div class="wiki-detail-header">
          <h2>{{ activePage.title }}</h2>
          <span class="wiki-detail-sub">{{ activePage.subtitle }}</span>
        </div>
        <div class="wiki-entry-grid">
          <div
            v-for="(entry, i) in activePage.entries"
            :key="entry.name"
            :style="{ '--i': i }"
            class="wiki-entry"
          >
            <span class="wiki-rarity" :class="entry.rarityClass">{{ entry.rarity }}</span>
            <h4>{{ entry.name }}</h4>
            <p class="wiki-entry-stats">{{ entry.stats }}</p>
            <p class="wiki-entry-desc">{{ entry.desc }}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  activeWiki: String,
  cardRect: Object,
  open: Boolean
})

defineEmits(['close'])

const detailRef = ref(null)
const bgRef = ref(null)
const innerRef = ref(null)

const activePage = computed(() => wikiPages.find(p => p.id === props.activeWiki))

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

  let expandDone = false
  function onBgExpand(e) {
    if (e.propertyName !== 'transform' || expandDone) return
    expandDone = true
    bg.removeEventListener('transitionend', onBgExpand)
    bg.style.willChange = ''
    d.classList.add('content-visible')
  }
  bg.addEventListener('transitionend', onBgExpand)
  setTimeout(() => { if (!expandDone) onBgExpand({ propertyName: 'transform' }) }, 600)
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

      let shrinkDone = false
      function onBgShrink(e) {
        if (e.propertyName !== 'transform' || shrinkDone) return
        shrinkDone = true
        bg.removeEventListener('transitionend', onBgShrink)
        d.classList.remove('active', 'closing')
        bg.style.cssText = ''
      }
      bg.addEventListener('transitionend', onBgShrink)
      setTimeout(() => { if (!shrinkDone) onBgShrink({ propertyName: 'transform' }) }, 550)
    } else {
      d.classList.remove('active', 'closing')
      bg.style.cssText = ''
    }
  }

  if (inner) {
    let fadeDone = false
    function onContentFade(e) {
      if ((e.target !== inner || e.propertyName !== 'opacity') && e.type !== 'timeout') return
      if (fadeDone) return
      fadeDone = true
      inner.removeEventListener('transitionend', onContentFade)
      shrinkBg()
    }
    inner.addEventListener('transitionend', onContentFade)
    setTimeout(() => { if (!fadeDone) onContentFade({ type: 'timeout' }) }, 450)
  } else {
    shrinkBg()
  }
}

const wikiPages = [
  {
    id: 'items',
    title: '物品图鉴',
    subtitle: 'Item Encyclopedia',
    entries: [
      { rarity: '传说', rarityClass: 'legendary', name: '虚空之剑', stats: '攻击力 +180 · 暴击率 +15%', desc: '由虚空碎片铸造的神器，挥舞时能撕裂空间，对虚空系怪物造成额外 40% 伤害。' },
      { rarity: '史诗', rarityClass: 'epic', name: '秩序之盾', stats: '防御力 +120 · 格挡率 +20%', desc: '公理守护者遗留的圣盾，能在格挡时释放秩序能量反弹伤害。' },
      { rarity: '稀有', rarityClass: 'rare', name: '魔法精华', stats: '合成材料 · 掉落率 5%', desc: '高级副本中掉落的珍贵材料，用于锻造史诗及以上品质的装备。' },
      { rarity: '传说', rarityClass: 'legendary', name: '公理之书', stats: '法术强度 +200 · 冷却缩减 +10%', desc: '记载着公理世界根本法则的典籍，法师职业的终极武器。' }
    ]
  },
  {
    id: 'monsters',
    title: '怪物图鉴',
    subtitle: 'Bestiary',
    entries: [
      { rarity: '世界Boss', rarityClass: 'legendary', name: '公理守护者', stats: 'HP 5,000,000 · 等级 80', desc: '公理城最终守护者，掌控秩序之力，每周刷新一次，需要 20 人组队挑战。' },
      { rarity: '副本Boss', rarityClass: 'epic', name: '虚空行者', stats: 'HP 800,000 · 等级 60', desc: '虚空裂隙副本最终Boss，能召唤虚空分身，弱点为光属性攻击。' },
      { rarity: '精英', rarityClass: 'rare', name: '暗影守卫', stats: 'HP 150,000 · 等级 45', desc: '古代遗迹中的精英怪物，拥有隐身技能，可掉落稀有材料。' },
      { rarity: '稀有', rarityClass: 'epic', name: '混沌元素', stats: 'HP 300,000 · 等级 55', desc: '混沌之地特有的元素生物，攻击带随机元素效果，击败后必掉魔法精华。' }
    ]
  },
  {
    id: 'skills',
    title: '技能大全',
    subtitle: 'Skill Guide',
    entries: [
      { rarity: '终极', rarityClass: 'legendary', name: '虚空斩', stats: '战士 · 冷却 60s · 消耗 100 怒气', desc: '撕裂前方空间造成大范围伤害，期间无敌 1.5 秒。可通过天赋缩短冷却。' },
      { rarity: '高级', rarityClass: 'epic', name: '元素风暴', stats: '法师 · 冷却 30s · 消耗 80 魔力', desc: '召唤元素风暴持续 8 秒，对区域内敌人造成持续伤害并降低移速。' },
      { rarity: '中级', rarityClass: 'rare', name: '暗影步', stats: '游侠 · 冷却 12s · 消耗 30 能量', desc: '瞬移到目标身后并进入 3 秒隐身状态，下次攻击暴击率 +100%。' },
      { rarity: '高级', rarityClass: 'epic', name: '神圣守护', stats: '通用 · 冷却 45s · 消耗 50 能量', desc: '为周围队友施加护盾，吸收等同于施法者 30% 最大生命值的伤害。' }
    ]
  },
  {
    id: 'dungeons',
    title: '副本攻略',
    subtitle: 'Dungeon Guide',
    entries: [
      { rarity: '传说难度', rarityClass: 'legendary', name: '虚空裂隙', stats: '推荐等级 60+ · 5人组队', desc: '三阶段Boss战，需注意虚空行者的分身机制。通关可获虚空系列装备图纸。' },
      { rarity: '史诗难度', rarityClass: 'epic', name: '古老遗迹', stats: '推荐等级 45+ · 3人组队', desc: '解谜与战斗结合的副本，隐藏房间中有稀有宝箱。首通奖励称号「遗迹探索者」。' },
      { rarity: '噩梦难度', rarityClass: 'legendary', name: '混沌深渊', stats: '推荐等级 70+ · 10人团队', desc: '随机生成的地图与Boss组合，每周重置。排行榜前 10 名获专属奖励。' },
      { rarity: '挑战难度', rarityClass: 'epic', name: '公理试炼', stats: '推荐等级 50+ · 单人挑战', desc: '逐层攀登的试炼塔，共 100 层。每 10 层有检查点，通关奖励随层数递增。' }
    ]
  },
  {
    id: 'classes',
    title: '职业介绍',
    subtitle: 'Class Overview',
    entries: [
      { rarity: '基础职业', rarityClass: 'rare', name: '战士', stats: '定位：近战坦克 / 物理输出', desc: '高生命值与护甲，擅长近战搏斗与嘲讽控制。进阶可选「狂战士」或「守护者」。' },
      { rarity: '基础职业', rarityClass: 'rare', name: '法师', stats: '定位：远程魔法输出 / 控制', desc: '掌控元素之力，拥有强大的 AOE 能力。进阶可选「元素师」或「秘术师」。' },
      { rarity: '基础职业', rarityClass: 'rare', name: '游侠', stats: '定位：敏捷远程 / 刺客', desc: '高机动性与暴击，擅长远程射击与暗影突袭。进阶可选「神射手」或「暗影刺客」。' },
      { rarity: '隐藏职业', rarityClass: 'legendary', name: '圣骑士', stats: '定位：辅助坦克 / 治疗', desc: '需完成「公理试炼」50 层解锁。兼具坦克与治疗能力，团队副本的核心职业。' }
    ]
  },
  {
    id: 'worldmap',
    title: '世界地图',
    subtitle: 'World Atlas',
    entries: [
      { rarity: '主城', rarityClass: 'rare', name: '公理城', stats: '安全区 · 等级不限', desc: '冒险者的起点与归宿。集合了商店、拍卖行、任务大厅与传送门枢纽。' },
      { rarity: '高级区域', rarityClass: 'epic', name: '虚空荒原', stats: '危险区 · 推荐等级 50+', desc: '虚空能量侵蚀的荒芜之地，分布着虚空裂隙副本入口与稀有矿脉。' },
      { rarity: '探索区域', rarityClass: 'rare', name: '古代遗迹群', stats: '中立区 · 推荐等级 30+', desc: '散布着古老文明遗迹的丛林地带，隐藏着大量宝箱与支线任务。' },
      { rarity: '终极区域', rarityClass: 'legendary', name: '混沌之地', stats: 'PvP 区 · 推荐等级 70+', desc: '世界尽头的混沌区域，开放 PvP，拥有最珍贵的资源与最强大的世界Boss。' }
    ]
  }
]
</script>

<style>
/* ======== DETAIL CONTAINER ======== */
.wiki-detail {
  position: fixed;
  inset: 0;
  z-index: 300;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}

.wiki-detail.active {
  opacity: 1;
  pointer-events: auto;
  transition: opacity 0.15s ease;
}

/* ======== BG PANEL (FLIP target) ======== */
.wiki-detail-bg {
  position: absolute;
  inset: 0;
  background: rgba(20, 14, 10, 0.72);
  backdrop-filter: blur(28px) saturate(1.3);
  -webkit-backdrop-filter: blur(28px) saturate(1.3);
  transform-origin: 0 0;
}

.wiki-detail-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 0 0 99999px rgba(0, 0, 0, 0.35);
  opacity: 0;
  pointer-events: none;
}

.wiki-detail.active .wiki-detail-bg::after {
  opacity: 1;
  transition: opacity 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.wiki-detail.closing .wiki-detail-bg::after {
  opacity: 0;
  transition: opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ======== CONTENT LAYER ======== */
.wiki-detail-inner {
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

.wiki-detail.content-visible .wiki-detail-inner {
  opacity: 1;
  transform: translateY(0);
}

/* ======== BACK BUTTON ======== */
.wiki-detail-back {
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

.wiki-detail.content-visible .wiki-detail-back {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.wiki-detail-back:hover {
  background: rgba(200, 168, 78, 0.2);
  border-color: var(--gold);
}

.wiki-detail-back:active {
  transform: scale(0.95);
  transition-duration: 0.1s;
}

/* ======== PAGE HEADER ======== */
.wiki-detail-header {
  text-align: center;
  margin-bottom: 40px;
}

.wiki-detail-header h2 {
  font-size: 36px;
  color: var(--parchment-light);
  text-shadow: 2px 2px 8px var(--shadow-heavy);
  margin-bottom: 8px;
}

.wiki-detail-sub {
  font-family: 'Cinzel', serif;
  font-size: 14px;
  color: var(--stone-light);
  letter-spacing: 3px;
}

/* ======== ENTRY GRID ======== */
.wiki-entry-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
}

/* ======== ENTRY CARD ======== */
.wiki-entry {
  background: rgba(58, 53, 48, 0.5);
  border: 1px solid rgba(90, 90, 90, 0.4);
  border-radius: 14px;
  padding: 22px 24px;
  transition: transform 0.35s var(--ease-out-quart), border-color 0.3s ease,
    background 0.3s ease, box-shadow 0.35s ease;
}

.wiki-detail.content-visible .wiki-entry {
  animation: entry-appear 0.5s var(--ease-out-expo) backwards;
  animation-delay: calc(var(--i, 0) * 0.07s);
}

@keyframes entry-appear {
  from {
    opacity: 0;
    transform: translateY(28px) scale(0.96);
  }
}

.wiki-entry:hover {
  border-color: var(--gold);
  background: rgba(200, 168, 78, 0.08);
  transform: translateY(-4px);
  box-shadow:
    0 12px 28px -4px var(--shadow-medium),
    inset 0 1px 0 rgba(200, 168, 78, 0.08);
}

/* ======== RARITY BADGES ======== */
.wiki-rarity {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  letter-spacing: 1px;
}

.wiki-rarity.legendary {
  background: linear-gradient(135deg, rgba(155, 89, 182, 0.3), rgba(155, 89, 182, 0.15));
  color: #c39de8;
  border: 1px solid rgba(155, 89, 182, 0.5);
}

.wiki-rarity.epic {
  background: linear-gradient(135deg, rgba(200, 168, 78, 0.3), rgba(200, 168, 78, 0.15));
  color: var(--gold-bright);
  border: 1px solid rgba(200, 168, 78, 0.5);
}

.wiki-rarity.rare {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.3), rgba(76, 175, 80, 0.15));
  color: #81c784;
  border: 1px solid rgba(76, 175, 80, 0.5);
}

/* ======== ENTRY TEXT ======== */
.wiki-entry h4 {
  font-size: 18px;
  color: var(--parchment-light);
  margin-bottom: 6px;
  text-shadow: 1px 1px 2px var(--shadow-heavy);
}

.wiki-entry-stats {
  font-size: 13px;
  color: var(--gold);
  margin-bottom: 8px;
  font-weight: 700;
}

.wiki-entry-desc {
  font-size: 13px;
  line-height: 1.7;
  color: var(--parchment-dark);
}

/* ======== RESPONSIVE ======== */
@media (max-width: 960px) {
  .wiki-detail-inner {
    padding: 70px 30px 40px;
  }
  .wiki-entry-grid {
    grid-template-columns: 1fr;
  }
}
</style>
