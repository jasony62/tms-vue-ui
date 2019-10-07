export default function(Vue) {
  Vue.component('tms-card', {
    props: {
      height: { type: String },
      thumb: { type: String },
      title: { type: String },
      desc: { type: String }
    },
    render() {
      let slots = this.$slots
      let { thumb, title, desc } = this.$props
      if (thumb === '') thumb = null
      return (
        <div class="tms-card">
          {slots.header ? <header>{slots.header}</header> : ''}
          <main>
            <tms-flex {...{ props: { elasticItems: [1] } }}>
              <div class="tms-card__thumb">{slots.thumb ? slots.thumb : <img src={thumb} />}</div>
              <div>
                <tms-flex {...{ props: { direction: 'column', elasticItems: [1] } }}>
                  <div class="tms-card__title">{slots.title ? slots.title : title}</div>
                  <div class="tms-card__desc">{slots.desc ? slots.desc : desc}</div>
                  {slots.bottom ? <div class="tms-card__bottom">{slots.bottom}</div> : ''}
                </tms-flex>
              </div>
            </tms-flex>
          </main>
          {slots.footer ? <footer>{slots.footer}</footer> : ''}
        </div>
      )
    }
  })
}
