<template>
  <ul>
    <li v-for="item in items" @click="$router.push(item.to)">
      <div class="left">
        <div class="header">{{ item.header }}</div>
        <div class="subtitle">{{ item.subtitle }}</div>
      </div>

      <div class="right">
        {{ item.rightContent }}
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: Array,
  },
};
</script>

<style scoped>
ul {
  cursor: pointer;
}

.header {
  font-weight: bold;
  font-size: 1.3rem;
}
</style>
