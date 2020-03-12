# 卡片（card）

用卡片的形式显示信息，包括：图片，标题，描述。可以通过插槽进行定制。

## 使用

```js
import Vue from 'vue'
import { Flex, Card } from 'tms-vue-ui'
Vue.use(Flex).use(Card)
```

## 属性（props）

| 参数  | 说明         | 类型   | 默认值 |
| ----- | ------------ | ------ | ------ |
| thumb | 左侧图片 URL | string | -      |
| title | 标题         | string | -      |
| desc  | 描述         | string | -      |

## 插槽（slots）

| 名称   | 说明           |
| ------ | -------------- |
| header | 自定义顶部内容 |
| footer | 自定义底部内容 |
| thumb  | 自定义图片内容 |
| title  | 自定义标题内容 |
| desc   | 自定义描述内容 |
| bottom | 自定义底部内容 |
