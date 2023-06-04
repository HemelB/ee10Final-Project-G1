<template>
    <BaseList :items="projectsToDisplay"/>
</template>

<script>
import BaseList from '../components/BaseList.vue';
import db from '../utilities/db';
export default {
    name: "ProjectsView",
    data() {
        return {
            projects: []
        };
    },

    computed: {
        projectsToDisplay() {
            return this.projects.map(item => { 
                return {
                    id: item.id,
                    header: item.project
                }
            })
        }
    },

    created() {
        db.get("js4projects").then(data => {
            this.projects = data;
            console.log(this.projects);
        });
    },
    components: { BaseList }
}

</script>