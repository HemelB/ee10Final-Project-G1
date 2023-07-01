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
        <span>do you really want to delete a record of </span>
        <b>{{ person.first + " " + person.last }}</b>
        <span> ?</span>
      </div>
      <div v-else>
        <span>You are not allowed to delete a person with assigned tasks</span>
      </div>
    </template></base-modal
  >
  <base-page title="Person details" :loading="loading">
    <template v-slot:top-right> </template>
    <template v-slot:content>
      <h2>{{ person.first + " " + person.last }}</h2>
      <ul>
        <li>Position: {{ person.position }}</li>
        <li>Completed tasks: {{ completedTasks }}</li>
        <li>Total tasks: {{ totalTasks }}</li>
      </ul>
    </template>
    <template v-slot:footer>
      <base-button @clicked="onEditClicked" label="Edit person" />
      <base-button @clicked="onDeleteClicked" label="Delete person" />
    </template>
  </base-page>
</template>

<script>
import BaseModal from "../../components/BaseModal.vue";
import BaseButton from "../../components/BaseButton.vue";
import BasePage from "../../components/BasePage.vue";
import db from "../../utilities/db";
export default {
  name: "PersonDetail",
  data() {
    return {
      person: {},
      loading: true,
      tasks: [],
      showDeleteModal: false,
    };
  },
  methods: {
    onDeleteClicked() {
      this.showDeleteModal = true;
    },
    deleteRecord() {
      if (!this.totalTasks) {
        db.delete("js4persons/" + this.person.id).then(() => {
          this.$router.replace("/persons");
        });
      } else {
        this.showDeleteModal = false;
      }
    },
    onEditClicked() {
      this.$router.push("/personform/" + this.$route.params.id);
    },
  },
  created() {
    const promises = [
      db.get("js4persons/" + this.$route.params.id).then((data) => {
        this.person = data;
      }),
      db
        .get("js4personstasks?personid=" + this.$route.params.id)
        .then((data) => {
          this.tasks = data;
        }),
    ];
    Promise.all(promises).then(() => {
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
  },
  components: { BasePage, BaseButton, BaseModal },
};
</script>
