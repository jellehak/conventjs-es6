// https://dev.to/nkoik/writing-a-very-simple-plugin-in-vuejs---example-8g8

// This exports the plugin object.
export default {
  // The install method will be called with the Vue constructor as
  // the first argument, along with possible options
  install (Vue, options) {
    // Add a component or directive to your plugin, so it will be installed globally to your project.
    Vue.component('snackbar', {
      data: () => ({
        text: '',
        snackbar: false,
        color: 'pink'
      }),

      created () {
        // Add or modify global methods or properties.
        Vue.prototype.$snackbar = (text = '') => {
          console.log('$snackbar', text)
          this.snackbar = true
          this.text = text
        }
      },

      // https://vuejs-tips.github.io/compiler/
      render (h) {
        const { text, _s, _v } = this
        return h('v-snackbar', {
          model: {
            value: this.snackbar,
            callback: ($$v) => {
              this.snackbar = $$v
            },
            expression: 'snackbar'
          }
        }, [_v(_s(text)), h('v-btn', {
          attrs: {
            color: this.color,
            text: ''
          },
          on: {
            click: ($event) => {
              this.snackbar = false
            }
          }
        }, [_v('Close')])], 1)
      }
    })
  }
}
