<template>

  <div class="question_wrapper px-5">
    <div class="inputsection">
        <template v-for="question in questions">
          <question-item :question="question" v-bind:key="question.id"></question-item>
        </template>
    </div>
  </div>

</template>

<script>
import QuestionItem from "@/components/QuestionItem";
import axios from 'axios';

  export default {
    components: {
        QuestionItem,
    },
    props: {},
    data() {
        return {
            questions: {}
        }
    },
    computed: {
    //   questions() {
    //     if (!this.questions) {
    //         return []
    //     } else {
    //         return this.questions
    //     }
    //   },
    },

    watch: {},

    mounted() {
      axios.get('/list/questions',
        { headers: {"Authorization" : `Bearer ${this.$store.getters.StateUser}`} }
      ).then((res) => {
        this.questions = res.data
      })
    },

    methods: {

    },
  }
</script>

