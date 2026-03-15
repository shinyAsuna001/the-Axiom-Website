<template>
  <section class="fp-section fp-dark" :class="{ active }">
    <div class="fp-center">
      <div class="join-block reveal-item">
        <h2>立即加入公理</h2>
        <p>服务器地址: <code>play.axiom-mc.com</code></p>
        <p class="join-version">Java版 1.20.4 | 基岩版支持</p>
        <a
          href="#"
          class="btn-join"
          :style="btnStyle"
          @click.prevent="copyAddress"
        >{{ btnText }}</a>
      </div>
      <footer class="main-footer">
        <p>&copy; 2026 公理 - AXIOM. All rights reserved.</p>
      </footer>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

defineProps({ active: Boolean })

const btnText = ref('复制地址')
const btnStyle = ref({})

async function copyAddress() {
  try {
    await navigator.clipboard.writeText('play.axiom-mc.com')
    btnText.value = '已复制!'
    btnStyle.value = {
      background: 'linear-gradient(180deg, #4caf50, #2e7d32)',
      borderColor: '#66bb6a'
    }
  } catch {
    btnText.value = '请手动复制'
  }
  setTimeout(() => {
    btnText.value = '复制地址'
    btnStyle.value = {}
  }, 2000)
}
</script>

<style scoped>
.join-block {
  text-align: center;
  padding: 60px 40px;
  background: linear-gradient(180deg, rgba(58, 53, 48, 0.4), rgba(45, 40, 34, 0.4));
  border: 1px solid rgba(168, 50, 50, 0.3);
  border-radius: 20px;
  margin-bottom: 40px;
  transition: border-color 0.4s ease, box-shadow 0.4s ease;
}

.join-block:hover {
  border-color: rgba(168, 50, 50, 0.5);
  box-shadow: 0 8px 40px -12px rgba(168, 50, 50, 0.15);
}

.join-block h2 {
  font-size: 36px;
  color: var(--gold-bright);
  margin-bottom: 20px;
  text-shadow: 2px 2px 8px var(--shadow-heavy);
}

.join-block code {
  background: rgba(0, 0, 0, 0.4);
  padding: 6px 20px;
  border-radius: 8px;
  font-size: 20px;
  color: var(--green-online);
  border: 1px solid var(--stone-dark);
  font-family: 'Consolas', 'Courier New', monospace;
}

.join-version {
  font-size: 14px;
  color: var(--parchment-dark);
  margin-top: 10px;
  margin-bottom: 24px;
}

.btn-join {
  display: inline-block;
  padding: 14px 48px;
  background: linear-gradient(180deg, var(--red-accent), #7a2222);
  color: #fff;
  text-decoration: none;
  font-size: 17px;
  font-weight: 700;
  border: 2px solid #c44;
  border-radius: 12px;
  transition: transform 0.35s var(--ease-out-quart), box-shadow 0.35s ease, background 0.3s ease;
  animation: cta-pulse 3s ease-in-out infinite;
}

.btn-join:hover {
  background: linear-gradient(180deg, #c44040, var(--red-accent));
  box-shadow: 0 8px 32px rgba(168, 50, 50, 0.5);
  transform: translateY(-3px);
  animation: none;
}

.btn-join:active {
  transform: translateY(0) scale(0.97);
  transition-duration: 0.1s;
}

@media (max-width: 640px) {
  .join-block {
    padding: 40px 20px;
  }
  .join-block h2 {
    font-size: 26px;
  }
}
</style>
