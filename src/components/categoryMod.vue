<template>
    <div>
        <div style="margin-bottom:10px">
            <span style="margin-right:10px">Kategoriýa saýla:</span>
            <select>
                <option>Syýasat</option>
                <option>Jemgyýet</option>
            </select>
        </div>
        <div class="category-container">
            <div class="block-1">
                <div class="category-parameters">
                    <span class="param-name">Position</span>
                    <input type="number" class="param-input">
                </div>
                <div class="category-buttons">
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
            <div class="block-3">
                <div class="lg-pr">
                    <div class="lang">TM</div>
                    <div class="lg-pr-input">
                        <input type="text" class="param-input" placeholder="title...">
                    </div>
                </div>
                <div class="lg-pr">
                    <div class="lang">RU</div>
                    <div class="lg-pr-input">
                        <input type="text" class="param-input" placeholder="title...">
                    </div>
                </div>
                <div class="lg-pr">
                    <div class="lang">EN</div>
                    <div class="lg-pr-input">
                        <input type="text" class="param-input" placeholder="title...">
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
export default {
    
}
</script>

<style scoped src="./assets/css/categoryMod.css">

</style>