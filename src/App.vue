<template>
  <div id="app" class="container">
    <NavBar />
    <div class="justify-content-center p-5" style="z-index: 999;">
    <canvas id="canvas"></canvas>
      <div class="col-md-12">
        <div class="card">
          <div class="">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
