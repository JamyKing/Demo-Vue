<template>
  <remote-js :type="this.loadTypeJs" :src="this.loadUrl" @load-finish="this.loadCallBack"></remote-js>
</template>

<script>
  export default {
    components: {
      'remote-js': {
        render (createElement) {
          const that = this
          return createElement(this.type ? 'script' : 'link', {
            attrs: { [this.type ? 'type' : 'rel']: this.type ? 'text/javascript' : 'stylesheet', [this.type ? 'src' : 'href']: this.src },
            on: {
              load: function () {
                that.$emit('load-finish')
              }
            }
          })
        },
        props: {
          src: {
            required: true
          },
          type: {
            type: Boolean,
            default: true,
            required: true
          }
        }
      }
    },
    props: {
      loadTypeJs: {
        type: Boolean,
        default: true,
        required: true
      }, // 加载类型：js | css
      loadUrl: { required: true }, // 需要加载的外部url
      loadCallBack: Function// 外部js加载完成回调
    }
  }
</script>
