<template>
    <div class="add-user-container">
        <h1>Täze ulanyjyny giriz:</h1>
        <div>
            <h3>Ulanyjynyň logini</h3>
            <input type="text" class="user-container-inputs">
        </div>
        <div class="add-user-line"></div>
        <div>
            <h3>Ulanyjynyň täze paroly</h3>
            <input type="password" class="user-container-inputs">
        </div>
        <div class="add-user-line"></div>
        <div>
            <h3>Paroly tassyklamak</h3>
            <input type="password" class="user-container-inputs">
        </div>
        <div>
            <button class="add-userInf-button" @click="saveUser()">Ýada giriz</button>
        </div>
    </div>
</template>

<script>

export default {
    methods:{
        saveUser(){
            this.$emit('added',true)
        }
    }
}
</script>

<style src="./assets/css/addUserComponent.css"></style>