<template>
  <div id="msglist" class="msglist">
    <div
      v-if="activeChatRoomMessages.length == 0 && GET_CURRENT_USER_UUID"
      class="no_msg"
    >
      <div class="no_msg_content">
        <span class="icon-BT_Chat"></span>
        <br />
        Start chatting with this user.
      </div>
    </div>

    <!-- <pre style="color:black; max-width: 100%; overflow:hidden">
      {{activeChatRoomMessages}}
    </pre> -->

    <virtual-list
      :data-key="'id'"
      :data-sources="activeChatRoomMessages"
      :data-component="MessageItem"
      :estimate-size="recordTotal"
      :keeps="recordTotal"
      :recordTotal="recordTotal"
      :extra-props="{ self: GET_CURRENT_USER_UUID.id }"
    ></virtual-list>
  </div>
</template>

<script>
import VirtualList from "vue-virtual-scroll-list";
import MessageItem from "@/components/Networking/Chats/MessageItem";
import { mapGetters, mapActions, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "MessageList",
  components: {
    VirtualList,
    MessageItem,
  },
  data() {
    return {
      MessageItem,
      activeChatRoomMessages: null,
      recordTotal: null,
      access: this.$store.getters.StateUser,
    };
  },
  computed: {
    ...mapGetters("messenger", [
      "GET_CURRENT_USER_UUID",
      "GET_CURRENT_CHAT_ROOM_UUID",
      // 'GET_LOCAL_MESSAGES'
    ]),
  },
  watch: {
    activeChatRoomMessages() {
      console.log("wow");
      this.getMessages();
      this.SCROLL_TO_BOTTOM();
    },
  },
  mounted() {
    this.getMessages();
    this.SCROLL_TO_BOTTOM();
    var access = this.access;

    var pusher = new Pusher("a512ce6f28510c640445", {
      cluster: "ap1",
      // authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
    });
    var channel = pusher.subscribe(
      `chatRoom.${this.GET_CURRENT_CHAT_ROOM_UUID}`
    );
    // channel.bind("pusher:subscription_error", function (data) {
    //   console.log(data);
    // });
    channel.bind("MessageCreatedEvent", function (data) {
      axios
        .get(`/chatRoom/${data.data.chatRoom.id}/messages`, {
          headers: { Authorization: `Bearer ${access}` },
        })
        .then((res) => {
          console.log("event trigger");
          this.activeChatRoomMessages = res.data.data;
          this.recordTotal = res.data.recordsTotal;
        });
    });
  },
  methods: {
    ...mapMutations("messenger", ["DELETE_PENDING_MESSAGES"]),
    ...mapActions("messenger", ["SCROLL_TO_BOTTOM", "GET_MESSAGES"]),
    setVirtualListToBottom() {
      if (this.$refs.vsl) {
        this.$refs.vsl.scrollToBottom();
      }
    },
    getMessages() {
      axios
        .get(`/chatRoom/${this.GET_CURRENT_CHAT_ROOM_UUID}/messages`, {
          headers: { Authorization: `Bearer ${this.$store.getters.StateUser}` },
        })
        .then((res) => {
          this.activeChatRoomMessages = res.data.data;
          this.recordTotal = res.data.recordsTotal;
        });
    },
  },
};
</script>
