<template>
    <div class="container">
        <div class="checker">
            <div class="pointer">O</div>
            <div class="buttons" @click="toggle('author')" :class=" author ? 'active' : ''">Awtor</div>
            <div class="buttons" @click="toggle('category')" :class=" category ? 'active' : ''">Kategoriýalar</div>
            <div class="buttons" @click="toggle('tag')" :class=" tag ? 'active' : ''">Teg</div>
        </div>
        <div class="mod-container">
            <transition name="mod-area">
                <author-mod class="area-1" v-if="author"></author-mod>            
            </transition>
            <div class="mod-container-2">
                <transition name="mod-area">
                    <category-mod class="area-2" v-if="category"></category-mod>
                </transition>
                <transition name="mod-area">
                    <tag-mod class="area-2" v-if="tag"></tag-mod>            
                </transition>
            </div>    
        </div>
    </div>    
</template>

<script>

import authorMod from './authorMod.vue'
import categoryMod from './categoryMod.vue'
import tagMod from './tagMod.vue'

export default {
    components:{
        authorMod,
        categoryMod,
        tagMod
    },
    data(){
        return {
            author:false,
            category:false,
            tag:false
        }
    },
    methods:{
        toggle(x){
            switch (x) {
                case 'author' : this.author = !this.author; break
                case 'category' : this.category = !this.category; break
                case 'tag' : this.tag = !this.tag; break
            }
        }
    }
}
</script>

<style scoped src="./assets/css/modification.css">

</style>