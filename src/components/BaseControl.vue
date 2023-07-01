<template>
  <div class="form-control">
    <label :for="control"> {{ settings.label }}</label>
    <select
      v-if="settings.type === 'select'"
      :id="control"
      v-model="value"
      @change="onChange"
    >
      <option v-for="option in settings.options" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <input
      v-else
      :id="control"
      :type="settings.type"
      v-model="value"
      @change="onChange"
    />
  </div>
</template>

<script>
export default {
  name: "BaseControl",
  data() {
    return {
      value: "",
    };
  },
  props: {
    settings: Object,
    control: String,
  },

  created() {
    this.value =
      this.settings.initialValue || this.settings.initialValue === 0
        ? this.settings.initialValue
        : "";
  },

  methods: {
    onChange() {
      this.$emit("changed", { value: this.value, control: this.control });
    },
  },
};
</script>

<style scoped>
.form-control {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}
input {
  font-size: 1.2rem;
  padding: 0.35em 0.7rem;
}
</style>
