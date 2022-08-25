import router from "../../router"
import $ from 'jquery'
import { PromptStuff } from '@/components/Toastify.js'
import axios from "axios";
import Pusher from 'pusher-js';


const messenger = {
  namespaced: true,
  state: {
    destinated_chatroom_uuid: null,
    input: '',
    currentUserUUID: null,
    currentUserProfile: {},
    currentChatroomUUID: null,
    loading: true,
    loadingChat: true,
    tab: 'Participants',
    chatTab: 'Messenger',
    participantsTab: 'Contacts',
    pendingMessages: [
      // {
      //   id: 1,
      //   content: 'Pending Message 1',
      //   replyContent: 'Tester reply content'
      // },
      // {
      //   id: 2,
      //   content: 'Pending Message 2',
      //   replyContent: 'Tester reply content'
      // }
    ],
    localMessages: []
  },
  getters: {
    GET_LOCAL_MESSAGES(state) {
      return state.localMessages
    },
    GET_TAB(state) {
      return state.tab
    },
    GET_CHAT_TAB(state) {
      return state.chatTab
    },
    GET_PARTICIPANT_TAB(state) {
      return state.participantsTab
    },
    GET_CURRENT_CHAT_ROOM_UUID(state) {
      return state.currentChatroomUUID
    },
    GET_CURRENT_USER_UUID(state) {
      return state.currentUserUUID
    },
    GET_LOADING(state) {
      return state.loading
    },
    GET_LOADING_CHAT(state) {
      return state.loadingChat
    },
    GET_DESTINATED_CHATROOM_UUID(state) {
      return state.destinated_chatroom_uuid
    },
    GET_INPUT(state) {
      return state.input
    },
  },
  mutations: {
    TOGGLE_TAB(state, data) {
      console.log(data);
      state.loading = true
      state.tab = data
    },
    TOGGLE_CHAT_TAB(state, data) {
      state.chatTab = data
    },
    TOGGLE_PARTICIPANT_TAB(state, data) {
      state.participantsTab = data
    },
    UPDATE_CURRENT_CHAT_ROOM_UUID(state, data) {
      state.currentChatroomUUID = data
    },
    UPDATE_CURRENT_USER_UUID(state, data) {
      console.log(data)
      state.currentUserUUID = data
    },
    UPDATE_INPUT(state, value) {
      // console.log(value);
      state.input = value
    },
    TOGGLE_LOADING(state, data) {
      state.loading = data
    },
    TOGGLE_LOADING_CHAT(state, data) {
      state.loadingChat = data
    },
    UPDATE_LOCAL_MESSAGES(state, data) {
      state.localMessages.push(data)
    }
  },
  actions: {
    SWITCH_TAB(context, tab) {
      this.state.messenger.loading = true
      this.commit('messenger/TOGGLE_TAB', tab)

      setTimeout(() => {
        if (tab == 'Chats') {
          if (this.state.auth.user) {
            axios.interceptors.request.use(config => {
              config.headers['Authorization'] = `Bearer ${this.state.auth.user}`;
              return config;
            });
          }
          axios.get(`/chatRoom/private`).then((res) => {
            this.dispatch('messenger/GET_PRIVATE_CHATROOM_LIST')
            this.state.messenger.loading = false
          })
        } else if (tab == 'Participants') {
          if (this.state.auth.user) {
            axios.interceptors.request.use(config => {
              config.headers['Authorization'] = `Bearer ${this.state.auth.user}`;
              return config;
            });
          }
          axios.get(`/chatRoom/participants`).then((res) => {
            console.log(res);
            this.state.messenger.loading = false
          })
        }
      }, 50)



    },
    SCROLL_TO_BOTTOM() {
      // console.log('Time to Scroll');
      // console.log(this.$el);
      // $(this.$el).find('.msglist').scrollTop($(this.$el).find('.msglist')[0].scrollHeight)
      // const objDiv = document.getElementById("msglist")
      setTimeout(function () {
        if ($('#msglist .item').length != 0) {
          const objDiv = $('.msger_body #msglist .item').eq($('#msglist .item').length - 1)[0]
          objDiv.scrollIntoView({ block: "end" })
        }
      }, 0)

    },
    GET_PARTICIPANTS() {
      axios.post(`/chatRoom/participants`, {
        page: 1,
        limit: 1000,
      })
    },
    GET_PRIVATE_CHATROOM_LIST() {
      if (this.state.auth.user) {
        axios.interceptors.request.use(config => {
          config.headers['Authorization'] = `Bearer ${this.state.auth.user}`;
          return config;
        });
      }
      axios.get(`/chatRoom/private`).then((res) => {
        return res.data;

      })
    },
    GOTOCHAT(context, userUUID) {
      // console.log(uuid);
      if (router.currentRoute.name != 'networking') {
        if (window.innerWidth > 768) {
          if (router.currentRoute.name != 'networking') {
            this.commit('SWITCH_WIDGET', 'networking')
            this.commit('TOGGLE_COMPONENT')
          }
        } else {
          router.push('/networking')
        }
      }

      console.log(userUUID);

      this.commit('messenger/TOGGLE_TAB', 'Chats')
      this.commit('messenger/TOGGLE_CHAT_TAB', 'Messenger')

      if (this.state.auth.user) {
        axios.interceptors.request.use(config => {
          config.headers['Authorization'] = `Bearer ${this.state.auth.user}`;
          return config;
        });
      }
      axios
        .post(
          `/chatRoom/private/target`,
          { user_uuid: userUUID }
        ).then((result) => {
          console.log(result);
          const { result: uuid } = result;
          this.commit('messenger/UPDATE_CURRENT_CHAT_ROOM_UUID', uuid)
          this.commit('messenger/UPDATE_CURRENT_USER_UUID', userUUID)
          this.dispatch('messenger/GET_MESSAGES', uuid)
          window.localStorage.setItem("lastChatUser", userUUID)
          this.state.messenger.destinated_chatroom_uuid = uuid
          this.state.messenger.destinated_chatroom_uuid = ''
          console.log(this.state.messenger.currentUserUUID);
        })
        .catch(() => {
          PromptStuff('User does not exist anymore', 'error')
          window.localStorage.removeItem("lastChatUser")
        })

    },
    GET_MESSAGES(context, uuid) {
      console.log($('.widget .msger').length);
      this.commit('messenger/TOGGLE_LOADING_CHAT', true)
      if (window.innerWidth > 768 && $('.widget .msger').length == 0) {
        setTimeout(() => {
          this.commit('messenger/TOGGLE_LOADING_CHAT', false)
        }, 50)
      }
      if (this.state.auth.user) {
        axios.interceptors.request.use(config => {
          config.headers['Authorization'] = `Bearer ${this.state.auth.user}`;
          return config;
        });
      }
      console.log(uuid)
      return axios.get(`/chatRoom/${uuid}/messages`).then(() => {
        this.dispatch('messenger/SCROLL_TO_BOTTOM')
        this.commit('messenger/TOGGLE_LOADING_CHAT', false)
      });
    },
    SEND_MESSAGE() {
      this.dispatch('messenger/GET_PRIVATE_CHATROOM_LIST')

      let pendingMsgId = this.state.messenger.pendingMessages.length + 1
      console.log(pendingMsgId);
      if (this.state.auth.user) {
        axios.interceptors.request.use(config => {
          config.headers['Authorization'] = `Bearer ${this.state.auth.user}`;
          return config;
        });
      }
      console.log(this.state.messenger.input)
      axios.post(`/chatRoom/${this.state.messenger.currentChatroomUUID}/message`, { message: this.state.messenger.input }).then(() => {
        this.sending = false;
        // this.DELETE_PENDING_MESSAGES(pendingMsgId)
        this.dispatch('messenger/GET_PRIVATE_CHATROOM_LIST')
        this.dispatch('messenger/SCROLL_TO_BOTTOM')

        // this.commit('messenger/DELETE_PENDING_MESSAGES',this.state.messenger.pendingMessages.length)
      });
      this.commit('messenger/UPDATE_INPUT', '')
    }
  }
}

export default messenger;