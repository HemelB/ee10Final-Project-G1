<template>
  <base-modal
    :show="showDeleteModal"
    :cancelButtonDisplay="cancelButtonDisplay"
    :okButtonLabel="okButtonLabel"
    @close-me="showDeleteModal = false"
    @ok-button-clicked="deleteRecord"
    @cancel-button-clicked="showDeleteModal = false"
  >
    <template v-slot:body>
      <div v-if="!totalTasks > 0">
        <span>Do you really want to delete a record of </span>
        <b>{{ project.project }}</b>
        <span> ?</span>
      </div>
      <div v-else>
        <span>You are not allowed to delete a project with assigned tasks</span>
      </div>
    </template></base-modal
  >
  <base-page title="Project details" :loading="loading">
    <template v-slot:top-right>
      <base-button label="add task" @clicked="onAddClicked" />
    </template>
    <template v-slot:content>
      <h2>{{ project.project }}</h2>
      <div class="no-project" v-if="tasks.length === 0">
        No tasks in this project
      </div>
      <base-list v-else :items="tasksToDisplay" />
    </template>
    <template v-slot:footer>
      <base-button label="Edit project" @clicked="onEditClicked" />
      <base-button label="Delete project" @clicked="onDeleteClicked" />
    </template>
  </base-page>
</template>

<script>
import BaseModal from "../../components/BaseModal.vue";
import BaseButton from "../../components/BaseButton.vue";
import BasePage from "../../components/BasePage.vue";
import db from "../../utilities/db";
import BaseList from "../../components/BaseList.vue";
export default {
  name: "ProjectDetail",
  data() {
    return {
      project: {},
      tasks: [],
      loading: true,
      showDeleteModal: false,
    };
  },
  methods: {
    onDeleteClicked() {
      this.showDeleteModal = true; 
    },
    deleteRecord() {
      if (!this.totalTasks) {
        db.delete("/js4projects/" + this.$route.params.id).then(() => {
          this.$router.replace("/projects");
        });
      } else {
        this.showDeleteModal = false;
      }
    },
    onEditClicked() {
      this.$router.push("/projectform/" + this.project.id);
    },
    onAddClicked() {
      this.$router.push("/taskform/");
    },
  },
  created() {
    const p1 = db.get("js4projects/" + this.$route.params.id).then((data) => {
      this.project = data;
    });
    const p2 = db
      .get("js4tasks?projectid=" + this.$route.params.id)
      .then((data) => {
        this.tasks = data;
      });
    Promise.all([p1, p2]).then(() => {
      this.loading = false;
    });
  },
  computed: {
    totalTasks() {
      return this.tasks.length;
    },
    completedTasks() {
      return this.tasks.filter((task) => task.completed).length;
    },
    cancelButtonDisplay() {
      return !this.totalTasks > 0;
    },
    okButtonLabel() {
      return this.totalTasks > 0 ? "OK" : "delete";
    },

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
  components: { BaseList, BasePage, BaseButton, BaseModal },
};
</script>


<style scoped>
.no-project {
  text-align: center;

  margin: 2rem;
  font-size: 2rem;
}
</style>
