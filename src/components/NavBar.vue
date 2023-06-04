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

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(20, 59, 233);
}

a{
    text-decoration: none;
    color: rgb(246, 240, 240);
    display: inline-block;
        
}

li{
    margin: 0 2rem;
}

</style>