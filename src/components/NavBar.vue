<template>
  <div id="nav">
    <span v-if="isLoggedIn">
      <a @click="logout">Logout</a>
    </span>
    <span v-else>
      <router-link to="/">Login</router-link>
    </span>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/");
    },
  },
};
</script>
<style>
#nav {
  padding: 10px 0;
  position: absolute;
  right: 8%;
  top: 0;
  z-index: 9999;
}
#nav a {
  font-weight: bold;
}
a:hover {
  cursor: pointer;
}
@media (max-width: 760px) {
  #nav {
    right: 6vh;
  }
}
</style>
