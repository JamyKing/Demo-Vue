<template>
    <el-row :gutter="20">
        <el-col :span="12">
            <editor-bar ref="editor" v-model="content" @change="editorChange" :isClear="isClear"></editor-bar>
        </el-col>
        <el-col :span="12">
            <el-card v-html="htmlRander" style="padding: 20px;"></el-card>
        </el-col>
    </el-row>
</template>

<script>
import EditorBar from '@/components/wangEditor'
export default {
    name: 'editor',
    components: {
        EditorBar
    },
    data() {
        return {
            content: '',
            htmlRander: ''
        }
    },
    created() {
    },
    activated() {
    },
    computed: {},
    watch: {},
    methods: {
        editorChange (data) {
            this.htmlRander = data
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
