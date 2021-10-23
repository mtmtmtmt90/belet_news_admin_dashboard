<template>
    <div>
        <div class="add-prop-area">
            <h1>Täze awtor</h1>
            <div>
                <span>Position</span><input type="number" class="input-menu w30" v-model="inputPOS"> 
                <label for="author-logo">Logo:</label><input type="file" class="author-input-logo" @change="uploadImage($event)">
            </div>
            <div style="display:flex; justify-content:space-between;">
                <span>Ady</span><input type="text" class="input-menu" v-model="inputName">
            </div>
            <div style="display:flex; justify-content:space-between;">
                <span>e-mail</span><input type="text" class="input-menu" v-model="inputMail">
            </div>
            <div style="display:flex; justify-content:space-between;">
                <span>domain</span><input type="text" class="input-menu" v-model="inputDomain">
            </div>
            <div class="newAuthor-area" v-for="(el,idx) in author" :key="idx">
                <div>Dil: <b style="margin-left:30px;">{{ el.hl }}</b></div>
                <div style="display:flex; justify-content:space-between;">
                    Ady: <input type="text" class="input-menu" v-model="el.title">
                </div>
                <div style="display:flex; justify-content:space-between;">
                    Açyklamasy: <textarea cols="15" rows="2" class="input-menu" v-model="el.description"></textarea>
                </div>
            </div>
            <button class="add-prop-button" @click="saveAuthor()">Ýada sal!</button>
        </div>
    </div>
</template>

<script>

import {post} from './fetchPOST.js'

export default {
    data(){
        return{
            inputPOS:0,
            inputFile:null,
            inputName:null,
            inputMail:null,
            inputDomain:null,
            author:[
                {
                    hl:'tm',
                    title:'',
                    description:''
                },
                {
                    hl:'ru',
                    title:'',
                    description:''
                },
                {
                    hl:'en',
                    title:'',
                    description:''
                }
            ]
        }
    },
    methods:{
        uploadImage(e){
            let vm = this
            let reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = img =>{
                vm.inputFile = img.target.result
            }
        },
        async saveAuthor(){
            let dat = {
                'position':parseInt(this.inputPOS),
                'logo':this.inputFile.substr(23),
                'name':this.inputName,
                'email':this.inputMail,
                'domain':this.inputDomain,
                'author':this.author
            }
            let response = await post('/api/authors/create',dat)
            this.$emit('exitFun')
        }
    }
}
</script>

<style src="./assets/css/authorFromAddProp.css">

</style>