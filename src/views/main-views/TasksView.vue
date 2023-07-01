<template>
  <base-page :loading="loading" title="Tasks">
    <template v-slot:top-right>
      <base-button label="Add Task" @clicked="$router.push('/taskform')"
    /></template>
    <template v-slot:content> <base-list :items="tasksToDisplay" /></template>
  </base-page>
</template>

<script>
import BaseButton from "../../components/BaseButton.vue";
import BasePage from "../../components/BasePage.vue";
import BaseList from "../../components/BaseList.vue";
import db from "../../utilities/db";

export default {
  name: "TaskView",
  data() {
    return {
      tasks: [],
      loading: true,
    };
  },

  computed: {
    tasksToDisplay() {
      return this.tasks.map((item) => {
        let isCompleted = "";
        if (item.completed) {
          isCompleted = "Completed";
        } else isCompleted = "In Progress";
        return {
          to: "/task/" + item.id,
          id: item.id,
          header: item.task,
          subtitle: item.project,
          rightContent: isCompleted,
        };
      });
    },
  },

  created() {
    db.get("js4tasks").then((data) => {
      this.tasks = data;
      this.loading = false;
    });
  },
  components: { BasePage, BaseList, BaseButton },
};
</script>
