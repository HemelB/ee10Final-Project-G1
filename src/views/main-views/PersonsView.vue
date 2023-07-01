<template>
  <base-page :loading="loading" title="Persons">
    <template v-slot:top-right>
      <base-button label="Add Person" @clicked="$router.push('/personform')"
    /></template>
    <template v-slot:content> <base-list :items="personsToDisplay" /></template>
  </base-page>
</template>

<script>
import BaseButton from "../../components/BaseButton.vue";
import BasePage from "../../components/BasePage.vue";
import BaseList from "../../components/BaseList.vue";
import db from "../../utilities/db";
import BaseLoading from "../../components/BaseLoading.vue";
export default {
  name: "PersonsView",
  data() {
    return {
      persons: [],
      tasks: [],
      personsTasks: [],
      loading: true,
    };
  },

  computed: {
    personsToDisplay() {
      return this.persons.map((item) => {
        return {
          to: "/person/" + item.id,
          id: item.id,
          header: item.first + " " + item.last,
          subtitle: item.position,
          rightContent:
            this.personsTasks.filter(
              (personTask) =>
                item.id === personTask.personid && personTask.completed
            ).length +
            "/" +
            this.personsTasks.filter(
              (personTask) => item.id === personTask.personid
            ).length,
        };
      });
    },
  },

  created() {
    const promises = [
      db.get("js4persons").then((data) => {
        this.persons = data;
      }),
      db.get("js4personstasks").then((data) => {
        this.personsTasks = data;
      }),
    ];
    Promise.all(promises).then(() => {
      this.loading = false;
    });
  },
  components: { BaseList, BaseLoading, BasePage, BaseButton },
};
</script>
