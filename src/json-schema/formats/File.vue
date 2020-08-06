<template>
  <div>
    <el-form-item label="文件类型">
      <el-input v-model="fileAccept" placeholder="标准格式，如'.png,.jpeg'"></el-input>
    </el-form-item>
    <el-form-item label="文件最大">
      <el-input v-model="fileSize" placeholder="请输入数字，默认以MB为单位"></el-input>
    </el-form-item>
    <el-form-item label="文件个数">
      <el-input type="number" v-model="fileLimit" placeholder="请输入数字，0无意义"></el-input>
    </el-form-item>
  </div>
</template>
<script>
export default {
  name: 'file',
  props: ['accept', 'size', 'limit'],
  defaultFormatAttrs() {
    return { accept: '', size: null, limit: null }
  },
  data() {
    let { accept: fileAccept, size: fileSize, limit: fileLimit } = this
    return {
      fileAccept,
      fileSize,
      fileLimit
    }
  },
  watch: {
    fileAccept: function(newValue) {
      this.$emit('update:accept', newValue)
    },
    fileSize: function(newValue) {
      this.$emit('update:size', newValue)
    },
    fileLimit: function(newValue) {
      this.$emit('update:limit', parseInt(newValue))
    }
  }
}
</script>