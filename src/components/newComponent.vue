<template>
    <div class="new-container">
        <transition name="addPropTs">
            <add-prop v-if="addProps" :propName="addPropElem" @exitFun="closeAddProp"></add-prop>
        </transition>
        <div class="new-operations">
            <div class="new-lang">
                <div class="operation-name">Dil:</div>
                <div class="new-lang-items">
                    <div class="lang-item-style" :class="chosedLang == 'tm'?'lang-active':''" @click="changeLang('tm')">TM</div>
                    <div class="lang-item-style" :class="chosedLang == 'ru'?'lang-active':''" @click="changeLang('ru')">RU</div>
                    <div class="lang-item-style" :class="chosedLang == 'en'?'lang-active':''"
                    @click="changeLang('en')">EN</div>
                </div>
            </div>
            <div class="new-instruments">
                <div class="operation-name">Gurallar:</div> 
                <div class="new-instrument-list">
                    <div class="new-instrument-items" style="font-weight:bold;" @click="textChange('b')">
                        B
                    </div>
                    <div class="new-instrument-items">
                        A <span style="font-size:10px;"  @click="textChange('big')">&#9650</span>
                    </div>
                    <div class="new-instrument-items">
                        A <span style="font-size:10px;" @click="textChange('small')">&#9660</span>
                    </div>
                    <div class="new-instrument-items" style="font-style:italic;" @click="textChange('i')">
                        K
                    </div>
                    <div class="new-instrument-items" style="text-decoration:line-through;" @click="textChange('s')">
                        A
                    </div>
                    <div class="new-instrument-items" style="text-decoration:underline;" @click="textChange('ins')">
                        A
                    </div>
                    <div class="new-instrument-items">
                        <img src="./assets/img/2087927.png" alt="" style="width:12px;" @click="textChange('sup')"> 
                    </div>
                    <div class="new-instrument-items">
                        <img src="./assets/img/1828084.png" alt="" style="width:14px;" @click="textChange('sub')">
                    </div>
                    
                </div>
            </div>
            <div class="new-status">
                <div class="operation-name">Status:</div>
                    <button class="new-status-check" :class="!statusChosed ? 'new-status-active':''" @click="statusChosed = 0">off</button>
                    <button class="new-status-check"  :class="statusChosed ? 'new-status-active':''" @click="statusChosed = 1">on</button>
            </div>
            <div class="new-image-load">
                <div class="operation-name">Surat:</div>
                <div>
                    <input type="file" id="content-image" accept="image/*" style="width:150px;height:30px;" @change="uploadImage($event)">
                </div>    
            </div>
            <div class="new-category">
                <div class="operation-name">Kategoriýalar:</div>
                <div>
                    <button class="new-category-button" @click="addPropFun('kategoriýa')">Kategoriýa döret</button>
                </div>
                <div>
                    <select id="" class="select-menu" v-model="category_id">
                        <option v-for="(item,idx) in category" :key="idx" :value="item.id">{{ item.text }}</option>
                    </select>
                </div>
            </div>
            <div class="new-category">
                <div class="operation-name">Awtorlar:</div>
                <div>
                    <button class="new-category-button" @click="addPropFun('awtor')">Awtor goş</button>
                </div>
                <div>
                    <select id="" class="select-menu" v-model="authors_id">
                        <option v-for="(item,idx) in authors" :key="idx" :value="item.id">{{ item.title }}</option>
                    </select>
                </div>
            </div>
            <div class="new-tags">
                <div class="operation-name">Tegler:</div>
                <div>
                    <div>
                        <button class="new-category-button" @click="addPropFun('teg')">Teg döret</button>
                    </div>
                    <div>
                        <input type="text" class="input-menu" placeholder="Teg ýaz..." v-model="newTag" @keyup="searchHashtag()"> 
                        <div class="new-tag-options" v-for="(el,idx) in hashOptions" :key="idx" @click="addTag(el)">{{ el.name }}</div>
                    </div>
                    <div class="new-tag-list">
                        <div class="new-tag-items" v-for="(item,idx) in hashtag" :key="idx" @click="delTag(idx)">
                            <div class="tag-delete"><img src="./assets/img/korzina.png" alt="" style="height:15px;"></div>
                            <span class="new-tag-item-name">#{{ item.name }}</span>
                        </div>
                        
                    </div>
                </div>    
            </div>
            <div class="new-tags">
                <div class="operation-name">Original url:</div>
                <input type="text" class="input-menu" placeholder="url..." v-model="sourceURL"> 
            </div>
            <div class="new-save-exit">
                <button class="save-exit-button" @click="saveNew">Save</button>
                <button class="save-exit-button" @click="$emit('exitFun')">Exit</button>
            </div>
        </div>
        <div class="new-editor">
            <div class="new-main">
                <div class="new-main-image">
                    <div class="new-main-h1">Esasy surat:</div>
                    <div style="margin:5px 8px; display:flex;">
                        <img src="" alt="" style="width:30px; border-radius:5px;margin-right:10px;" id="mainImage">
                        <input type="file" id="file1" accept="image/*" style="width:0.1px;height:0.1px;" required @change="uploadMainImage($event)">
                        <label for="file1" class="new-main-surat">Ýükle!</label>
                    </div>
                </div>
                <div class="new-main-name">
                    <div class="new-main-h1">Sözbaşy:</div>
                    <div style="margin:5px 10px;width:95%;">
                        <input type="text" class="new-main-text" v-model="newTitle" required>
                    </div>
                </div>
            </div>
            <div class="new-content">
                <div id="new-redit" contenteditable @click="selectingFun()" @keypress="selectingFun()">
                
                </div>
            </div>
        </div>
    </div>
</template>

<script>
document.execCommand('defaultParagraphSeparator', false, 'p');

import addProp from './addProp.vue'
import { post } from './fetchPOST.js'
import { get } from './fetchGET.js'
import { put } from './fetchPUT'

export default {
    components:{ addProp },
    props:['modNew'],
    data(){
        return{
            statusChosed:1,
            category:null,
            authors:null,
            category_id:null,
            authors_id:null,
            chosedLang:'ru',
            selNode:null,
            hashtag:[],
            newTag:'',
            addProps:false,
            addPropElem:'',
            previewImage:null,
            newTitle:'',
            sourceURL:'',
            contentArray:[],
            hashOptions:[]
        }
    },
    mounted(){
        this.newStart()
    },
    methods:{
        newStart(){
            this.refreshCategories()
            this.refreshAuthors()
            console.log(this.modNew)
            if (this.modNew != null) {
                this.chosedLang = this.modNew.Element.hl
                this.statusChosed = this.modNew.Element.status
                this.category_id = this.modNew.Element.Categories.id
                this.authors_id = this.modNew.Element.author_id
                this.hashtag = this.modNew.Tags
                this.sourceURL = this.modNew.Element.url
                document.getElementById('mainImage').src = this.modNew.Element.image
                this.newTitle = this.modNew.Element.title
                this.writeContent(this.modNew.Content)
                this.convertToBase64()
            }
        },
        writeContent(content){
            let v = ''
            for (let el of content){
                if (el.tag == 'img') {
                    v = v + ('<'+el.tag+' src="'+el.attributes[0].value+'" style="width:100%">')
                } else {
                    v = v + ('<'+el.tag+'>'+el.value+'</'+el.tag+'>')
                }
            }
            document.getElementById('new-redit').innerHTML = v
        },
        async convertToBase64(){
            let imgs = document.querySelectorAll('.new-editor img')
            for (let el of imgs) {
                let response = await fetch(`${el.src}/base64`, { method: "GET" })
                response = await response.json()
                el.src = 'data:image;base64,' + response.base64
            }
        },
        async refreshCategories(){
            let response = await get(`/api/categories/all?hl=${this.chosedLang}`)
            if (!response.ok) { alert('Произошла ошибка, перезагрузите страницу!') }
            response = await response.json()
            this.category = response.data
        },
        async refreshAuthors(){
            let response = await get(`/api/authors/all?hl=${this.chosedLang}`)
            if (!response.ok) { alert('Произошла ошибка, перезагрузите страницу!') }
            response = await response.json()
            this.authors = response.data
            
        },
        base64Image(file,callback){
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function(f) {
                callback(f.target.result)
            }
        },  
        uploadImage(e){
            let newNode = document.createElement('img')
            this.base64Image(e.target.files[0], function(url){ newNode.src = url })
            newNode.style = 'width:100%'
            this.insertNode(newNode)
        },
        uploadMainImage(e){
            let v = document.getElementById('mainImage')
            this.base64Image(e.target.files[0], function(url) { v.src = url })
        },
        changeLang(k){
            this.chosedLang = k
            this.newStart()
        },
        createContent(txt){
            let tag = null, value = '', i = 0
            while (i < txt.length) {
                if (i + 2 < txt.length) {
                    if ((txt.substr(i,3) == '<p>') && (tag == null)) {
                        if (value != '') {
                            this.contentArray.push({'tag':'p', 'value':value})
                            value = ''
                        }
                        tag = 'p'
                        i = i + 3
                        continue
                    }
                }
                if (i + 3 < txt.length) {
                    if ((txt.substr(i,4) == '</p>') && (tag == 'p')){
                        this.contentArray.push({ 'tag':tag, 'value':value })
                        tag = null
                        value = ''
                        i = i + 4
                        continue
                    }
                }
                if (i + 9 < txt.length){
                    if (txt.substr(i,10) == '<img src="'){
                        tag = 'img'
                        value = ''
                        i = i + 10
                        continue
                    } 
                }
                if ((txt[i] == '"') && (tag == 'img')) {
                    this.contentArray.push({ 'tag':tag, 'attributes':[ { 'key':'src', 'value':value.substr(value.indexOf('base64,')+7) } ] })
                    tag = null
                    value = '' 
                    i = txt.indexOf('>', i) + 1
                    continue
                }
                value = value + txt[i]
                i = i + 1
            }
            if (value != '') { this.contentArray.push({ 'tag':'p', 'value':value }); value = ''; }
        },
        async saveNew(){
            const v = document.getElementById('new-redit').innerHTML
            this.createContent(v)
            let temp = []; this.hashtag.forEach(el => { temp.push({'id':el.id}) })
            let data = {
                'title':this.newTitle,
                'image':document.getElementById('mainImage').src.substr(document.getElementById('mainImage').src.indexOf('base64,')+7),
                'hl':this.chosedLang,
                'url':this.sourceURL,
                'author_id':this.authors_id,
                'category_id':this.category_id,
                'status':this.statusChosed,
                'content':this.contentArray,
                'hashtags':temp
            }
            console.log(data)
            let response = null
            if (this.modNew == null) {
                response = await post('/api/news/create',data)
            } else {
                response = await put(`/api/news/update/${this.modNew.Element.id}`,data)
            }
            
            if (!response.ok) { alert('Произошла ошибка, перезагрузите страницу!') }
            this.$emit('exitFun')
        },
        selectingFun(){
            this.selNode = document.getSelection()
        },
        textChange(k){
            let newNode = document.createElement(k)
            newNode.innerHTML = this.selNode.toString()
            this.insertNode(newNode)
        },
        insertNode(newNode){
            let range = this.selNode.getRangeAt(0)
            range.deleteContents()
            range.insertNode(newNode)
        },
        async searchHashtag(){
            if (!this.newTag.length) {  this.hashOptions = []; return;  }
            let response = await get(`/api/tags/search/${this.newTag}?limit=5&page=1`)
            if (!response.ok) { alert('Произошла ошибка, перезагрузите страницу!') }
            response = await response.json()
            this.hashOptions = response.data
        },
        addTag(val){
            if (this.hashtag == null) {this.hashtag = []} 
            this.hashtag.push(val)
            this.newTag = ''
        },
        delTag(idx){
            this.hashtag.splice(idx,1)
        },
        addPropFun(el){
            this.addPropElem = el
            this.addProps = true
        },
        closeAddProp(){
            this.addProps = false
            this.refreshCategories()
            this.refreshAuthors()
        }
    }
}

</script>

<style src="./assets/css/newComponent.css"></style>