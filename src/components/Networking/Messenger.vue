<template>
  <div
    :class="[mode, getComponentState, {minimised: minimised}, {dragged: dragged}]"
    id="networking_widget"
  >

    <div class="msger">
      <div class="msger_header">
        <div
          @click="minimise()"
          v-if="mode=='widget'"
          class="btn_minimise">
          <span class="icon-minus"></span>
        </div>
        <div
          @click="$store.commit('SWITCH_WIDGET',null)"
          v-if="mode=='widget'"
          class="btn_close btn_close_widget">
          <span v-pre class="icon-BT_close"></span>
        </div>
        <div
          @click="$store.commit('TOGGLE_COMPONENT')"
          v-if="mode=='component'"
          class="btn_close btn_close_component">
          <span v-pre class="icon-minus"></span>
        </div>
        <div class="msger_header__tabs">
          <div
            id="btn_participants"
            @click.stop.prevent="SWITCH_TAB('Participants');unminimise()"
            :class="{active:GET_TAB == 'Participants'}"
            class="btn_contactlist">
            <span class="icon-BT_Networking"></span>
            <div
            v-if="!mode"
            class="text d-none d-md-block">Participants</div>
          </div>
          <div
            id="btn_chats"
            @click.stop.prevent="SWITCH_TAB('Chats');unminimise()"
            :class="{active:GET_TAB == 'Chats'}"
            class="btn_contactlist">
            <span v-pre class="icon-BT_Send"></span>
            <div
            v-if="!mode"
            class="text d-none d-md-block">Chats</div>
          </div>

        </div>

        <active-user
        v-if="GET_TAB=='Chats'"
        :avatar="activeUserAvatar()"
        :name="activeUserDisplayName()"
        ></active-user>

      </div>

      <div
      v-show="!minimised"
      class="msger_views_wrapper">

        <participant-tab
        v-if="GET_TAB=='Participants'"
        ></participant-tab>

        <chats-tab
        v-if="GET_TAB=='Chats'"
        ></chats-tab>
        <!-- Chats Tab -->

        <!-- body -->
      </div>
      <!-- msger_views_wrapper -->
    </div>
    <!-- msger -->



  </div>
</template>
<script>
import { mapActions, mapGetters,mapMutations } from 'vuex';
import { gsap,Draggable } from "gsap/all";

gsap.registerPlugin(Draggable);

export default {
  name: "Networking",
  components: {
    ParticipantTab: () => import('./Participants/ParticipantsTab'),
    ChatsTab: () => import('./Chats/ChatsTab'),
    ActiveUser: () => import('./Chats/ActiveUser')
  },
  data() {
    return {
      minimised: false,
      draggable: null,
      dragged: false
    }
  },
  props: [
    'mode', ''
  ],
  mounted(){
    if (window.localStorage.getItem("lastChatUser") && window.localStorage.getItem("lastChatUser").length > 20) {
      console.log(2);
      this.GOTOCHAT(window.localStorage.getItem("lastChatUser"))
    } else {
      this.SWITCH_TAB('Participants')
    }

    // draggble
    console.log(this.$el);

    if (window.innerWidth > 768 && this.mode == 'widget') {
      this.draggable = Draggable.create(this.$el,{
        bounds: document.body,
        trigger: '.msger_header'
      })

      this.draggable[0].addEventListener('drag',()=>{
        console.log('Drag');
        if (this.draggable[0].y < 0) {
          this.dragged = true
        } else {
          this.dragged = false
        }
        // console.log(this.draggable[0].x +' - '+this.draggable[0].y);
      })
    }
  },
  computed: {
    ...mapGetters('messenger',[
      'GET_LOADING',
      'GET_CURRENT_USER_UUID',
      'GET_CURRENT_CHAT_ROOM_UUID',
      'GET_TAB'
    ]),
    getComponentState() {
      return this.$store.getters.GET_COMPONENT ? 'show' : 'hide'
    }
  },
  methods: {
    minimise() {
      if (this.draggable) {
        this.minimised = !this.minimised
        if (this.minimised) {
          this.dragged = false
          gsap.set(this.$el,{
            x:0,
            y:0
          })
          this.draggable[0].disable()
        } else {
          this.draggable[0].enable()
        }
      }

    },
    unminimise() {
      if (this.draggable) {
        this.minimised = false
        this.draggable[0].enable()
      }

    },
    ...mapMutations('messenger',[
      'UPDATE_CURRENT_CHAT_ROOM_UUID',
      'UPDATE_CURRENT_USER_UUID',
      'DELETE_PENDING_MESSAGES',
      'TOGGLE_TAB',
      'TOGGLE_CHAT_TAB',
      'TOGGLE_PARTICIPANT_TAB'
    ]),
    ...mapActions('messenger',[
      'SWITCH_TAB',
      'GET_MESSAGES',
      'GOTOCHAT'
    ]),
    activeUserProfile() {
      return this.GET_CURRENT_USER_UUID || {}
    },
    activeUserDisplayName() {
        return this.activeUserProfile().name
    },
    activeUserAvatar() {
      return this.activeUserProfile().avatar
    }
  }
}

</script>
