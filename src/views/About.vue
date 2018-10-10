<template>
  <div class="about">
    <h1>This is an about page, named {{ com_pageName_mutations }}</h1>
    <input v-model="com_pageName_mutations"/>

    <h1>This is an about page, named {{ com_pageName_actions }}</h1>
    <input v-model="com_pageName_actions"/>
  </div>
</template>
<script>

export default{
  name: 'about',
  data(){
    return {
      pageName: '',
    }
  },
  methods: {
    
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
    }
  }

}

</script>


