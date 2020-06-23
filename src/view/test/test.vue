<template>
    <el-row :gutter="20">
        <el-col :span="6">
            <h3>选项菜单</h3>
            <draggable
                :list="menus"
                :group="{ name: 'people', pull: 'clone', put: false }"
                @change="log">
                <div class="drag-item" v-for="element in menus" :key="element.id">
                    <!--轮播图-->
                    <el-image v-if="element.name === 'banner'" :src="element.imgList[0].img"></el-image>
                    <!--金刚区-->
                    <div v-if="element.name === 'tab'">
                        <el-avatar size="medium" v-for="(item, index) in element.iconList" :src="item.icon" :key="index"></el-avatar>
                    </div>
                </div>
            </draggable>
        </el-col>
        <el-col :span="18">
            <h3>Draggable 2</h3>
            <draggable
                :list="dataForm"
                group="people"
                @change="log">
                <div class="drag-item" v-for="element in dataForm" :key="element.id">
                    <!--轮播图-->
                    <el-image v-if="element.name === 'banner'" :src="element.imgList[0].img"></el-image>
                    <!--金刚区-->
                    <div v-if="element.name === 'tab'">
                        <el-avatar size="medium" v-for="(item, index) in element.iconList" :src="item.icon" :key="index"></el-avatar>
                    </div>
                </div>
            </draggable>
        </el-col>
    </el-row>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    name: 'test',
    components: {
        draggable
    },
    data() {
        return {
            menus: [
                {
                    id: 1,
                    name: 'banner',
                    imgList: [
                        {
                            img: 'xxx',
                            url: '/pages/index/index'
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'tab',
                    iconList: [
                        {
                            icon: 'xxx',
                            url: '/pages/index/index'
                        },
                        {
                            icon: 'xxx',
                            url: '/pages/index/index'
                        },
                        {
                            icon: 'xxx',
                            url: '/pages/index/index'
                        }
                    ]
                }
            ],
            dataForm: [
                {
                    id: 3,
                    name: 'tab',
                    iconList: [
                        {
                            icon: 'xxx',
                            url: '/pages/index/index'
                        },
                        {
                            icon: 'xxx',
                            url: '/pages/index/index'
                        },
                        {
                            icon: 'xxx',
                            url: '/pages/index/index'
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
    computed: {},
    watch: {},
    methods: {
        log (evt) {
            console.log(evt)
            console.log('dataForm => ', this.dataForm)
        }
    }
}
</script>

<style lang="scss" scoped>
.drag-item {
    cursor: move;
}
</style>
