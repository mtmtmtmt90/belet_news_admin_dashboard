<template>
    <div class="news-container">
        <div class="news-all" v-if="!addNewFromAdmin">
            <div class="news-operations">
                <div class="news-operations-row">
                    <div style="display:flex;">
                        <img src="./assets/img/149147.png" alt="" class="news-operation-items" title="Täzelik goş" @click="addNew">
                        <img src="./assets/img/126483.png" alt="" class="news-operation-items" title="Täzeligi üýtget" @click="modNew">
                        <img src="./assets/img/126468.png" alt="" class="news-operation-items" title="Täzeligi ýok et" @click="delNews()">
                        <img src="./assets/img/check-icon_icon-icons.com_76169.png" alt="" class="news-operation-items" title="Ähli täzelikleri belle" @click="checkAll(true)">
                        <img src="./assets/img/delete-icon_icon-icons.com_76172.png" alt="" class="news-operation-items" title="Ähli bellikleri aýyr" @click="checkAll(false)">
                        <div style="display:flex; flex-direction:column;justify-content:space-between;">
                            <div class="news-operation-items-on" title="Status" @click="changeStatus(1)">
                                ON
                            </div>
                            <div class="news-operation-items-off" title="Status" @click="changeStatus(0)">
                                OFF
                            </div>
                        </div>
                    </div>
                    <div style="display:flex;">
                        <img src="./assets/img/126492.png" alt="" class="news-operation-items" title="Öňki sahypa" @click="changePage(-1)" :style="{opacity: page > 1 ? 1 : 0}">
                        <div class="news-list-page">{{ page }}</div>
                        <img src="./assets/img/126490.png" alt="" class="news-operation-items" title="indiki sahypa" @click="changePage(1)">
                    </div>
                </div>
                <div class="news-operations-row">
                    <div>
                        Filter:
                    </div>
                    <div>
                        <select class="select-menu" v-model="categoriesID" @change="changedID()">
                            <option value="0">Ähli kategoriýalar</option>
                            <option v-for="(el, idx) in categories" :key="idx" :value="el.id">{{ el.text }}</option>
                        </select>
                    </div>
                    <div>
                        <select class="select-menu" v-model="authorsID" @change="changedID()">
                            <option value="0">Ähli awtorlar</option>
                            <option v-for="(el2, idx) in authors" :key="idx" :value="el2.id">{{ el2.title }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="news-list" id="news-list">
                <div id="no-news" style="font-size:30px;text-align:center;"></div>
                <div class="news-list-items" v-for="(el, idx) in newsList" :key="idx" :class="(selectedElement == el ? 'bordered' : '')">
                    <div style="display:flex; flex-direction:column; justify-content:space-between; margin:0 auto; width:18%;">
                        <input type="checkbox" class="list-items-check" @click="beforeChecking()" 
                        v-bind="checkArray[idx] = el" :value="idx">
                        <img :src=el.author_logo alt="" style="width:80%;border-radius:5px;">
                    </div>    
                    <div class="news-mini-name" @click="showNew(el,idx)">
                        {{el.title}}
                    </div>
                    <div class="news-mini-inf">
                        <div>
                            <img src="./assets/img/mbripreview_99511.png" alt="" class="news-mini-inf-icons">
                            <span class="news-mini-inf-text">{{el.view_count}}</span>
                            <img src="./assets/img/calendar_date_day_event_month_schedule_time_icon_123230.png" alt="" class="news-mini-inf-icons">
                            <span class="news-mini-inf-text">{{el.publish_date}}</span>
                            <span class="news-mini-inf-status">status: {{el.status}}</span>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
        <div class="news-active" v-if="!addNewFromAdmin">
            <div class="news-active-inf">
                <div>
                    <b><big>{{selectedNewCategory}}</big></b>
                </div>
                <div>
                    <i v-for="(el,idx) in selectedNewTags" :key="idx">#{{el.name}}</i>
                </div>
            </div>
            <div class="news-active-text" id="news-active"></div>
        </div>
        <transition name="content">
            <new-component v-if="addNewFromAdmin" @exitFun="restartNews" :modNew="elementForMod"></new-component>
        </transition>    
    </div>
</template>

<script>

import newComponent from './newComponent.vue';
import { get } from './fetchGET'
import { del } from './fetchDELETE'
import { post } from './fetchPOST'

export default{
    components:{
        newComponent
    },
    props:['addNewFromAdmin'],
    data(){
        return{
            categories:'',
            authors:'',
            categoriesID:0,
            authorsID:0,
            newsList:[],
            page:1,
            selectedNewTags:[],
            selectedNewContent:[],
            selectedNewCategory:'',
            selectedElement:null,
            checkArray:[],
            elementForMod:null
        }
    },
    mounted(){
        this.newsGet()
    },
    updated(){
    },
    destroyed(){
        this.exitNews()
    },
    methods:{
        async newsGet(){
            
            let categoriesResponse = await get('/api/categories/all?hl=tm')
            if (!categoriesResponse.ok) { alert('Произошла ошибка, перезагрузите страницу!') }
            categoriesResponse = await categoriesResponse.json()
            this.categories = categoriesResponse.data

            let authorsResponse = await get('/api/authors/all?hl=tm')
            if (!authorsResponse.ok) { alert('Произошла ошибка, перезагрузите страницу!') }
            authorsResponse = await authorsResponse.json()
            this.authors = authorsResponse.data
            
            this.watchFilter()
        },
        addNew(){
            this.elementForMod = null
            this.addNewFromAdmin = true
        },
        modNew(){
            this.elementForMod = {
                'Element':this.selectedElement,
                'Tags':this.selectedNewTags,
                'Content':this.selectedNewContent
            }
            this.addNewFromAdmin = true
        },
        async delNews(){
            let dat = []
            if (this.selectedElement == null) {
                for (let el of document.querySelectorAll('input[type$="checkbox"]')) {
                    if ( el.checked == true) { dat.push({'id':this.checkArray[el.value].news_text_id}) }
                }
            } else {
                dat.push({'id':this.selectedElement.news_text_id})
            }
            let data = {'data':dat}
            let response = await del('/api/news/delete',data)
            this.beforeChecking()
            this.beforeSelecting()
            this.restartNews()
        },
        async changeStatus(k){
            let dat = []
            if (this.selectedElement == null) {
                for (let el of document.querySelectorAll('input[type$="checkbox"]')) {
                    if ( el.checked == true) { dat.push({'id':this.checkArray[el.value].id}) }
                }
            } else {
                dat.push({'id':this.selectedElement.id})
            }
            let data = {'status':k,'data':dat}
            let response = await post('/api/news/status',data)
            this.beforeChecking()
            this.beforeSelecting()
            this.restartNews()
        },
        restartNews(){
            this.addNewFromAdmin = false
            this.newsGet()
        },
        exitNews(){
            this.$emit('exitNews')
        },
        beforeChecking(){
            this.selectedElement = null
            this.refreshContentBox('')
        },
        checkAll(x){
            this.beforeChecking()
            let elements = document.querySelectorAll('input[type$="checkbox"]')
            for (let elem of elements) {
                elem.checked = x
            }
        },
        changePage(x){
            if (this.page + x < 1) return;
            this.page = this.page + x 
            this.watchFilter()
        },
        changedID(){
            this.page = 1
            this.watchFilter()
        },
        refreshContentBox(k){
            document.getElementById('news-active').innerHTML = k
        },
        beforeSelecting(){
            let elements = document.querySelectorAll('input[type$="checkbox"]')
            for (let elem of elements) {
                elem.checked = false
            }
        },
        async showNew(el, idx){
            this.selectedElement = el
            
            this.beforeSelecting()
            this.refreshContentBox('<h2>Ýüklenilýär...</h2>')
            this.selectedNewCategory = el.Categories.text
            let tagResponse = await get(`/api/tags/${el.id}?hl=ru`)
            if (!tagResponse.ok) { alert('Произошла ошибка, перезагрузите страницу!') }
            tagResponse = await tagResponse.json()
            this.selectedNewTags = tagResponse.data
            console.log(this.selectedNewTags)

            let contentResponse = await get(`/api/content/${el.news_text_id}`)
            if (!contentResponse.ok) { alert('Произошла ошибка, перезагрузите страницу!') }
            contentResponse = await contentResponse.json()
            this.selectedNewContent = contentResponse.data
            var v = '<b><big>' + el.title + '</big></b>'
            this.selectedNewContent.forEach(elem => {
                if (elem.tag == "img") { v = v + '<'+elem.tag+' src="' + elem.attributes[0].value + '" style="width:100%">'}
                else {v = v + '<'+elem.tag+'>'+elem.value+'</'+elem.tag+'>'}
            })
            this.refreshContentBox(v) 
        },
        async watchFilter(){
            this.refreshContentBox('')
            document.getElementById('news-list').scrollTop = 0
           let response = await get(`/api/news/all?limit=10&page=${this.page}&hl=tm&author=${this.authorsID}&category=${this.categoriesID}`)
           if (!response.ok) { alert('Произошла ошибка, перезагрузите страницу!') }
            response = await response.json()
            document.getElementById('no-news').innerHTML = ''
            this.newsList = response.data
            if (response.data == null) { document.getElementById('no-news').innerHTML = 'Täzelik ýok!' }
       }
       
    },
    computed:{
        
    },
    watch:{
       
    }
}


</script>

<style src="./assets/css/newsComponent.css"></style>