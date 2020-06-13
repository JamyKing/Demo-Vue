<template>
    <div class="u-f-col">
        <h2>动态加载JS/CSS文件</h2>
        <h3>Icon使用阿里矢量图标，分别采用symbol引用、class引用，可查看dom树，只是因为没有引入对应的js、css，icon图标无法显示。</h3>
        <el-row :gutter="30">
            <el-col :span="8">
                <el-card class="card">
                    <h4>symbol引用</h4>
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
                </el-card>
                <el-button plain :disabled="overJS" @click="load(true)" v-loading.fullscreen.lock="Loading">加载JS</el-button>
            </el-col>
            <el-col :span="8">
                <el-card class="card">
                    <h4>class引用</h4>
                    <el-tag class="tags">
                        <i class="iconfont icon-link" style="font-size: 20px;"></i>
                    </el-tag>
                    <el-tag class="tags" type="success">
                        <i class="iconfont icon-github" style="font-size: 20px;"></i>
                    </el-tag>
                </el-card>
                <el-button plain :disabled="overCSS" @click="load(false)" v-loading.fullscreen.lock="Loading">加载CSS</el-button>
            </el-col>
        </el-row>
        <h3>加载时可打开浏览器调试工具，Network中查看。</h3>
        <dynamic-load :loadTypeJs="loadTypeJs" :loadUrl="loadUrl" :load-call-back="loadOver"></dynamic-load>
    </div>
</template>

<script>
import dynamicLoad from '@/components/dynamic-load'
export default {
    name: 'loadIcon',
    components: {
        dynamicLoad
    },
    data() {
        return {
            loadTypeJs: true,
            loadUrl: null,
            overJS: false,
            overCSS: false,
            Loading: false
        }
    },
    methods: {
        load (val) {
            this.Loading = true
            setTimeout(() => {
                this.loadTypeJs = val
                this.loadUrl = `https://at.alicdn.com/t/font_1861818_lxk3phskiu.${val ? 'js' : 'css'}`
            }, 1000)
        },
        loadOver () {
            // 当使用远程js里的内容时请添加"//eslint-disable-line"防止eslint检测报错
            // eslint-disable-line
            const { loadTypeJs } = this
            this.Loading = false
            if (loadTypeJs) {
                this.overJS = true
            } else {
                this.overCSS = true
            }
            this.$message({
                showClose: true,
                message: `IconFont远程【${loadTypeJs ? 'JS' : 'CSS'}】加载完毕！`,
                type: 'success'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    margin: 20px 0;
}
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
