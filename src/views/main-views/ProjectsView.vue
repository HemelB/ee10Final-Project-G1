<template>
  <base-page :loading="loading" title="Projects">
    <template v-slot:top-right>
      <base-button label="Add Project" @clicked="$router.push('/projectform')"
    /></template>
    <template v-slot:content>
      <base-list :items="projectsToDisplay"
    /></template>
  </base-page>
</template>

<script>
import BasePage from "../../components/BasePage.vue";
import BaseButton from "../../components/BaseButton.vue";
import BaseLoading from "../../components/BaseLoading.vue";
import BaseList from "../../components/BaseList.vue";
import db from "../../utilities/db";
export default {
  name: "ProjectsView",
  data() {
    return {
      projects: [],
      tasks: [],
      loading: true,
    };
  },

  computed: {
    projectsToDisplay() {
      return this.projects.map((item) => {
        return {
          to: "/project/" + item.id,
          id: item.id,
          header: item.project,
          rightContent:
            this.tasks.filter(
              (task) => task.projectid === item.id && task.completed
            ).length +
            "/" +
            this.tasks.filter((task) => task.projectid === item.id).length,
        };
      });
    },
  },

  created() {
    const promises = [
      db.get("js4tasks").then((data) => {
        this.tasks = data;
      }),
      db.get("js4projects").then((data) => {
        this.projects = data;
      }),
    ];
    Promise.all(promises).then(() => {
      this.loading = false;
    });
  },
  components: { BaseList, BaseLoading, BaseButton, BasePage },
};
</script>
