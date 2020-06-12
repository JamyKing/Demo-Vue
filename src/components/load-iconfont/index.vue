<template>
  <remote-js :src="this.jsUrl" @load-js-finish="this.jsLoadCallBack"></remote-js>
</template>

<script>
  export default {
    components: {
      'remote-js': {
        render (createElement) {
          const that = this
          return createElement('script', {
            attrs: { type: 'text/javascript', src: this.src },
            on: {
              load: function () {
                that.$emit('load-js-finish')
              }
            }
          })
        },
        props: {
          src: {
            required: true
          }
        }
      }
    },
    props: {
      jsUrl: { required: true }, // 需要加载的外部url
      jsLoadCallBack: Function// 外部js加载完成回调
    }
  }
</script>
