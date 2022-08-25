<template>
  <div class="inputrow">
    <form action="#">
      <textarea
        id="field_message"
        v-on:keydown.enter.prevent.stop="sendMessage"
        v-on:input="updateMsg($event.target.value)"
        placeholder="Enter your message here"
        :value="GET_INPUT"
      ></textarea>
      <button
        id="btn_send_message"
        class="btn btn_theme"
        :class="{ disabled: this.sending }"
        @click.stop.prevent="sendMessage"
      >
        <img src="/img/BT_Send.svg" alt="" />
      </button>
      <div @click="toggleEmojiPanel()" class="btn_emoji">
        <span class="icon-smile"></span>
      </div>
      <div v-if="emoji_panel" class="emojis">
        <div
          v-for="(emoji, i) in emojis"
          v-bind:key="i"
          @click="sendEmoji(emoji)"
          class="emoji"
          v-html="emoji"
        ></div>
      </div>
    </form>
  </div>
</template>
<script>
import $ from "jquery";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "MessengerInput",
  data() {
    return {
      emoji_panel: false,
      continueDraw : false,
      totalEmojiCount : 500,
      canvasWidth : null,
      canvasHeight : null,
      context : null,
      emojies : [],
      emojis: [
        "😃",
        "😄",
        "😆",
        "😂",
        "🤨",
        "🙁",
        "😎",
        "🥳",
        "😡",
        "🤫",
        "😫",
        "😢",
        "😭",
        "🤗",
        "❤️",
        "💔",
        "👍",
        "👌",
      ],
    };
  },
  props: ["sending"],
  computed: {
    ...mapGetters("messenger", ["GET_INPUT"]),
  },
  mounted() {
    let _this = this;
    $("body").click(function (e) {
      if (!$(e.target).is(".btn_emoji,.btn_emoji *")) {
        _this.emoji_panel = false;
      }
    });
    setTimeout(() => this.initializeCanvas(), 2500);
  },
  methods: {
    ...mapMutations("messenger", ["UPDATE_INPUT"]),
    ...mapActions("messenger", ["SEND_MESSAGE"]),
    sendMessage() {
      if (this.GET_INPUT.length != 0) {
        // this.$emit('sendMessage')
        this.SEND_MESSAGE();
        this.UPDATE_INPUT("");
        $("#field_message").val("");
      }
    },
    sendEmoji(emoji) {
      // this.$emit('sendEmoji',emoji)
      if (this.emojis.includes(emoji)) {
                this.generateEmojis(emoji);
      console.log(emoji);

        }
      this.UPDATE_INPUT(emoji);
      this.SEND_MESSAGE();
    },
    toggleEmojiPanel() {
      this.emoji_panel = !this.emoji_panel;
    },
    updateMsg: function (value) {
      // this.$store.commit('UPDATE_INPUT',value)
      this.UPDATE_INPUT(value);
      // this.commit('UPDATE_INPUT',value)
    },
    initializeCanvas() {
      var canvas = document.getElementById("canvas");
      this.context = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.context.scale(2, 2);

      this.generateCanvasSize(canvas);
    },
    generateCanvasSize(canvas) {
      var coord = canvas.getBoundingClientRect();
      this.canvasWidth = coord.width;
      this.canvasHeight = coord.height;
    },
    generateEmojis(emoji) {
      if (this.continueDraw === true) return;

      for (var iterate = 0; iterate < this.totalEmojiCount; iterate++) {
        var x = Math.floor(Math.random() * this.canvasWidth);
        var offsetY = Math.abs(Math.floor(Math.random() * 300));
        var fontSize = Math.floor(Math.random() * 40) + 20;
        this.emojies.push({
          emoji: emoji,
          x,
          y: this.canvasHeight + offsetY,
          count: Math.floor(Math.random() * 3) + 4,
          fontSize,
        });

        if (iterate === this.totalEmojiCount - 1) {
          this.continueDraw = true;
          this.drawConfetti(this.emojies);
          this.endDraw();
        }
      }
    },
    drawConfetti() {
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      this.emojies.forEach((emoji) => {
        this.drawEmoji(emoji);
        emoji.y = emoji.y - emoji.count;
      });

      if (this.continueDraw) {
        requestAnimationFrame(this.drawConfetti.bind(this));
      }
    },
    drawEmoji(emoji) {
      this.context.beginPath();
      this.context.font = emoji.fontSize + "px serif";
      this.context.fillText(emoji.emoji, emoji.x, emoji.y);
    },
    endDraw() {
      setTimeout(() => {
        this.continueDraw = false;
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      }, 5000);
    },
  },
};
</script>