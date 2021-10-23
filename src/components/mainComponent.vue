<template>
    <div class="main-container">
        <div class="main-category">
            <h2>Awtorlar:</h2>
            <div class="main-authors-flex">
                <div class="main-authors-items" v-for="(el, idx) in authors" :key="idx">
                    <div style="height:50%; border-bottom:1px solid lightgrey;width:100%;display:flex;justify-content:center;">
                        <img :src="el.logo" alt="" class="main-authors-logo">
                    </div>
                    <div class="main-authors-inf">
                        <div class="main-authors-inf-flex">
                            <div>
                                <div style="color:darkblue;">
                                    <big><b>{{el.count}}</b></big>
                                </div>
                                <div>
                                    Täzelik sany
                                </div>
                            </div>
                            <div style="border-left:1px solid lightgrey;"></div>
                            <div>
                                <div style="color:darkblue;">
                                    <big><b>{{el.open + 1}}</b></big>
                                </div>
                                <div>
                                    Okalan sany
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
        <div class="main-category">
            <h2>Kategoriýalar:</h2>
            <div class="main-categories">
                <div class="main-categories-list" v-for="(el, idx) in categories" :key="idx" :style="{borderColor:  color[idx]}">
                    <div class="main-categories-name">
                        {{el.name}}
                    </div>
                    <div class="main-categories-count">
                        {{el.count}}
                    </div>
                </div>
            </div>
        </div>
        <div class="main-category">
            <div>
                <h2>Kategoriýalaryň okalşy:</h2>
            </div>    
            <div class="main-graph">
                <div v-for="(el,idx) in categories" :key="idx" :style="{ backgroundColor: color[idx], width: [(el.open + 1) / (categoriesOpenLen / 100)]+'%' }" :title="el.name"></div>
            </div>
            <div style="height:10px;"></div>
        </div>
        
    </div>
</template>

<script>
import { get } from './fetchGET';

export default{
    data(){
        return{
            color:[
                '#6929c4',
                '#1192e8',
                '#005d5d',
                '#9f1853',
                '#fa4d56',
                '#570408',
                '#198038',
                '#002d9c',
                '#ee538b',
                '#b28600',
                '#009d9a',
                '#012749',
                '#8a3800',
                '#a56eff',
                '#8a3ffc',
                '#007d79',
                '#ff7eb6',
                '#6fdc8c',
                '#d12771',
                '#d2a106',
                '#ba4e00',
                '#FF6767',
                '#FF2828',
                '#FF7F23',
                '#FFCF23',
                '#FBFF23',
                '#D3FF23',
                '#77FF23',
                '#23FF7B',
                '#23FFE5',
                '#23BDFF',
                '#2388FF',
                '#5C23FF',
                '#AB23FF',
                '#FB23FF',
                '#FF239A',
                '#FF2372',
                '#8E0000'
            ],
            categories:{},
            authors:{},
            categoriesOpenLen:0
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        async getData(){
            
            let categoriesResponse = await get('/api/categories/count')
            if (!categoriesResponse.ok) { alert('Произошла ошибка, перезагрузите страницу!') }
            categoriesResponse = await categoriesResponse.json()
            this.categories = categoriesResponse.Data
            for (let i in this.categories) {
                this.categoriesOpenLen = this.categoriesOpenLen + this.categories[i].open + 1
            }
            let authorsResponse = await get('/api/authors/count')
            if (!authorsResponse.ok) { alert('Произошла ошибка, перезагрузите страницу!') }
            authorsResponse = await authorsResponse.json()
            this.authors = authorsResponse.Data
        }
    },
    computed:{
        
    }
}
</script>

<style src="./assets/css/mainComponent.css"></style>