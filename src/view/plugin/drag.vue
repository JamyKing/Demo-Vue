<template>
    <el-row :gutter="30" type="flex" justify="center">
        <el-col :span="6">
            <h3>选项菜单</h3>
            <draggable
                v-model="menus"
                class="menus"
                :group="{ name: 'people', pull: 'clone', put: false }"
                @change="log">
                <div class="drag-item u-f-auto" v-for="element in menus" :key="element.id">
                    <!--轮播图-->
                    <el-image v-if="element.name === 'banner'" :src="element.imgList[0].imgUrl" class="image"></el-image>
                    <!--tab区-->
                    <div v-if="element.name === 'tab'">
                        <el-tag v-for="(item, index) in element.iconList" :key="index" :type="item.type" class="tags">
                            <i class="iconfont" :class="item.icon" style="font-size: 20px;"></i>
                        </el-tag>
                    </div>
                </div>
            </draggable>
        </el-col>
        <el-col :span="6" :offset="2">
            <h3>界面布局</h3>
            <draggable
                v-model="dataForm"
                class="data-form"
                group="people"
                @change="log">
                <div class="drag-item u-f-auto" v-for="element in dataForm" :key="element.id">
                    <!--轮播图-->
                    <el-image v-if="element.name === 'banner'" :src="element.imgList[0].imgUrl" class="image"></el-image>
                    <!--金刚区-->
                    <div v-if="element.name === 'tab'">
                        <el-tag v-for="(item, index) in element.iconList" :key="index" :type="item.type" class="tags">
                            <i class="iconfont" :class="item.icon" style="font-size: 20px;"></i>
                        </el-tag>
                    </div>
                </div>
            </draggable>
        </el-col>
    </el-row>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    name: 'drag',
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
                            imgUrl: 'https://raindate.oss-cn-hangzhou.aliyuncs.com/DemoVue/bag.jpg'
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'tab',
                    iconList: [
                        {
                            icon: 'icon-link',
                            type: ''
                        },
                        {
                            icon: 'icon-github',
                            type: 'success'
                        },
                        {
                            icon: 'icon-zhihu',
                            type: 'info'
                        },
                        {
                            icon: 'icon-jianshu',
                            type: 'warning'
                        },
                        {
                            icon: 'icon-uniapp',
                            type: 'danger'
                        }
                    ]
                }
            ],
            dataForm: []
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
        }
    }
}
</script>

<style lang="scss" scoped>
    .menus {
        margin-top: 30px;
        border:1px dashed #000000;
        border-radius: 10px;
    }
    .data-form {
        min-height: 300px;
        margin-top: 30px;
        border: 1px solid #676767;
        border-radius: 10px;
    }
    .drag-item {
        padding: 10px 0;
        cursor: move;
        .image {
            width: 200px;
            height: 120px;
        }
    }
    .tags {
        margin: 5px;
    }
</style>
