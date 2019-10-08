export default function(Vue) {
  Vue.component('tms-frame', {
    props: {
      display: {
        type: Object,
        default: () => {
          return { header: true, footer: true, left: true, right: true }
        }
      },
      displaySm: {
        type: Object,
        default: () => {
          return { header: true, footer: true, left: false, right: false }
        }
      },
      backColor: { type: String, default: '#f0f3f6' },
      headerColor: { type: String, default: '#f0f3f6' },
      leftColor: { type: String, default: '#f0f3f6' },
      leftWidth: { type: String, default: '25%' },
      centerColor: { type: String, default: '#fff' },
      centerMargin: { type: String, default: '0 8px' },
      centerMarginSm: { type: String, default: '' },
      rightColor: { type: String, default: '#f0f3f6' },
      rightWidth: { type: String, default: '25%' },
      footerColor: { type: String, default: '#f0f3f6' }
    },
    methods: {
      adjust() {
        let props = this.$props
        let elCenter = this.$el.querySelector('.tms-frame__main__center')
        if (elCenter) {
          if (this.isSmallScreen) {
            elCenter.style.margin = props.centerMarginSm
          } else {
            elCenter.style.margin = props.centerMargin
          }
        }
      }
    },
    data: function() {
      return {
        isSmallScreen: false
      }
    },
    computed: {
      responsiveDisplay: function() {
        return this.isSmallScreen ? this.displaySm : this.display
      }
    },
    mounted() {
      this.isSmallScreen = window.screen && window.screen.width <= 768
      window.addEventListener('resize', () => {
        this.isSmallScreen = window.screen && window.screen.width <= 768
        Vue.nextTick(() => {
          this.adjust()
        })
      })
      Vue.nextTick(() => {
        this.adjust()
      })
    },
    render() {
      let slots = this.$slots
      let props = this.$props
      let responsiveDisplay = this.responsiveDisplay
      return (
        <div class="tms-frame" {...{ style: { backgroundColor: props.backColor } }}>
          {responsiveDisplay.header ? (
            <header class="tms-frame__header" {...{ style: { backgroundColor: props.headerColor } }}>
              {slots.header}
            </header>
          ) : (
            ''
          )}
          <main class="tms-frame__main">
            {responsiveDisplay.left ? (
              <section
                class="tms-frame__main__left"
                {...{ style: { backgroundColor: props.leftColor, width: props.leftWidth } }}
              >
                {slots.left}
              </section>
            ) : (
              ''
            )}
            <section
              class="tms-frame__main__center"
              {...{ style: { backgroundColor: props.centerColor, margin: props.centerMargin, ref: 'center' } }}
            >
              {slots.center}
            </section>
            {responsiveDisplay.right ? (
              <section
                class="tms-frame__main__right"
                {...{
                  style: { backgroundColor: props.rightColor, width: props.rightWidth }
                }}
              >
                {slots.right}
              </section>
            ) : (
              ''
            )}
          </main>
          {responsiveDisplay.footer ? (
            <footer class="tms-frame__footer" {...{ style: { backgroundColor: props.footerColor } }}>
              {slots.footer}
            </footer>
          ) : (
            ''
          )}
        </div>
      )
    }
  })
}
