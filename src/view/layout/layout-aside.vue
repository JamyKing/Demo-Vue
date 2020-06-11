<template>
    <el-menu
        :default-active="$route.path"
        class="menus"
        router
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
    >
        <!--是否水平折叠收起菜单 会影响这里字段的显示 -->
        <h3>Demo</h3>
        <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
            <i :class="'el-icon-' + item.icon"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <el-submenu :index="item.label" v-for="(item, index) in hasChildren" :key="index">
            <template slot="title">
                <i :class="'el-icon-' + item.icon"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">
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
                    icon: 'user'
                },
                {
                    label: '其他',
                    icon: 'location',
                    children: [
                        {
                            path: '/hello',
                            name: 'hello',
                            label: '页面1',
                            icon: 'setting'
                        }
                    ]
                }
            ]
        }
    },
    created() {
    },
    activated() {
    },
    computed: {
        //没有子菜单
        noChildren() {
            return this.menu.filter(item => !item.children)
        },
        //有子菜单 (这样设置会有一个问题 就是有子菜单的 永远会在没有子菜单的下面）
        hasChildren() {
            return this.menu.filter(item => item.children)
        },
        isCollapse() {
            // 这里的数据就是从vuex取得
            return this.$store.state.isCollapse
        }
    },
    watch: {},
    methods: {
        clickMenu (item) {
            console.log(item)
        }
    }
}
</script>

<style lang="scss">
.menus {
    height: 100vh;
}
</style>
