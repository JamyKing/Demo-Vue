<template>
    <div class="u-f-col">
        <el-row>
            <el-tag class="tags" type="info">页面中icon的symbol引用其实已经写好，可查看dom树，只是因为没有引入js，icon图标无法显示</el-tag>
            <el-tag class="tags">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-link"></use>
                </svg>
            </el-tag>
            <el-tag class="tags" type="success">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-github"></use>
                </svg>
            </el-tag>
        </el-row>
        <el-row>
            <el-button plain :disabled="over" @click="loadJS" v-loading.fullscreen.lock="Loading">加载JS</el-button>
        </el-row>
        <load-iconfont :loadType="loadType" :jsUrl="jsUrl" :js-load-call-back="loadOver"></load-iconfont>
    </div>
</template>

<script>
import loadIconfont from '@/components/load-iconfont'
export default {
    name: 'loadIcon',
    components: {
        loadIconfont
    },
    data() {
        return {
            loadType: null,
            jsUrl: null,
            over: false,
            Loading: false
        }
    },
    methods: {
        loadJS () {
            this.Loading = true
            setTimeout(() => {
                this.loadType = 'js'
                this.jsUrl = 'http://at.alicdn.com/t/font_1861818_lxk3phskiu.js'
            }, 1000)
        },
        loadOver () {
            // 当使用远程js里的内容时请添加"//eslint-disable-line"防止eslint检测报错
            // eslint-disable-line
            this.Loading = false
            this.over = true
            this.$message({
                showClose: true,
                message: 'IconFont远程js加载完成',
                type: 'success'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.tags {
    margin: 5px;
}
.icon {
    width: 1.5em; height: 1.5em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
