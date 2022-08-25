<template>
  <div class="left">
    <div class="searcher">
      <span class="icon-search"></span>
      <input v-model="keyword" type="text" placeholder="Search Users" />
    </div>
    <!-- searcher -->
    <!-- {{ participantList }} -->
    <div class="userlist">
      <template v-for="participantUUID in participantList">
        <participant-item
          v-if="isAvailable(participantUUID)"
          :source="participantUUID"
          :keyword="keyword"
          :name="getProfileDisplayName(participantUUID)"
          v-on:chooseUserProfile="chooseUserProfile"
        ></participant-item>
      </template>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import axios from "axios";

// import ParticipantItem from '@/components/Networking/Participants/ParticipantItem'
export default {
  name: "ParticipantList",
  components: {
    ParticipantItem: () => import("./ParticipantItem"),
  },
  data() {
    return {
      keyword: "",
      participantList: null,
    };
  },

  methods: {
    ...mapMutations("messenger", [
      "UPDATE_CURRENT_CHAT_ROOM_UUID",
      "UPDATE_CURRENT_USER_UUID",
      "TOGGLE_CHAT_TAB",
      "TOGGLE_LOADING_CHAT",
      "TOGGLE_PARTICIPANT_TAB",
    ]),
    getProfileDisplayName(user) {
        return user.name;
    },
    getProfileAvatar(user) {
      return null;
    },
    isAvailable(user) {
      if (this.keyword.length == 0) {
        return true;
      }
      return (
        this.getProfileDisplayName(user)
          .toLowerCase()
          .indexOf(this.keyword.toLowerCase()) != -1
      );
    },
    chooseUserProfile(useruuid) {
      // this.UPDATE_CURRENT_USER_UUID(useruuid);
      // this.TOGGLE_PARTICIPANT_TAB("Profile");
      this.TOGGLE_CHAT_TAB("Messenger");
    },
  },
   mounted() {
      axios
        .get(`/chatRoom/participants`, {
          headers: { Authorization: `Bearer ${this.$store.getters.StateUser.access_token}` },
        })
        .then((res) => {
          this.participantList = res.data.data;
        });
    },
  computed: {

  },
};
</script>