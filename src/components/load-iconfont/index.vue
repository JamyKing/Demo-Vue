<template>
  <remote-js :typeInfo="this.loadType" :src="this.jsUrl" @load-js-finish="this.jsLoadCallBack"></remote-js>
</template>

<script>
  export default {
    components: {
      'remote-js': {
        render (createElement) {
          const that = this
          console.log(that.typeInfo)
          if (this.typeInfo === 'js') {
            return createElement('script', {
              attrs: { type: 'text/javascript', src: this.src },
              on: {
                load: function () {
                  that.$emit('load-js-finish')
                }
              }
            })
          } else if (this.typeInfo === 'css') {
            return createElement('link', {
              attrs: { rel: 'stylesheet', href: this.src },
              on: {
                load: function () {
                  that.$emit('load-js-finish')
                }
              }
            })
          }
        },
        props: {
          src: {
            required: true
          }
        }
      }
    },
    props: {
      loadType: { required: true }, // 加载类型：js | css
      jsUrl: { required: true }, // 需要加载的外部url
      jsLoadCallBack: Function// 外部js加载完成回调
    }
  }
</script>
