<template>
  <article class="tabs">
    <nav class="tab-headers">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: selectedTab === index }"
        @click="selectTab(index)"
      >
        {{ tab.name }}
      </button>
    </nav>
    <section class="tab-content">
      <slot :name="tabs[selectedTab].slot"></slot>
    </section>
  </article>
</template>

<script>
export default {
  name: 'VTabs',
  data() {
    return {
      selectedTab: 0,
      tabs: [
        { name: 'Información fiscal', slot: 'tab1' },
        { name: 'Información personal', slot: 'tab2' },
        { name: 'Información de contacto', slot: 'tab3' }
      ]
    }
  },
  methods: {
    selectTab(index) {
      this.selectedTab = index
    }
  }
}
</script>

<style scoped>
.tabs {
  display: flex;
  flex-direction: column;
}

.tab-headers {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth; /* Add smooth scrolling */
}

.tab-headers button {
  cursor: pointer;
  border: 2px solid transparent;
  background-color: transparent;
  padding: 0.3rem 0.5rem;
  scroll-snap-align: start;
  color: #ffffff48;
}

.tab-headers button.active {
  border-bottom: 2px solid #ff795a;
  color: #ff795a;
}

.tab-content {
  padding: 0.5rem 0;
}
</style>
