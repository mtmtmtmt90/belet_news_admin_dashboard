<template>
    <div class="login-container">
        <div class="row-merkez">
            <div class="colm-merkez">
                <div class="login-container-2">
                    <div class="login-head">
                        <div class="login-name">
                            <span class="login-name-style">
                                Belet News
                            </span>
                        </div>
                        <div class="login-login">
                            <div class="login-login-style">
                                Login
                            </div>
                            <div class="login-login-line"></div>
                        </div>
                    </div>
                    <div class="login-body">
                        <div>
                            <div class="login-body-header" v-if="!incorrect">
                                Hoş geldiňiz!
                            </div>
                            <div class="login-incorrect" v-else>
                                Login ýa-da parol ýalňyş!
                            </div>
                            <div class="login-username">
                                <img src="./assets/img/126486.png" alt="" style="width:20px;">
                                <input type="text" class="login-input" placeholder="USERNAME" v-model="user.username"  @keydown.enter="Pressed">
                            </div>
                            <div class="login-password">
                                <img src="./assets/img/126479.png" alt="" style="width:20px;">
                                <input type="password" class="login-input" placeholder="PASSWORD" v-model="user.password"  @keydown.enter="Pressed">
                            </div>
                            <button class="login-button" @click="Pressed">
                                <span></span>
                                <span>Giriş</span>
                                <span><img src="./assets/img/126490.png" alt="" style="width:15px;"></span>
                            </button>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>

import { post } from './fetchPOST';

export default{
    data(){
        return{
            user:{
                username:'',
                password:''
            },
            incorrect:false
            
        }
    },
    created(){
        this.clearFunc()
    },
    mounted(){
       
    },
    methods:{
        clearFunc(){
            sessionStorage.clear()
        },
        async Pressed(){
            /*
            let response = await post('/auth/sign-in',this.user)
            var res = await response.json()
            if (response.ok) {
                sessionStorage.setItem('token', res.token)
                this.$emit('loginInf',true)
            } else {
                this.incorrect = true 
            }
            this.user.username=''
            this.user.password=''*/
            this.$emit('loginInf',true)
        },
        async zapros(){
            
            return res
        }
        
    }
    
}

</script>

<style src="./assets/css/loginComponent.css"></style>