<template>
    <el-container style="height: 100%">
        <!--左侧栏-->
        <el-aside width="auto">
            <!--左侧栏控件-->
            <layout-aside></layout-aside>
        </el-aside>
        <!--右侧栏-->
        <el-container>
            <!--header部分-->
            <el-header>
                <!--header部分控件-->
                <layout-header></layout-header>
            </el-header>
            <el-main>
                <!--左侧栏 和 header部分对于整个后台部分都是不变的，唯一变的就是上面3的部分，这里就通过router-view来展示所需控件-->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import layoutHeader from './layout-header'
import layoutAside from './layout-aside'
export default {
    name: 'main',
    components: {
        layoutHeader,
        layoutAside
    },
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
