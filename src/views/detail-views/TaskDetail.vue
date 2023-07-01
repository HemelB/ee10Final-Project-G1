<template>
  <base-modal
    :show="showAddPersonModal"
    @close-me="showAddPersonModal = false"
    @ok-button-clicked="addPerson"
    @cancel-button-clicked="showAddPersonModal = false"
    >
    <template v-slot:body>
      <base-control
        :settings="{
          type:'select',
          label:'select Person',
          options: personsOptions,

          }"
          @changed="onChanged"
      />
    </template> 
  </base-modal>

  <base-modal
    :show="showDeleteModal"
    :cancelButtonDisplay="cancelButtonDisplay"
    :okButtonLabel="okButtonLabel"
    @close-me="showDeleteModal = false"
    @ok-button-clicked="deleteRecord"
    @cancel-button-clicked="showDeleteModal = false"
  >
    <template v-slot:body>
      <div v-if="!totalPersons > 0">
        <span>Do you really want to delete a record of </span>
        <b>{{ task.task }}</b>
        <span> ?</span>
      </div>
      <div v-else>
        <span>You are not allowed to delete a task with assigned persons</span>
      </div>
    </template></base-modal
  >
  <Base-page title="Task details" :loading="loading">
    <template v-slot:top-right> </template>
    <template v-slot:content>
      <h2>{{ task.task }}</h2>
      <ul>
        <li v-if="task.priority === 1">Priority: Low</li>
        <li v-else-if="task.priority === 2">Priority: Medium</li>
        <li v-else>Priority: High</li>
        <li v-if="task.completed">Completed: Yes</li>
        <li v-else>Completed: In Progress</li>
        <li>Project: {{ task.project }}</li>
        <li>Date: {{ formatDate(task.date) }}</li>
        <li>  
          <div>Persons: {{ persons.length }}</div> 
          <ul v-if="persons.length">
            <li v-for="person in persons">{{person.first+" "+person.last+", "+person.position}}</li>
          </ul> 
        </li>
      </ul>
    </template>
    <template v-slot:footer>
      <base-button label="Add Person" @clicked="onAddPersonClicked"/>
      <base-button label="Edit task" @clicked="onEditClicked" />
      <base-button @clicked="onDeleteClicked" label="Delete" />
    </template>
  </Base-page>
</template>

<script>
import BaseControl from "../../components/BaseControl.vue"
import BaseModal from "../../components/BaseModal.vue";
import { formatDate } from "../../utilities/dateFunctions.js";
import BaseButton from "../../components/BaseButton.vue";
import BasePage from "../../components/BasePage.vue";
import db from "../../utilities/db";
export default {
  name: "TaskDetail",
  data() {
    return {
      task: {},
      loading: true,
      persons: [],
      showDeleteModal: false,
      showAddPersonModal: false,
      allPersons: [],
      personToAdd:"",
    };
  },
  methods: {
    onChanged(payload) {
      this.personToAdd = payload.value
    },
    addPerson() {
      if (this.personToAdd) {
        db.post("js4personstasks",{personid: this.personToAdd, taskid: this.task.id}).then(() => {
          db
        .get("js4personstasks?taskid=" + this.$route.params.id)
        .then((data) => {
          this.persons = data;
          this.showAddPersonModal = false;
        }) 
      })
      }
    },
    onAddPersonClicked() {
      db.get("js4persons").then((data) => {
        this.allPersons = data
        this.personToAdd = ""
        this.showAddPersonModal = true;

      })
    },
    onDeleteClicked() {
      this.showDeleteModal = true;
    },
    deleteRecord() {
      if (!this.totalPersons) {
        db.delete("js4tasks/" + this.task.id).then(() => {
          this.$router.replace("/tasks");
        });
      } else {
        this.showDeleteModal = false;
      }
    },
    formatDate(str) {
      return formatDate(str);
    },
    onEditClicked() {
      this.$router.push("/taskform/" + this.$route.params.id);
    },
  },
  created() {
    const promises = [
      db.get("js4tasks/" + this.$route.params.id).then((data) => {
        this.task = data;
      }),
      db
        .get("js4personstasks?taskid=" + this.$route.params.id)
        .then((data) => {
          this.persons = data;
        }),
    ];
    Promise.all(promises).then(() => {
      this.loading = false;
    });
  },
  computed: {
    personsOptions() {
      return this.allPersons
        .filter((item) => {
          return !this.persons.some(person => person.personid === item.id)
        })
        .map((item) => {
        return {
          label: `${item.first} ${item.last}, ${item.position}`,
          value: item.id
        }
      });
    },
    totalPersons() {
      return this.persons.length;
    },

    cancelButtonDisplay() {
      return !this.totalPersons > 0;
    },
    okButtonLabel() {
      return this.totalPersons > 0 ? "OK" : "delete";
    },
  },
  components: { BasePage, BaseButton, BaseModal, BaseControl },
};
</script>
