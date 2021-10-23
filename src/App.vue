<template>
  <div id="app">
    <loginComponent v-if="login" @loginInf="verify"></loginComponent>  
    <admin-component v-if="admin" @exitFun="close"></admin-component>
  </div>
</template>

<script>

import loginComponent from './components/loginComponent.vue';
import adminComponent from './components/adminComponent.vue';

export default {
  name: 'app',
  components:{
    loginComponent,
    adminComponent
  },
  data(){
    return {
      login:true,
      admin:false
    }
  },
  created:function(){
    
  },
  computed:{
    
  },
  methods:{
    verify(inf){
      if (inf) {
        this.login=false
        this.admin=true
      }
    },
    close(inf){
      if (inf){
        this.login=true
        this.admin=false
      }
    }
  },
  watch:{
  
  }
}
</script>

<style src="./assets/css/app.css"></style>