<template>
    <el-row :gutter="20">
        <el-col :span="12">
            <editor-bar ref="editor" v-model="content" @change="editorChange" :isClear="isClear"></editor-bar>
        </el-col>
        <el-col :span="12">
            <el-card v-html="htmlRander" :style="getHeight"></el-card>
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
            content: '<h2 style="text-align: center;">富文本编辑</h2><h3 style="text-align: center;">第一条</h3><h3 style="text-align: center;">第二条</h3><h3 style="text-align: center;">第三条</h3><p></p>',
            htmlRander: '<h2 style="text-align: center;">富文本编辑</h2><h3 style="text-align: center;">第一条</h3><h3 style="text-align: center;">第二条</h3><h3 style="text-align: center;">第三条</h3><p></p>'
        }
    },
    created() {
    },
    activated() {
    },
    computed: {
        getHeight () {
            let height = this.$store.state.clientHeight - 150
            return `min-height: ${height}px; padding: 20px;`
        }
    },
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
