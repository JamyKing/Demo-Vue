<template>
    <header style="background: skyblue">
        <el-button plain icon="el-icon-menu" size="mini" @click="collapseMenu"></el-button>
    </header>
</template>

<script>
export default {
    name: 'layoutHeader',
    components: {},
    data() {
        return {
        }
    },
    created() {
    },
    activated() {
    },
    computed: {},
    watch: {},
    methods: {
        //控制左侧菜单是否折叠
        collapseMenu () {
            this.$store.commit('collapseMenu')
        },
        //退出登陆
        logOut () {
            location.reload()
        }
    }
}
</script>
