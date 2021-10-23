<template>
    <div>
        <div style="margin-bottom:10px">
            <span style="margin-right:10px">Awtor saýla:</span>
            <select>
                <option>Turkmenportal</option>
                <option>Wylsacom</option>
            </select>
        </div>
        <div class="author-container">
            <div class="block-1">
                <div>
                    <img src="./assets/img/logo/1.jpg" alt="" style="width:300px; height:300px;">
                </div>
                <div>
                    <input type="file">
                </div>
                <div class="author-buttons">
                    <div>
                        Arassala                        
                    </div>
                    <div>
                        Ýada sal
                    </div>
                    <div>
                        Ýok et
                    </div>
                </div>
            </div>
            <div class="block-2">
                <div class="author-parameters">
                    <span class="param-name">Position</span>
                    <input type="number" class="param-input">
                </div>
                <div class="author-parameters">
                    <span class="param-name">Ady</span>
                    <input type="text" class="param-input">
                </div>
                <div class="author-parameters">
                    <span class="param-name">Email</span>
                    <input type="mail" class="param-input">
                </div>
                <div class="author-parameters">
                    <span class="param-name">Domen</span>
                    <input type="text" class="param-input">
                </div>
            </div>
            <div class="block-3">
                <div class="lg-pr">
                    <div class="lang">TM</div>
                    <div class="lg-pr-input">
                        <input type="text" class="param-input" placeholder="title...">
                    </div>
                    <div class="lg-pr-input">
                        <textarea class="param-textarea" placeholder="description..."></textarea>
                    </div>
                </div>
                <div class="lg-pr">
                    <div class="lang">RU</div>
                    <div class="lg-pr-input">
                        <input type="text" class="param-input" placeholder="title...">
                    </div>
                    <div class="lg-pr-input">
                        <textarea class="param-textarea" placeholder="description..."></textarea>
                    </div>
                </div>
                <div class="lg-pr">
                    <div class="lang">EN</div>
                    <div class="lg-pr-input">
                        <input type="text" class="param-input" placeholder="title...">
                    </div>
                    <div class="lg-pr-input">
                        <textarea class="param-textarea" placeholder="description..."></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>        
</template>

<script>

import {get} from './fetchGET'

export default {
    
    data(){
        return {
            authorsData:[]
        }
    },
    mounted(){
        this.authorsGet()
    },
    methods:{
        async authorsGet(){
            let response = await get('/api/authors/all?hl=tm')
            response = await response.json()
            this.authorsData = response.data
            console.log(this.authorsData)
        }
    }
}
</script>

<style scoped src="./assets/css/authorMod.css">

</style>