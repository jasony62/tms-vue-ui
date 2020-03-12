# 弹性布局（flex）

对子元素进行弹性布局，可指定布局方向和填充剩余空间的子元素。

## 使用

```js
import Vue from 'vue'
import { Flex } from 'tms-vue-ui'
Vue.use(Flex)
```

## 属性（props）

| 参数         | 说明                                                  | 类型   | 默认值     |
| ------------ | ----------------------------------------------------- | ------ | ---------- |
| direction    | 布局方向：row（水平）或 column（垂直）                | string | row        |
| alignItems   | 子元素对齐方式。参考 flex 布局。                      | string | flex-start |
| elasticItems | 占据空余空间的字元素序号                              | array  | -          |
| gap          | 自元素之间的间距（4px 的倍数），有效值为 1，2，3，4。 | number | 2          |

```
<tms-flex><tms-flex>
```
