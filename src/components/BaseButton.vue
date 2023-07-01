<template>
  <button @click="$emit('clicked')">{{ label }}</button>
</template>

<script>
export default {
  name: "BaseButton",
  props: ["label"],
};
</script>

<style scoped>
button {
  padding: 1rem 2rem;

  background-color: var(--primary);
  border: 1px solid var(--button-text-box);
  color: var(--button-text-box);
  cursor: pointer;
  border-radius: 15px;
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

button:hover {
  background-color: var(--secondary);
}

button:active {
  border: 1px solid var(--secondary);
}
</style>
