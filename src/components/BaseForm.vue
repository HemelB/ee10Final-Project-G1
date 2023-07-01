<template>
  <form @submit="onSubmit">
    <base-control
      v-for="control in controls"
      :settings="settings[control]"
      :control="control"
      @changed="onChange"
    />
    <base-button label="Submit"></base-button>
  </form>
</template>

<script>
import BaseControl from "./BaseControl.vue";
import BaseButton from "./BaseButton.vue";
export default {
  name: "BaseForm",

  data() {
    return {
      formData: {},
    };
  },
  props: {
    settings: Object,
  },

  created() {
    this.controls.forEach((control) => {
      this.formData[control] = {
        value: this.settings[control].initialValue,
      };
    });
  },

  computed: {
    controls() {
      return Object.keys(this.settings);
    },
  },

  methods: {
    onSubmit(e) {
      e.preventDefault();
      const data = {};
      this.controls.forEach((control) => {
        data[control] = this.formData[control].value;
      });
      this.$emit("submited", data);
    },
    onChange(payload) {
      this.formData[payload.control].value = payload.value;
    },
  },
  components: { BaseControl, BaseButton },
};
</script>
