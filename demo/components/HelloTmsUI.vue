<template>
  <div class="hello">
    <tms-card id="myCard" thumb="/images/123.jpg" desc="tms-card-desc">
      <template slot="title">
        <b>tms-card-title</b>
      </template>
      <template slot="desc">
        <span>tms-card-desc tms-card-desc tms-card-desc tms-card-desc tms-card-desc tms-card-desc tms-card-desc tms-card-desc</span>
      </template>
      <template slot="bottom">
        <tms-flex :elasticItems="[0]">
          <span>left</span>
          <span>right</span>
        </tms-flex>
      </template>
    </tms-card>
    <hr />
    <div style="width:200px">
      <span>原始文本</span>
      <tms-text>这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本</tms-text>
      <span>显示两行</span>
      <tms-text
        :lines="2"
      >这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本</tms-text>
      <span>小屏幕（小于等于768）显示两行</span>
      <tms-text
        :lines-sm="2"
      >这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本</tms-text>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Text, Flex, Card } from '../../lib'
import '../../lib/text/style'
import '../../lib/flex/style'
import '../../lib/card/style'
Vue.use(Text)
  .use(Flex)
  .use(Card)

export default {
  name: 'HelloTmsUI'
}
</script>

<style lang="less">
#myCard {
  height: 100px;
  .tms-card__thumb img {
    height: 100px;
    width: 100px;
  }
  .tms-card__desc {
    color: #666;
  }
}
</style>
