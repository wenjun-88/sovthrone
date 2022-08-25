<template>
  <div class="userlist">
    <!-- {{chatRoomList}} -->
    <template v-for="chatRoomID in chatRoomList">
      <!-- {{chatRoomID.id}} -->
      <user-item
        v-if="getProfile(chatRoomID)"
        :key="chatRoomID.id"
        :source="chatRoomID.id"
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
  computed: {
    ...mapGetters("messenger", [
      "GET_CURRENT_USER_UUID",
      "GET_CURRENT_CHAT_ROOM_UUID",
      "GET_DESTINATED_CHATROOM_UUID",
    ]),
  },
  methods: {
    ...mapMutations("messenger", [
      "UPDATE_CURRENT_CHAT_ROOM_UUID",
      "UPDATE_CURRENT_USER_UUID",
      "TOGGLE_CHAT_TAB",
      "TOGGLE_LOADING_CHAT",
    ]),
    ...mapActions("messenger", ["GET_MESSAGES", "SCROLL_TO_BOTTOM"]),
    getChatRoomModel: function (uuid) {
      // console.log(OneTwoEngage.Models.ChatRoom.query().with('target.profile').find(uuid));
      console.log(uuid)
      var output = '';
      axios
      .get(
        `/chatRoom/${uuid}`,
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters.StateUser}`,
          },
        }
      )
      .then((res) => {
        output = res.data;
      });
        console.log(output)

      return output;
    },
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
      this.UPDATE_CURRENT_USER_UUID(userUUID);
      console.log(this.GET_MESSAGES(chatRoomUUID));
      this.TOGGLE_CHAT_TAB("Messenger");
      this.GET_MESSAGES(chatRoomUUID);
      window.localStorage.setItem("lastChatUser", userUUID);
      this.unread = false;
      setTimeout(() => {
        this.SCROLL_TO_BOTTOM();
      }, 100);
    },
  },
  mounted() {
    console.log("mounted");
    axios
      .get(
        `/chatRoom/private`,
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters.StateUser}`,
          },
        }
      )
      .then((res) => {
        this.chatRoomList = res.data.data;
      });
  }
};
</script>