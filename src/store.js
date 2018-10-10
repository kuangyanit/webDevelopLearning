import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    com_pageName_mutations: null,
    com_pageName_actions: null
  },
  //只支持同步
  mutations: {
    SET_COM_PAGENAME_MUTATIONS_MUTATIONSTYLE(state, value){
      state.com_pageName_mutations = value 
    },
    SET_COM_PAGENAME_ACTIONS_MUTATIONSTYLE(state, value){
      state.com_pageName_actions = value
    }
  },
  //同步异步均支持
  actions: {
    SET_COM_PAGENAME_ACTIONS_ACTIONSTYLE({ commit, rootState}, value){
      commit('SET_COM_PAGENAME_ACTIONS_MUTATIONSTYLE', value)
    }
  }
})
