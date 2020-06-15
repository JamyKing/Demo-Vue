<template>
    <div class="content">
        <div class="item-1" style="background-color: aquamarine">1</div>
        <div class="item-2" style="background-color: aqua">2</div>
        <div class="item-3" style="background-color: skyblue">3</div>
        <div class="item-4" style="background-color: cornflowerblue">4</div>
        <div class="item-5" style="background-color: orange">5</div>
    </div>
</template>

<script>
export default {
    name: 'home',
    components: {},
    data() {
        return {}
    },
    created() {
    },
    activated() {
    },
    computed: {},
    watch: {},
    methods: {}
}
</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 32% 32% 32%;
    grid-template-rows: 32% 32% 32%;
    grid-row-gap: 2%;
    grid-column-gap: 1%;
}
.item-1 {
    grid-column: 1/3;
    grid-row: 1/3;
}
.item-3 {
    grid-column: 3/4;
    grid-row: 2/4;
}
</style>
