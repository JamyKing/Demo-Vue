<template>
  <div class="header">
    <h2>
      Demo 演示
      <el-link :underline="false" href="https://github.com/JamyKing/Demo-Vue">
        <i class="iconfont icon-github" style="font-size: 30px;"></i>
      </el-link>
    </h2>
  </div>
</template>

<script>
export default {
  name: 'layoutHeader',
  components: {},
  data() {
    return {
    }
  },
  created() {
  },
  activated() {
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang="scss">
.header {
  height: 60px;
  background: #E9ECEF;
  line-height: 60px;
  padding: 0 30px;
}
</style>
