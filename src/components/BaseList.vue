<template>
<ul>
    <li v-for="item in items">
        <h2>{{ item.header}}</h2>
    </li>
</ul>
</template>

<script>
export default {
    props: {
        items: Array
    }
}

</script>