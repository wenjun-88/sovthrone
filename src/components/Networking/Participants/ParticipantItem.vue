<template>
  <div
  v-if="this.$store.getters.StateUser.user_id != this.source.id"
  class="user"
  @click="chooseUserProfile(source)"
  >
    <Avatar
    :img="avatar"
    />
    {{name}}

  </div>
</template>
<script>
import Avatar from '@/components/Avatar'
import { mapGetters,mapMutations, mapActions } from 'vuex';
export default {
  name: "MessengerUser",
  components: {
    Avatar
  },
  props: [
    'avatar',
    'name',
    'source'
  ],
  // props: {
  //   source: {
  //     type: String,
  //     default() {
  //       return ''
  //     }
  //   },
  //   keyword: {
  //     type: String,
  //     default() {
  //       return ''
  //     }
  //   },

  // },
  computed:{
    ...mapGetters('messenger',[
      'GET_LOADING',
      'GET_CURRENT_USER_UUID',
      'GET_CURRENT_CHAT_ROOM_UUID',
    ]),
    getProfile() {
      return OneTwoEngage.Models.User.query().with('profile').find(this.source);
    },
    getProfileDisplayName() {
      if (this.getProfile.profile) {
        return this.getProfile.profile.first_name + ' ' + this.getProfile.profile.last_name
      } else {
        return this.getProfile.name
      }
    },
    isAvailable() {
      if(this.keyword.length == 0) {
        return true;
      }
      return this.getProfileDisplayName.toLowerCase().indexOf(this.keyword.toLowerCase()) != -1;
    }

  },
  methods: {
    ...mapMutations('messenger',[
      'UPDATE_CURRENT_CHAT_ROOM_UUID',
      'UPDATE_CURRENT_USER_UUID',
      'TOGGLE_CHAT_TAB',
      'TOGGLE_LOADING_CHAT',
      'TOGGLE_PARTICIPANT_TAB'
    ]),
    ...mapActions('messenger',[
      'GET_MESSAGES'
    ]),
    // getProfileAvatar() {
    //   return this.getProfile().avatar
    // },
    chooseUserProfile(useruuid) {
      this.UPDATE_CURRENT_USER_UUID(useruuid)
      // this.TOGGLE_PARTICIPANT_TAB('Profile')
      // this.TOGGLE_CHAT_TAB('Messenger')
      this.$emit('chooseUserProfile',useruuid)
    }
  }
}
</script>