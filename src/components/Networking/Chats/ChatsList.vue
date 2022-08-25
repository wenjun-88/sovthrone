<template>
  <div class="userlist">
    <template v-for="chatRoomID in chatRoomList">
      <user-item
        v-if="getProfile(chatRoomID)"
        :key="chatRoomID.id"
        :source="chatRoomID"
        :userUUID="getProfile(chatRoomID)"
        :active="GET_CURRENT_CHAT_ROOM_UUID == chatRoomID.id"
        :name="getProfileDisplayName(chatRoomID)"
        :avatar="getProfileAvatar(chatRoomID)"
        v-on:getChatRoomByUUID="getChatRoomByUUID"
      ></user-item>
    </template>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import UserItem from "@/components/Networking/Chats/UserItem";
import axios from "axios";
export default {
  name: "ChatsList",
  components: {
    UserItem,
  },
  data() {
    return {
      chatRoomList: null,
    };
  },
  methods: {
    ...mapMutations("messenger", [
      "UPDATE_CURRENT_CHAT_ROOM_UUID",
      "UPDATE_CURRENT_USER_UUID",
      "TOGGLE_CHAT_TAB",
      "TOGGLE_LOADING_CHAT",
    ]),
    ...mapActions("messenger", ["GET_MESSAGES", "SCROLL_TO_BOTTOM"]),
    getProfile(uuid) {
      if (uuid.target[0]) {
        return uuid.target[0].id;
      } else {
        return {};
      }
    },
    getProfileDisplayName(uuid) {
      return uuid.target[0].name;
    },
    getProfileAvatar(uuid) {
      return this.getProfile(uuid).avatar;
    },
    getChatRoomByUUID: function (chatRoomUUID, userUUID) {
      this.UPDATE_CURRENT_CHAT_ROOM_UUID(chatRoomUUID);
      console.log(chatRoomUUID);
      this.UPDATE_CURRENT_USER_UUID(userUUID)
      console.log(userUUID);
      console.log(this.GET_CURRENT_USER_UUID);
      this.TOGGLE_CHAT_TAB('Messenger')
      axios
        .post(
          `/chatRoom/private/target`,
          { user_uuid: this.GET_CURRENT_USER_UUID },
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.StateUser.access_token}`
            },
          }
        )
        .then((result) => {
          this.UPDATE_CURRENT_CHAT_ROOM_UUID(result.data.id);
          this.GET_MESSAGES(result.data);
        })
      window.localStorage.setItem("lastChatUser", userUUID)
      this.unread = false
      setTimeout(()=>{
        this.SCROLL_TO_BOTTOM()
      },100)
    },
  },
  mounted() {
    console.log("mounted");
    axios
      .get(
        `/chatRoom/private`,
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters.StateUser.access_token}`,
          },
        }
      )
      .then((res) => {
        console.log(res)
        this.chatRoomList = res.data.data;
      });
  },
  computed: {
    ...mapGetters("messenger", [
      "GET_CURRENT_USER_UUID",
      "GET_CURRENT_CHAT_ROOM_UUID",
      "GET_DESTINATED_CHATROOM_UUID",
    ]),
  },
};
</script>