<template>
    <div>
        <div class="add-prop-container" @click="$emit('exitFun')"></div>
        <author-from-add-prop v-if="propName == 'awtor'" @exitFun="$emit('exitFun')"></author-from-add-prop>
        <div v-else class="add-prop-area">
            <h1>Täze {{ propName }}</h1>
            <div v-if="propName == 'kategoriýa'">
                <span>Position:</span><input type="number" class="input-menu w30" v-model="inputPOS">
            </div>
            <div>
                <span>TM</span><input type="text" class="input-menu" v-model="inputTM">
            </div>
            <div>
                <span>RU</span><input type="text" class="input-menu" v-model="inputRU">
            </div>
            <div>
                <span>EN</span><input type="text" class="input-menu" v-model="inputEN">
            </div>
            <button class="add-prop-button" @click="saveProp()">Ýada sal!</button>
        </div>
    </div>
</template>

<script>

import authorFromAddProp from './authorFromAddProp.vue'
import { post } from './fetchPOST.js'

export default{
    props:['propName'],
    components:{ authorFromAddProp },
    data(){
        return {
            inputPOS:0,
            inputTM:null,
            inputRU:null,
            inputEN:null
        }
    },
    methods:{
        async saveProp(){
            let dat = Object, directory = ''
            if (this.propName == 'kategoriýa') {
                directory = '/api/categories/create' 
                dat = { 
                    'position':parseInt( this.inputPOS ),
                    'category':[
                        {
                            'hl':'tm',
                            'title':this.inputTM
                        },
                        {
                            'hl':'ru',
                            'title':this.inputRU
                        },
                        {
                            'hl':'en',
                            'title':this.inputEN
                        }
                    ]
                } 
            } else {
                directory = '/api/tags/create'
                dat = { 
                    'tags':[
                        {
                            'hl':'tm',
                            'name':this.inputTM
                        },
                        {
                            'hl':'ru',
                            'name':this.inputRU
                        }
                    ]
                }
            }
            let response = await post(directory, dat)
            this.$emit('exitFun')
        }
    }
}

</script>

<style src="./assets/css/addProp.css">

</style>