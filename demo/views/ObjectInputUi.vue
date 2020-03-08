<template>
  <div class="object-input">
    <tms-object-input :value="array" @add="arrayAdd">
      <template v-slot:default="lineProps">
        <el-input-number size="mini" v-model="lineProps.line.number"></el-input-number>
      </template>
      <template v-slot:add>+ 添加</template>
      <template v-slot:empty>x 清空</template>
      <template v-slot:remove></template>
      <template v-slot:moveup></template>
      <template v-slot:movedown></template>
    </tms-object-input>
    <tms-object-input :value="object" @add="objectAdd">
      <template v-slot:default="lineProps">
        <el-input-number size="mini" v-model="lineProps.line.number"></el-input-number>
      </template>
      <template v-slot:add>+ 添加</template>
      <template v-slot:empty>x 清空</template>
      <template v-slot:remove></template>
      <template v-slot:moveup></template>
      <template v-slot:movedown></template>
    </tms-object-input>
  </div>
</template>

<script>
export default {
  name: 'ObjectInputUi',
  data() {
    return {
      array: [{ number: 1 }],
      object: [{ number: 1 }]
    }
  },
  methods: {
    arrayAdd(cbAdd) {
      cbAdd({ number: parseInt(Math.random() * 100) })
    },
    objectAdd(cbAdd) {
      let random = parseInt(Math.random() * 100)
      cbAdd({ number: random })
    }
  }
}
</script>
