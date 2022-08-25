//store/modules/auth.js

import axios from 'axios';
const state = {
    user: null,
};
const getters = {
    isAuthenticated: state => !!state.user,
    StateUser: state => state.user,
};
const actions = {
      async LogIn({commit}, User) {
        await axios.post('login', User)
          .then(res => {
            commit('setUser',{
              data: res.data
            })
          });
      },
      async LogOut({commit}){
        let user = null
        commit('LogOut', user)
      }


};
const mutations = {
    setUser(state, userData){
        state.user = userData.data
    },
    LogOut(state){
        state.user = null
    },
};
export default {
  state,
  getters,
  actions,
  mutations
};
