<template>
    <h3>All Task</h3>
    <ul v-for="task in tasks">
        <li>
             <h4>{{ task.task }}</h4>
        </li>
    </ul>
</template>

<script>
import db from '../utilities/db';

export default {
    name: "TaskView",
    data() {
        return{
            tasks: null
        }
    },
    created() {
        db.get('js4tasks').then(data => {
            this.tasks = data
            console.log(this.tasks);
        })
    }
}
</script>