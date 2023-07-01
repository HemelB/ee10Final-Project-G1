<template>
  <base-page title="Task Form" :loading="loading">
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
  name: "TaskForm",

  data() {
    return {
      loading: true,
      settings: {
        task: {
          type: "text",
          label: "Task name",
          initialValue: "",
        },
        date: {
          type: "date",
          label: "Date",
          initialValue: "",
        },
        completed: {
          type: "select",
          label: "Completed",
          initialValue: "",
          options: [
            { label: "", value: "" },
            {
              label: "Yes",
              value: 1,
            },
            {
              label: "No",
              value: 0,
            },
          ],
        },
        priority: {
          type: "select",
          label: "Priority",
          initialValue: "",
          options: [
            { label: "", value: "" },
            {
              label: "Low",
              value: 1,
            },
            {
              label: "Medium",
              value: 2,
            },
            {
              label: "High",
              value: 3,
            },
          ],
        },
        projectid: {
          type: "select",
          label: "Projects",
          initialValue: "",
          options: [],
        },
      },
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
  methods: {
    onSubmited(data) {
      if (this.mode === "add") {
        db.post("js4tasks", data).then(() => {
          this.$router.push("/tasks");
        });
      } else {
        db.put(
          "js4tasks",
          Object.assign({ id: this.$route.params.id }, data)
        ).then(() => {
          this.$router.push("/tasks");
        });
      }
    },
  },

  created() {
    const promises = [
      db.get("js4projects/").then((data) => {
        this.settings.projectid.options = data.map((item) => {
          return {
            label: item.project,
            value: item.id,
          };
        });
      }),
    ];
    if (this.mode === "edit") {
      promises.push(
        db.get("js4tasks/" + this.$route.params.id).then((data) => {
          this.controls.forEach((control) => {
            this.settings[control].initialValue = data[control];
          });
        })
      );
    }
    Promise.all(promises).then(() => {
      this.loading = false;
    });
  },

  components: { BasePage, BaseForm },
};
</script>
