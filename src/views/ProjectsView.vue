<template>
    <ul v-for="project in projects">
        <li>
            <h3>
                {{ project.project }}
            </h3>

        </li>
    </ul>
</template>

<script>
import db from '../utilities/db';
export default {
    name: 'ProjectsView', 
    data() {
        return{
            projects: null
        }
    },
    created() {
        db.get('js4projects').then(data => {
            this.projects = data
            console.log(this.projects);
        })
    }
}

</script>