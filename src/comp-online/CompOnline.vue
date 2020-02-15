<template>
  <div class='comp-online'>
    <component ref="realComp" :is="comp" v-bind="props"></component>
  </div>
</template>

<script>
import { tmsImportLib } from 'tms-vue/lib/runtime-lib'

export default {
  props: {
    url: { type: String },
    name: {
      type: String,
      default: function() {
        return 'index'
      }
    },
    includeCss: {
      type: Boolean,
      default: function() {
        return true
      }
    },
    props: {
      type: Object,
      default: function() {
        return {}
      }
    },
    events: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      comp: null
    }
  },
  methods: {
    async loadRealComp() {
      // 加载组件
      const { url, includeCss, events } = this
      const compOptions = await tmsImportLib(url, { includeCss })
      this.comp = compOptions
      // 转发事件
      if (events && events.length) {
        this.$nextTick(() => {
          events.forEach(evtName =>
            this.$refs.realComp.$on(evtName, args => this.$emit(evtName, args))
          )
        })
      }
    }
  },
  mounted() {
    this.$watch('url', {
      handler: 'loadRealComp',
      immediate: true
    })
  }
}
</script>