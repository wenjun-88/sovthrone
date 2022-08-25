<template>
  <div
  class="user"
  :class="{active: active}"
  v-if="getChatRoomModel"
  @click="getChatRoomByUUID(source.id,userUUID)">
    <div
    v-if="unread"
    class="unread"></div>
    <Avatar
    :img="avatar"
    />
    {{name}}

  </div>
</template>
<script>
import Avatar from '@/components/Avatar'
import { mapGetters,mapMutations } from 'vuex';
import axios from "axios";
export default {
  name: "MessengerUser",
  components: {
    Avatar
  },
  data() {
    return {
      unread: false,
      intervalCheck: null
    }
  },
  // props: {
  //   source: {
  //     type: String,
  //     default() {
  //       return ''
  //     }
  //   }
  // },
  props: [
    'source',
    'name',
    'avatar',
    'active',
    'userUUID',
    // 'profile'
  ],
  mounted() {
    // console.log(this.profile);
    // console.log(this.userUUID);
    if ( window.localStorage.getItem(this.source) !=  this.getChatRoomModel().last_message_id) {
      this.unread = true
    }

    // this.intervalCheck = setInterval(()=>{
      if (this.GET_CURRENT_CHAT_ROOM_UUID != this.source.id && this.getLastMsgSenderUUID() == this.userUUID) {
        if (this.getLastMsgAt() != window.localStorage.getItem(this.source)) {
          this.unread = true
        } else {
          this.unread = false
        }
      }

      if (this.active) {
        this.unread = false
      }
    // }, Math.floor((Math.random() * 1000) + 500))

  },
  beforeDestroy() {
    clearInterval(this.intervalCheck)
  },
  computed:{
    ...mapGetters('messenger',[
      'GET_CURRENT_USER_UUID',
      'GET_CURRENT_CHAT_ROOM_UUID',
      'GET_DESTINATED_CHATROOM_UUID'
    ])

  },
  methods: {
    ...mapMutations('messenger',[
      'UPDATE_CURRENT_CHAT_ROOM_UUID',
      'UPDATE_CURRENT_USER_UUID',
      'TOGGLE_CHAT_TAB',
      'TOGGLE_LOADING_CHAT',
    ]),

    getChatRoomModel: function () {
      var output = '';
      axios
      .get(
        `/chatRoom/${this.source.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters.StateUser.access_token}`,
          },
        }
      )
      .then((res) => {
        output = res.data;
        console.log(output);
      });
      return output;
    },
    getLastMsgAt() {
      if (this.source) {
        axios
      .get(
        `/chatRoom/${this.source.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters.StateUser.access_token}`,
          },
        }
      )
      .then((res) => {
        return res.data.last_message_id;
      });
      } else {
        return false
      }
    },
    getLastMsgSenderUUID() {
      if (this.source) {
        axios
      .get(
        `/chatRoom/${this.source.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters.StateUser.access_token}`,
          },
        }
      )
      .then((res) => {
        return res.data.last_message.user_id;
      });
      } else {
        return false
      }
    },

    getChatRoomByUUID(chatRoomUUID, userUUID) {
      window.localStorage.setItem(this.source,this.getLastMsgAt())
      this.$emit('getChatRoomByUUID',chatRoomUUID, userUUID)
    },
  },
  // watch:{
  //   getLastMsgAt: function(next){
  //     // console.log(next);
  //     if (this.GET_CURRENT_CHAT_ROOM_UUID != this.source) {
  //       if (next != window.localStorage.getItem(this.source)) {
  //         console.log(1);
  //         this.unread = true
  //       } else {
  //         console.log(2);
  //         this.unread = false
  //       }
  //     }

  //   },
  //   active: function(){
  //     this.unread = false
  //   }
  // }
}
</script>