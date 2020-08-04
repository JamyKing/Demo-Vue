<template>
  <div id="app">
    <el-container>
      <el-aside width="240px">
        <layout-aside></layout-aside>
      </el-aside>
      <el-container>
        <el-header style="padding: 0;">
          <layout-header></layout-header>
        </el-header>
        <el-main style="padding: 15px;">
          <keep-alive :include="['editor', 'loadIcon']">
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import layoutHeader from './view/layout/layout-header'
import layoutAside from './view/layout/layout-aside'
export default {
  name: 'App',
  components: {
    layoutHeader,
    layoutAside
  },
  mounted () {
    this.resetHeight()
  },
  computed: {
    clientHeight: {
      get () {
        return this.$store.state.clientHeight
      },
      set (val) {
        this.$store.commit('setClientHeight', val)
      }
    }
  },
  methods: {
    resetHeight () {
      this.clientHeight = document.documentElement['clientHeight']
      // window.onresize = () => {
      //   this.clientHeight = document.documentElement['clientHeight']
      // }
    },
  }
}
</script>

<style lang="scss">
  /* 公共样式 */
  @import './assets/css/common.css';
</style>
