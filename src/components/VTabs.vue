<template>
  <article class="tabs">
    <nav class="tab-headers">
      <a
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: selectedTab === index }"
        @click="selectTab(index)"
      >
        {{ tab.name }}
      </a>
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
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas: 'headers content';
  gap: 2rem;
  margin: 1rem 0;
}

.tab-headers {
  grid-area: headers;
  display: flex;
  flex-direction: column;
}

.tab-headers a {
  cursor: pointer;
  color: #ffffff48;
}

.tab-headers a.active {
  color: #ff795a;
}

.tab-content {
  grid-area: content;
  padding: 0.5rem 0;
  width: 100%;
}
</style>
