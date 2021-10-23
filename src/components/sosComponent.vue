<template>
    <div class="sos-container">
        <div class="sos-nav">
            <div id="listPush" class="sos-nav-items sos-active" @click="changePush('listPush')">Уведомления</div>
            <div id="addPush" class="sos-nav-items" @click="changePush('addPush')">Создать уведомления</div>
        </div>
        <div v-if="list" class="sos-message">
            <div class="sos-message-items" v-for="(el, idx) in messages" :key="idx">
                <div class="sos-message-head">
                    <div class="sos-message-title">
                        {{ el.title }} 
                    </div>
                    <div class="sos-message-icons">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon" @click="sendPush(el)"><path fill="var(--ci-primary-color, currentColor)" d="M16,112V496H496V112ZM236.8,341.6a32.167,32.167,0,0,0,38.4,0L298.667,324,464,448v16H48V448L213.333,324ZM256,316,48,160V144H464v16ZM48,200,186.667,304,48,408ZM464,408,325.333,304,464,200Z" class="ci-primary"></path></svg>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon" :id="'tray'+idx" @click="changeTray(idx)">
                        <open-scope v-if="trayNum[idx]"></open-scope>
                        <close-scope v-else></close-scope>
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon" @click="deletePush(idx)"><polygon fill="var(--ci-primary-color, currentColor)" points="348.071 141.302 260.308 229.065 172.545 141.302 149.917 163.929 237.681 251.692 149.917 339.456 172.545 362.083 260.308 274.32 348.071 362.083 370.699 339.456 282.935 251.692 370.699 163.929 348.071 141.302" class="ci-primary"></polygon><path fill="var(--ci-primary-color, currentColor)" d="M425.706,86.294A240,240,0,0,0,86.294,425.706,240,240,0,0,0,425.706,86.294ZM256,464C141.309,464,48,370.691,48,256S141.309,48,256,48s208,93.309,208,208S370.691,464,256,464Z" class="ci-primary"></path></svg>
                    </div>
                </div>
                <div class="sos-message-body dropdown" :id="'trayDown'+idx">
                    {{ el.description }}
                </div>
            </div>
        </div>
        <add-sos-component v-if="!list" @exitAddSos="close"></add-sos-component>
    </div>
</template>

<script>

import addSosComponent from './addSosComponent.vue';
import OpenScope from './openScope.vue';
import CloseScope from './closeScope.vue';
import { get } from './fetchGET';
export default {
  components: { addSosComponent, CloseScope, OpenScope },
    data(){
        return {
            list:true,
            trayNum:[ 0,0,0,0,0 ],
            messages:{},
            lastOpened:{
                index:0,
                trayDown:''
            }
        }
    },
    mounted(){
        this.getExtra()
    },
    updated(){
        //this.getExtra()
    },
    methods:{
        async getExtra(){
            let response = await get('/api/extra/all')
            if (!response.ok) { alert('Произошла ошибка, перезагрузите страницу!') }
            response = await response.json()
            this.messages = response.Data
        },
        async sendPush(k){
            let response = await get(`/api/extra/push/${k.id}`)
            if (!response.ok) { alert('Произошла ошибка, перезагрузите страницу!') }
            response = await response.json()
            if (response.status == 'ok') { alert('Уведомление успешно отправлено!') }
                else { alert('Произошла ошибка при отправке уведомления!') }
        },
        changePush(k){
            let k2 = ''
            if (k == 'listPush') {this.list = true; k2 = 'addPush'} else {this.list = false; k2 = 'listPush'}
            document.getElementById(k).setAttribute("class","sos-nav-items sos-active")
            document.getElementById(k2).setAttribute("class", "sos-nav-items")
        },
        changeTray(k){
            if ((this.lastOpened.trayDown != '') && (this.lastOpened.index != k)) {
                this.$set(this.trayNum, this.lastOpened.index, 0)
                document.getElementById(this.lastOpened.trayDown).setAttribute("class","sos-message-body dropdown")    
            }
            let newVal = 1 - this.trayNum[k]
            this.$set(this.trayNum, k, newVal)
            if (!this.trayNum[k]) {
                document.getElementById('trayDown'+k).setAttribute("class","sos-message-body dropdown")
            } else {
                document.getElementById('trayDown'+k).setAttribute("class","sos-message-body")
            }
            this.lastOpened.index = k
            this.lastOpened.trayDown = 'trayDown'+k 
        },
        async deletePush(k){
            let response = await get(`/api/extra/delete/${this.messages[k].id}`)
            if (!response.ok) { alert('Произошла ошибка, перезагрузите страницу!') }
            this.lastOpened.trayDown = ''
            this.getExtra()
            alert('Успешно удалено!')
        },
        close(){
            this.lastOpened.trayDown = ''
            this.changePush('listPush')
            this.getExtra()
            alert('Успешно добавлено!')
        }
    }    
}
</script>

<style src="./assets/css/sosComponent.css"></style>