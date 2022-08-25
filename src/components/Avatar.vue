<template>
  <div class="avatar" style="background-image:url(/img/Main_User.svg)">
    <div
    v-if="img"
    :style="{backgroundImage:`url(${img})`}"
    class="img"></div>
    <!-- <div
    v-if="!img"
    style="background-image:url(/img/Main_User.svg)"
    class="img"></div> -->
  </div>
</template>
<script>
export default {
  name: "Avatar",
  props: [
    'img'
  ]
}
</script>