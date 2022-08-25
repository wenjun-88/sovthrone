<template>
  <div
    v-if="source.sender"
    :class="{self: self != source.sender.id}"
    class="item"
    >
      <div class="msg">
        <div class="msg_text">
          <div class="name">{{senderName()}}</div>
          <div class="msg_text_bubble">
            {{ source.content }}

            </div>
        </div>
        <div class="msg_date">
          {{ friendlyDateString(source.created_at) }}
          <!--                      12/Nov/2020 15:24-->
        </div>
      </div>
      <!-- msg -->
    </div>
    <!-- item -->
</template>
<script>
import Avatar from '@/components/Avatar'
import moment from 'moment';
import {mapGetters} from 'vuex'
export default {
  name: "MessageItem",
  props: {
    source: {
      type: Object,
      default() {
        return {}
      }
    },
    self: {
      type: String,
      default() {
        return ''
      }
    },
  },
  computed:{
    ...mapGetters('messenger',[
      'GET_CURRENT_USER_UUID'
    ])

  },
  components:{
    Avatar
  },
  methods:{
    senderName() {
        return this.source.sender.name
    },
    senderAvatar() {
      if (this.source.sender.avatar) {
        return this.source.sender.avatar
      } else {
        return ''
      }
    },
    friendlyDateString(date) {
      return moment(date).fromNow();
    }
  }
}
</script>