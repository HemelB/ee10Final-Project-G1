<template>
        <BaseList :items="tasksToDisplay"/>

</template>

<script>
import BaseList from '../components/BaseList.vue'
import db from '../utilities/db';

export default {
    name: "TaskView",
    data() {
        return{
            tasks:[]
        }
    },

    computed: {
        tasksToDisplay() {
            return this.tasks.map(item => { 
                return {
                    id: item.id,
                    header: item.task
                }
            })
        }
    },

    created() {
        db.get('js4tasks').then(data => {
            this.tasks = data
            console.log(this.tasks);
        })
    },
    components: { BaseList }
}
</script>