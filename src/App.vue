<template>
  <div id="app">
    <el-container>
      <!--左侧栏-->
      <el-aside width="200px">
        <!--左侧栏控件-->
        <layout-aside></layout-aside>
      </el-aside>
      <!--右侧栏-->
      <el-container>
        <!--header部分-->
        <el-header>
          <!--header部分控件-->
          <layout-header></layout-header>
        </el-header>
        <el-main>
          <!--左侧栏 和 header部分对于整个后台部分都是不变的，唯一变的就是上面3的部分，这里就通过router-view来展示所需控件-->
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
