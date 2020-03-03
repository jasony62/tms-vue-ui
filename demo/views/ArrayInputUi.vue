<template>
  <div class="array-input">
    <tms-array-input :lines="array" @add="add">
      <template v-slot:default="lineProps">
        <el-input-number size="mini" v-model="lineProps.line.number"></el-input-number>
      </template>
      <template v-slot:add>+ 添加</template>
      <template v-slot:empty>x 清空</template>
      <template v-slot:remove></template>
      <template v-slot:moveup></template>
      <template v-slot:movedown></template>
    </tms-array-input>
  </div>
</template>

<script>
import Vue from 'vue'
import ArrayInput from '../../src/array-input/Comp.vue'
import { Button, InputNumber } from 'element-ui'
import { Flex } from '../../lib'
import '../../lib/text/style'

Vue.use(Button)
  .use(InputNumber)
  .use(Flex)
ArrayInput.setComponent('layout.root', 'tms-flex', {
  props: { direction: 'column' }
})
ArrayInput.setComponent('layout.lines', 'tms-flex', {
  props: { direction: 'column' }
})
ArrayInput.setComponent('layout.line', 'tms-flex')
ArrayInput.setComponent('button.add', 'el-button', {
  props: { type: 'primary' }
})
ArrayInput.setComponent('button.empty', 'el-button', {
  props: { type: 'danger' }
})
ArrayInput.setComponent('button.remove', 'el-button', {
  props: { size: 'mini', icon: 'el-icon-minus' }
})
ArrayInput.setComponent('button.moveup', 'el-button', {
  props: { size: 'mini', icon: 'el-icon-caret-top' }
})
ArrayInput.setComponent('button.movedown', 'el-button', {
  props: { size: 'mini', icon: 'el-icon-caret-bottom' }
})

export default {
  name: 'ArrayInputUi',
  components: { TmsArrayInput: ArrayInput },
  data() {
    return {
      array: []
    }
  },
  methods: {
    add() {
      this.array.push({ number: parseInt(Math.random() * 100) })
    }
  }
}
</script>
