<template>
    <div class="add-sos-container">
        <div class="add-sos-form">
            <div class="add-sos-name">
                Создать новое уведомление
            </div>
            <div class="add-sos-content">
                <div class="add-sos-title">
                    Hatyň sözbaşysy:
                </div>
                <div>
                    <input type="text" class="add-sos-input" v-model="title">
                </div>
            </div>
            <div class="add-sos-content">
                <div class="add-sos-title">
                    Hatyň düzümi
                </div>
                <div>
                    <textarea class="add-sos-textarea" v-model="description"></textarea>
                </div>
            </div>
            <div class="add-sos-buttons">
                <button class="add-sos-button" @click="save()">Ýada sal!</button>
            </div>
        </div>
    </div>
</template>

<script>
import { post } from './fetchPOST';
export default {
    data(){
        return {
            title:'',
            description:'',
            pushMessage:{}
        }
    },
    methods:{
        async save(){
            this.pushMessage.title = this.title
            this.pushMessage.description = this.description
            let response = await post('/api/extra/create',this.pushMessage)
            if (!response.ok) { alert('Произошла ошибка, перезагрузите страницу!') }
            this.$emit('exitAddSos',true)
        }
    }
}
</script>

<style src="./assets/css/addSosComponent.css">
</style>