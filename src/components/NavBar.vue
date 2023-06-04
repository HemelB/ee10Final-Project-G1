<template>
    <header>
        <nav>
            <ul> 
                <li v-for="link in links">
                    <RouterLink :to="link.path">
                        {{ link.label }}
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
    </template>
    
    <script>
    export default {
        name: "NavBar", 
        data() {
            return {
                links: [
                    { label: "Home", path: "/" },
                    { label: "Projects", path: "/projects" },
                    { label: "Tasks", path: "/tasks" },
                    { label: "Persons", path: "/persons" }
                ],
            }
        }
    }
    </script>
    
    <style scoped>
    nav{
        background-color: pink;
    }
    ul{
        list-style-type: none;
        display: flex;
    }
    </style>