<template>
  <header>
    <nav>
      <ul>
        <li v-for="link in links">
          <router-link :to="link.path">
            {{ link.label }}
          </router-link>
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
        { label: "Persons", path: "/persons" },
      ],
    };
  },
};
</script>

<style scoped>
header {
  background-color: var(--primary);
}

nav {
  max-width: 40rem;
  margin: auto;
}
ul {
  list-style-type: none;
  margin: 0;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary);
}

a {
  text-decoration: none;
  color: var(--nav-text-box);
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
  border-radius: 8px;
}

li {
  margin: 0 2rem;
  padding: 0;
  background-color: var(--secondary);
  border-radius: 8px;
}
a:active,
a:hover,
a.router-link-active {
  border: 2px solid var(--nav-text-box);
}
</style>
