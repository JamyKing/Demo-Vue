<template>
    <el-menu
        :default-active="$route.path"
        router
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :style="getHeight">
        <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path">
            <i :class="'el-icon-' + item.icon"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <el-submenu :index="item.label" v-for="(item, index) in hasChildren" :key="index">
            <template slot="title">
                <i :class="'el-icon-' + item.icon"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex">
                    <i :class="'el-icon-' + subItem.icon"></i>
                    <span slot="title">{{ subItem.label }}</span>
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    name: 'layoutAside',
    components: {},
    data() {
        return {
            menu: [
                {
                    path: '/home',
                    name: 'home',
                    label: '首页',
                    icon: 'eleme'
                },
                {
                    path: '/test',
                    name: 'test',
                    label: 'TEST',
                    icon: 'brush'
                },
                {
                    label: '组件',
                    icon: 'present',
                    children: [
                        {
                            path: '/editor',
                            name: 'editor',
                            label: '富文本编辑',
                            icon: 'edit-outline'
                        },
                        {
                            path: '/loadIcon',
                            name: 'loadIcon',
                            label: '远程js加载',
                            icon: 'edit-outline'
                        }
                    ]
                }
            ]
        }
    },
    computed: {
        getHeight () {
            let height = this.$store.state.clientHeight
            return `height: ${height}px;`
        },
        //没有子菜单
        noChildren() {
            return this.menu.filter(item => !item.children)
        },
        //有子菜单 (这样设置会有一个问题 就是有子菜单的 永远会在没有子菜单的下面）
        hasChildren() {
            return this.menu.filter(item => item.children)
        }
    },
    methods: {
    }
}
</script>

<style lang="scss">

</style>
