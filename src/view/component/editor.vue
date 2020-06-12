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
            content: '',
            htmlRander: ''
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
