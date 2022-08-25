<template>
  <div
  class="current_user">
    <Avatar
    :img="avatar"
    />
    <div class="username">
      {{name}}
    </div>
  </div>
</template>
<script>
import Avatar from '@/components/Avatar'
// import { mapGetters } from 'vuex';
export default {
  name:"ActiveUser",
  components: {
    Avatar
  },
  props: [
    'name',
    'avatar'
  ],
}
</script>