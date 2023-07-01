<template>
  <div class="container">
    <div class="header">
      <h1>{{ title }}</h1>
      <div class="top-right">
        <slot name="top-right"></slot>
      </div>
    </div>
    <template v-if="!loading">
      <div class="content">
        <slot name="content"></slot>
      </div>

      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </template>
    <BaseLoading v-else />
  </div>
</template>

<script>
import BaseLoading from "./BaseLoading.vue";
export default {
  props: ["title", "loading"],
  components: { BaseLoading },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 50rem;
  margin: 2rem auto;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-right {
  margin: 15px;
  padding: 15px;
}

.footer {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
