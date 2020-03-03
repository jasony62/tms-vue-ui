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
export default {
  name: 'ArrayInputUi',
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
