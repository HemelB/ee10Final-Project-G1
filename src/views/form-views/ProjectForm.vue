<template>
  <base-page title="Project Form" :loading="loading">
    <template v-slot:content>
      <base-form :settings="settings" @submited="onSubmited"
    /></template>
  </base-page>
</template>
<script>
import BasePage from "../../components/BasePage.vue";
import BaseForm from "../../components/BaseForm.vue";
import db from "../../utilities/db";
export default {
  name: "ProjectForm",
  data() {
    return {
      settings: {
        project: {
          type: "text",
          label: "Project name",
          initialValue: "",
        },
      },
      loading: true,
    };
  },
  computed: {
    mode() {
      return this.$route.params.id ? "edit" : "add";
    },
    controls() {
      return Object.keys(this.settings);
    },
  },

  created() {
    if (this.mode === "edit") {
      db.get("js4projects/" + this.$route.params.id).then((data) => {
        this.controls.forEach((control) => {
          this.settings[control].initialValue = data[control];
        });
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  },
  methods: {
    onSubmited(data) {
      if (this.mode === "add") {
        db.post("js4projects", data).then(() => {
          this.$router.push("/projects");
        });
      } else {
        db.put(
          "js4projects",
          Object.assign({ id: this.$route.params.id }, data)
        ).then(() => {
          this.$router.push("/projects");
        });
      }
    },
  },
  components: { BasePage, BaseForm },
};
</script>
