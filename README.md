# tms-vue-ui

## 运行和打包

执行`yarn serve`启动演示程序。

执行`yarn build`编译组件库。

## 在项目中使用

安装组件库。

```
cnpm i tms-vue-ui
```

在引入组件库的项目中安装按需加载插件。

```
cnpm i babel-plugin-import -D
```

在`babel.config.js`文件中配置插件。

```js
plugins: [
  [
    'import',
    {
      libraryName: 'tms-vue-ui',
      style: true
    }
  ]
]
```

# 组件

## 弹性布局（flex）

对子元素进行弹性布局，可指定布局方向和填充剩余空间的子元素。

### 使用

```js
import Vue from 'vue'
import { Flex } from 'tms-vue-ui'
Vue.use(Flex)
```

### 属性（props）

| 参数         | 说明                                   | 类型   | 默认值 |
| ------------ | -------------------------------------- | ------ | ------ |
| direction    | 布局方向：row（水平）或 column（垂直） | string | row    |
| elasticItems | 占据空余空间的字元素序号               | array  | -      |

## 卡片（card）

用卡片的形式显示信息，包括：图片，标题，描述。可以通过插槽进行定制。

### 使用

```js
import Vue from 'vue'
import { Flex, Card } from 'tms-vue-ui'
Vue.use(Flex).use(Card)
```

### 属性（props）

| 参数  | 说明         | 类型   | 默认值 |
| ----- | ------------ | ------ | ------ |
| thumb | 左侧图片 URL | string | -      |
| title | 标题         | string | -      |
| desc  | 描述         | string | -      |

### 插槽（slots）

| 名称   | 说明           |
| ------ | -------------- |
| header | 自定义顶部内容 |
| footer | 自定义底部内容 |
| thumb  | 自定义图片内容 |
| title  | 自定义标题内容 |
| desc   | 自定义描述内容 |
| bottom | 自定义底部内容 |
