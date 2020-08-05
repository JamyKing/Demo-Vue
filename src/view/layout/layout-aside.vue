<template>
    <el-menu
        router
        :default-active="$route.path"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :style="getHeight">
        <div v-for="(item, index) in menu" :key="index">
            <el-menu-item v-if="item.name" :index="item.path">
                <i :class="'el-icon-' + item.icon"></i>
                <span slot="title">{{ item.label }}</span>
            </el-menu-item>
            <el-submenu v-else :index="item.label">
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
        </div>
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
                    icon: 'guide'
                },
                {
                    path: '/test',
                    name: 'test',
                    label: 'Test',
                    icon: 'brush'
                },
                {
                    path: '/typing',
                    name: 'typing',
                    label: '打字训练',
                    icon: 'ship'
                },
                {
                    label: '组件封装',
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
                            label: '动态加载JS/CSS',
                            icon: 'loading'
                        }
                    ]
                },
                {
                    label: '插件使用',
                    icon: 'box',
                    children: [
                        {
                            path: '/formVerify',
                            name: 'formVerify',
                            label: '表格表单检验',
                            icon: 'document-checked'
                        },
                        {
                            path: '/drag',
                            name: 'drag',
                            label: '菜单拖拽',
                            icon: 'rank'
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
        }
    },
    methods: {
    }
}
</script>

<style lang="scss">

</style>
