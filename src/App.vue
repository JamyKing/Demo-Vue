<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <layout-aside></layout-aside>
      </el-aside>
      <el-container>
        <el-header>
          <layout-header></layout-header>
        </el-header>
        <el-main>
          <router-view></router-view>
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
      window.onresize = () => {
        this.clientHeight = document.documentElement['clientHeight']
      }
    },
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
