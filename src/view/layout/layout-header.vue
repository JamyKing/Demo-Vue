<template>
    <header>
        <div class="l-content">
            <el-button plain icon="el-icon-menu" size="mini" @click="collapseMenu"></el-button>
            <h3 style=" color : #fff">首页</h3>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini">
                <span class="el-dropdown-link"><img :src="userImg" class="user"/></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
export default {
    name: 'layoutHeader',
    components: {},
    data() {
        return {
            userImg: '@/assets/logo.png'
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
