<script setup lang="ts"></script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="brand">Hurdle</div>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100dvh;
  display: grid;
  grid-template-rows: auto 1fr;
}
.topbar {
  display: flex;
  align-items: center;
  padding: 16px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(17, 17, 20, 0.8);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
}
.brand {
  font-weight: 700;
  letter-spacing: 0.2px;
}
.content {
  padding: 24px 18px;
}
</style>

