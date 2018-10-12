<template>
  <div class="about">
    <h1>This is an about page, named {{ com_pageName_mutations }}</h1>
    <input v-model="com_pageName_mutations">

    <h1>This is an about page, named {{ com_pageName_actions }}</h1>
    <input v-model="com_pageName_actions">

    <h1>This is an about page, named {{ c_p_m_w }}</h1>
    <input v-model="c_p_m_w"/>

    <h1>This is an about page, named {{ c_p_a_w }}</h1>
    <input v-model="c_p_a_w"/>
    
  </div>
</template>
<script>

import { mapGetters, mapActions, mapMutations } from 'vuex'

import backend_fundebug from 'fundebug-javascript'

backend_fundebug.apikey = '4ccb1161c7d6b38284a07c6b4e90f7fa5cb28e8a86dc8d974192d55396c7ba74'

export default{
  name: 'about',
  data(){
    return {
      pageName: '',
    }
  },
  mounted() {
    backend_fundebug.notify('vue-init','vue-init-test-error')
  },
  methods: {
    //将mutations、actions提取成方法
    ...mapActions([
      'SET_COM_PAGENAME_MUTATIONS_MUTATIONSTYLE',
      'SET_COM_PAGENAME_ACTIONS_MUTATIONSTYLE'
    ]),

    ...mapMutations({
      s_c_p_a_s: 'SET_COM_PAGENAME_ACTIONS_ACTIONSTYLE'
    })
  },
  computed: {
    com_pageName_mutations: {
      get(){
        return this.$store.state.com_pageName_mutations 
      },
      set(value){
        this.$store.commit('SET_COM_PAGENAME_MUTATIONS_MUTATIONSTYLE', value);
      }
    },

    com_pageName_actions: {
      get(){
        return this.$store.state.com_pageName_actions 
      },
      set(value){
         this.$store.dispatch('SET_COM_PAGENAME_ACTIONS_ACTIONSTYLE',value)
      }
    },

    //将getters提取成计算属性
    ...mapGetters({
      c_p_m_w:'com_pageName_mutations_withdate',
      c_p_a_w:'com_pageName_actions_withdate'
    })

  }

}

</script>


