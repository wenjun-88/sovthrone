<template>
  <div :class="GET_PARTICIPANT_TAB" class="msger_participants">
    <participant-list></participant-list>
    <!-- left -->
    <div class="right">
      <div class="mobile_view_topbar">
        <div @click="TOGGLE_PARTICIPANT_TAB('Contacts')" class="btn_back">
          <span class="icon-arrow-left2"></span>
        </div>
      </div>
      <div v-if="GET_CURRENT_USER_UUID && GET_CURRENT_USER_UUID.name" class="user_profile_wrapper">
        <div class="name">{{GET_CURRENT_USER_UUID.name}}</div>
        <!-- top -->
        <div class="user_profile_wrapper__bottom">
          <div
            id="btn_start_chat"
            @click="getChatRoomByUser(GET_CURRENT_USER_UUID)"
            class="btn btn-large btn_theme"
          >
            Message
          </div>
        </div>
        <!-- bottom -->
      </div>
    </div>
    <!-- right -->
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import ParticipantList from "@/components/Networking/Participants/ParticipantList";
import { PromptStuff } from "@/components/Toastify.js";
import axios from "axios";
export default {
  name: "ParticipantsTab",
  components: {
    ParticipantList,
  },
  computed: {
    ...mapGetters("messenger", [
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
      "TOGGLE_TAB",
      "TOGGLE_CHAT_TAB",
      "TOGGLE_PARTICIPANT_TAB",
    ]),
    ...mapActions("messenger", [
      "GET_PARTICIPANTS",
      "SCROLL_TO_BOTTOM",
      "GET_MESSAGES",
      "SWITCH_TAB",
    ]),
    getChatRoomByUser: function (user) {
      this.UPDATE_CURRENT_USER_UUID(user);
      window.localStorage.setItem("lastChatUser", user);
      axios
        .post(
          `/chatRoom/private/target`,
          { user_uuid: user.id },
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.StateUser}`
            },
          }
        )
        .then((result) => {
          this.UPDATE_CURRENT_CHAT_ROOM_UUID(result.data.id);
          this.GET_MESSAGES(result.data);
          this.SWITCH_TAB("Chats");
        })
        .catch(() => {
          PromptStuff("User does not exist anymore", "error");
          window.localStorage.removeItem("lastChatUser");
        });
    },
  },
};
</script>