<template>
  <div :class="GET_CHAT_TAB" class="msger_body">
    <div class="left">
      <ChatsList />
    </div>
    <!-- left -->
    <div class="right">
      <div v-if="GET_CURRENT_USER_UUID" class="mobile_view_topbar">
        <div @click="TOGGLE_CHAT_TAB('Chats')" class="btn_back">
          <span class="icon-arrow-left2"></span>
        </div>
        <active-user
          :avatar="activeUserAvatar()"
          :name="activeUserDisplayName()"
        ></active-user>
      </div>

      <div v-if="!GET_CURRENT_CHAT_ROOM_UUID" class="no_chat">
        <div class="no_chat_content">
          <span class="icon-BT_Chat"></span>
          <br />

          <div @click="SWITCH_TAB('Participants')" class="btn btn_theme">
            Start Chatting with a user
          </div>
        </div>
      </div>

      <div
        v-show="GET_LOADING_CHAT && GET_CURRENT_USER_UUID"
        class="msglistLoading"
      >
        <div class="msglistLoading_content"></div>
      </div>

      <MessageList v-show="!GET_LOADING_CHAT && GET_CURRENT_USER_UUID" />
      <!-- msgs -->

      <MessengerInput v-if="GET_CURRENT_CHAT_ROOM_UUID" />
    </div>
    <!-- right -->
  </div>
</template>
<script>
import ChatsList from "@/components/Networking/Chats/ChatsList";
import ActiveUser from "@/components/Networking/Chats/ActiveUser";
import MessageList from "@/components/Networking/Chats/MessageList";
import MessengerInput from "@/components/Networking/Chats/MessengerInput";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "ChatsTab",
  components: {
    ChatsList,
    ActiveUser,
    MessageList,
    MessengerInput,
  },
  mounted() {
    // this.GET_PRIVATE_CHATROOM_LIST()
    // OneTwoEngage.Networking.getPrivateChatRoomList({
    //   page: 1,
    //   limit: 50,
    // }).then(()=>{
    //   console.log('Loading Done');
    //   this.TOGGLE_LOADING(false)
    // })
    // this.TOGGLE_LOADING(false)
    // console.log(this.GET_LOADING);
  },
  computed: {
    ...mapGetters("messenger", [
      "GET_INPUT",
      "GET_LOADING",
      "GET_LOADING_CHAT",
      "GET_CURRENT_USER_UUID",
      "GET_CURRENT_CHAT_ROOM_UUID",
      "GET_TAB",
      "GET_CHAT_TAB",
      "GET_PARTICIPANT_TAB",
    ]),
  },
  methods: {
    ...mapMutations("messenger", [
      "UPDATE_CURRENT_CHAT_ROOM_UUID",
      "UPDATE_CURRENT_USER_UUID",
      "DELETE_PENDING_MESSAGES",
      "TOGGLE_TAB",
      "TOGGLE_CHAT_TAB",
      "TOGGLE_PARTICIPANT_TAB",
      "TOGGLE_LOADING",
    ]),
    ...mapActions("messenger", [
      // 'GET_PARTICIPANTS',
      "SWITCH_TAB",
      "GET_PRIVATE_CHATROOM_LIST",
      // 'SCROLL_TO_BOTTOM',
      // 'GET_MESSAGES',
    ]),
    activeUserProfile() {
      return this.GET_CURRENT_USER_UUID || {};
    },
    activeUserDisplayName() {
      return this.activeUserProfile().name;
    },
    activeUserAvatar() {
      return this.activeUserProfile().avatar;
    },
  },
};
</script>