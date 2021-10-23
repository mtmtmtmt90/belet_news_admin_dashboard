<template>
    <div class="users-container">
        <div class="users-list" v-if="users">
            <div style="display:flex; justify-content:space-between;">
                <h1>Dolandyryjylar:</h1>
                <div class="user-add">
                    <button class="user-add-button" @click="addNewUser">
                        Täze dolandyryjyny goş
                    </button>
                </div>
            </div>    
            <table class="users-table" cellspacing="0" cellpadding="20px">
                <thead class="table-head">
                    <th>№</th>
                    <th>Dolandyryjy login</th>
                    <th>Dolandyryjy derejesi</th>
                    <th>Üýtgetmek</th>
                    <th>Ýok etmek</th>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Admin</td>
                        <td>SysAdmin</td>
                        <td><img src="./assets/img/126483_2.png" alt="" class="users-icons"></td>
                        <td><img src="./assets/img/korzina.png" alt="" class="users-icons"></td>
                    </tr>
                    <tr class="users-tr">
                        <td>2</td>
                        <td>User</td>
                        <td>Admin</td>
                        <td><img src="./assets/img/126483_2.png" alt="" class="users-icons"></td>
                        <td><img src="./assets/img/korzina.png" alt="" class="users-icons"></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>John</td>
                        <td>Admin</td>
                        <td><img src="./assets/img/126483_2.png" alt="" class="users-icons"></td>
                        <td><img src="./assets/img/korzina.png" alt="" class="users-icons"></td>
                    </tr>
                    <tr class="users-tr">
                        <td>4</td>
                        <td>Fred</td>
                        <td>Admin</td>
                        <td><img src="./assets/img/126483_2.png" alt="" class="users-icons"></td>
                        <td><img src="./assets/img/korzina.png" alt="" class="users-icons"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <add-user-component v-if="addUser" @added="showUsers"></add-user-component>
    </div>
</template>

<script>
import addUserComponent from './addUserComponent.vue'


export default {
  components: { addUserComponent },
  
    
    data(){
        return {
            users:true,
            addUser:false,
            
        }
    },
    mounted(){
   
    },
    methods:{
        addNewUser(){
            this.users = false
            this.addUser = true
        },
        showUsers(){
            this.users = true
            this.addUser = false
        }
    }
}

</script>

<style src="./assets/css/usersComponent.css"></style>