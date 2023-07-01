<template>
  <base-page title="Person Form" :loading="loading">
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
  name: "PersonForm",
  data() {
    return {
      loading: true,
      settings: {
        first: {
          type: "text",
          label: "First name",
          initialValue: "",
        },
        last: {
          type: "text",
          label: "Last name",
          initialValue: "",
        },
        positionid: {
          type: "select",
          label: "Position",
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
  created() {
    const promises = [
      db.get("js4positions/").then((data) => {
        this.settings.positionid.options = data.map((item) => {
          return {
            label: item.position,
            value: item.id,
          };
        });
      }),
    ];
    if (this.mode === "edit") {
      promises.push(
        db.get("js4persons/" + this.$route.params.id).then((data) => {
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

  methods: {
    onSubmited(data) {
      if (this.mode === "add") {
        db.post("js4persons", data).then(() => {
          this.$router.push("/persons");
        });
      } else {
        db.put(
          "js4persons",
          Object.assign({ id: this.$route.params.id }, data)
        ).then(() => {
          this.$router.push("/persons");
        });
      }
    },
  },
  components: { BasePage, BaseForm },
};
</script>
