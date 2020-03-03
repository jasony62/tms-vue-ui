`tms-vue-ui`是一个基于`Vue`实现的常用 UI 组件库。

# 运行和打包

运行演示程序，需执行`cnpm i vue`（注意不要-S 或-D）。

运行演示程序，需执行`cnpm i vant`（注意不要-S 或-D）。

运行演示程序，需执行`cnpm i element-ui`（注意不要-S 或-D）。

运行演示程序，需执行`cnpm i tms-vue`（注意不要-S 或-D）。

执行`yarn serve`启动演示程序。

执行`yarn build`编译组件库。

# 在项目中使用

安装组件库。

```
cnpm i tms-vue-ui -S
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

| 参数         | 说明                                                  | 类型   | 默认值     |
| ------------ | ----------------------------------------------------- | ------ | ---------- |
| direction    | 布局方向：row（水平）或 column（垂直）                | string | row        |
| alignItems   | 子元素对齐方式。参考 flex 布局。                      | string | flex-start |
| elasticItems | 占据空余空间的字元素序号                              | array  | -          |
| gap          | 自元素之间的间距（4px 的倍数），有效值为 1，2，3，4。 | number | 2          |

```
<tms-flex><tms-flex>
```

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

## 文本（text）

可以指定文本显示的行数。

### 使用

```js
import Vue from 'vue'
import { Text } from 'tms-vue-ui'
Vue.use(Text)
```

### 属性（props）

| 参数     | 说明                               | 类型   | 默认值 |
| -------- | ---------------------------------- | ------ | ------ |
| lines    | 文本显示的行数                     | number | -      |
| lines-sm | 小屏幕下（小于等于 768）显示的行数 | number | -      |

## 背景（frame）

提供自适应页面的布局。

### 使用

```js
import Vue from 'vue'
import { Frame } from 'tms-vue-ui'
Vue.use(Frame)
```

### 插槽（slots）

| 名称   | 说明                                        |
| ------ | ------------------------------------------- |
| header | 自定义顶部内容                              |
| footer | 自定义底部内容                              |
| left   | 自定义图片内容。屏幕宽度小于等于 768 隐藏。 |
| center | 自定义标题内容                              |
| right  | 自定义描述内容。屏幕宽度小于等于 768 隐藏。 |

### 属性（props）

| 参数              | 说明                                                            | 类型   | 默认值                                                  |
| ----------------- | --------------------------------------------------------------- | ------ | ------------------------------------------------------- |
| back-color        | 背景底色                                                        | string | #f0f3f6                                                 |
| footer-color      | 脚部区域底色                                                    | string | #f0f3f6                                                 |
| footer-min-height | 脚部区域最小高度。仅当未指定 footer 插槽未指定内容时有效。      | string | 32px                                                    |
| left-color        | 左侧区域底色                                                    | string | #f0f3f6                                                 |
| center-color      | 中间区域底色                                                    | string | #fff                                                    |
| right-color       | 右侧区域底色                                                    | string | #f0f3f6                                                 |
| header-color      | 头部区域底色                                                    | string | #f0f3f6                                                 |
| header-min-height | 头部区域最小高度。仅当未指定 header 插槽未指定内容时有效。      | string | 32px                                                    |
| left-width        | 左侧区域宽度                                                    | string | 25%                                                     |
| left-width-sm     | 左侧区域宽度                                                    | string | 100%                                                    |
| right-width       | 右侧区域宽度                                                    | string | 25%                                                     |
| right-width-sm    | 右侧区域宽度                                                    | string | 100%                                                    |
| center-margin     | 中间区域边距                                                    | string | 0 8px                                                   |
| center-margin-sm  | 屏幕小于 768 时，中间区域边距                                   | string | -                                                       |
| display           | 显示哪些区域。只要将要显示的区域设置成 true，不显示的不用设置。 | object | {header: true, footer: true, left: true, right: true}   |
| display-sm        | 屏幕小于 768 时，显示哪些区域                                   | object | {header: true, footer: true, left: false, right: false} |

## 登录框（login）

可指定用户名框、密码、验证码是否可见。

### 使用

同时支持组件调用和函数调用两种方式

(1) 组件调用

```template
<tms-login :on-success="fnOnSuccess" on-fail="fnOnFail"></tms-login>
```

```js
import Vue from 'vue'
import { Login } from 'tms-vue-ui'
Vue.use(Login, { schema, fnGetCaptcha, fnGetToken })
```

(2) 函数调用

```js
import Vue from 'vue'
import { Login } from 'tms-vue-ui'

const login = new Login(schema, fnGetCaptcha, fnGetToken)

let confirm = new Vue(login.component)
confirm.showAsDialog().then(fnOnSuccess)
```

| 参数         | 说明                                | 类型     | 默认值 | 备注                                       |
| ------------ | ----------------------------------- | -------- | ------ | ------------------------------------------ |
| schema       | 给后台传递的键和配置                | Array    | -      |                                            |
| fnGetCaptcha | 获得验证码的回调函数，返回 promise  | function | -      | {code: "0", msg: "\*\*", result:值为 svg } |
| fnGetToken   | 获得 token 的回调函数，返回 promise | function | -      | -                                          |

### 属性（props）

通过组件调用时，支持以下 Props：

| 参数       | 说明                      | 类型     | 默认值 |
| ---------- | ------------------------- | -------- | ------ |
| on-success | 获取 token 成功的回调函数 | Function | -      |
| on-fail    | 获取 token 失败的回调函数 | Function | -      |

```javascript
schema: [
  {
    // 当前双向绑定的属性名
    key: 'uname',
    // 组件类型
    type: 'text',
    placeholder: '用户名'
  },
  {
    key: 'password',
    type: 'password',
    placeholder: '密码'
  },
  {
    key: 'pin',
    type: 'code',
    placeholder: '验证码'
  }
]
```

## JSONSchema 编辑器（json-schema）

编辑 json-schema 的编辑器。

```js
import { JsonSchema } from 'tms-vue-ui'
```

```html
<tms-json-schema :schema="jsonSchema"></tms-json-schema>
```

> 注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变这个对象或数组本身将会影响到父组件的状态。

参考：https://json-schema.org

## json 对象编辑器（json-doc）

根据 json-schema 编辑 json 数据。

```js
import { ElJsonDoc } from 'tms-vue-ui'
```

```html
<tms-el-json-doc :schema="schema" :doc="doc" v-on:submit="jsonDocSubmit"></tms-el-json-doc>
```

必须传入 schema 对象。

name
type
visible

参考：https://json-schema.org

## 在线组件（comp-online）

显示`tms-vue`中的`runtime-lib`加载的组件。

```js
import { CompOnline } from 'tms-vue-ui'
```

```html
<comp-online :url="url" :includeCss="includeCss" :props="onlineProps" :events="onlineEvents"></comp-online>
```

### 属性（props）

通过组件调用时，支持以下 Props：

| 属性       | 说明                                                   | 类型    | 默认值 |
| ---------- | ------------------------------------------------------ | ------- | ------ |
| url        | 在线组件的地址，参考：`runtime-lib`。                  | String  | -      |
| includeCss | 是否包含 css 文件。                                    | Boolean | -      |
| props      | 在线组件的接收的属性（和 Vue 组件中的 props 对应）。   | Object  | -      |
| events     | 在线组件事件名称的数组，这些事件会通过`emit`向外抛出。 | Array   | -      |

## 数组输入（array-input）

输入一组数据。

```js
import { ArrayInput } from 'tms-vue-ui'
```

```html
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
```

### 属性（props）

通过组件调用时，支持以下 Props：

| 属性  | 说明                 | 类型  | 默认值 |
| ----- | -------------------- | ----- | ------ |
| lines | 需要处理的数组数据。 | Array | -      |

### 事件

通过组件调用时，支持以下 Props：

| 属性 | 说明                   | 参数 |
| ---- | ---------------------- | ---- |
| add  | 请求向数组添加新元素。 | -    |

### 插槽

| 名称     | 说明                   | 属性 | 默认值 |
| -------- | ---------------------- | ---- | ------ |
| default  | 指定显示一行数据的模板 | line | -      |
| add      | 添加一行数据按钮的文字 | -    | 添加   |
| empty    | 清空所有数据按钮的文字 | -    | 清空   |
| remove   | 删除一行数据按钮的文字 | -    | 删除   |
| moveup   | 上移一行数据按钮的文字 | -    | 上移   |
| movedown | 下移一行数据按钮的文字 | -    | 下移   |

### 替换组件

```js
AarryInput.setComponent('layout.root', 'tms-flex', options)
AarryInput.setComponent('button.add', 'el-button', options)
```

| 名称                | 说明                   | 默认值 |
| ------------------- | ---------------------- | ------ |
| button.add          | 添加一行数据按钮的文字 | button |
| button.empty        | 清空所有数据按钮的文字 | button |
| button.remove       | 删除一行数据按钮的文字 | button |
| button.moveup       | 上移一行数据按钮的文字 | button |
| button.movedown     | 下移一行数据按钮的文字 | button |
| layout.root         | 组件根元素             | div    |
| layout.lines        | 数组数据展示区         | div    |
| layout.line         | 单行数组数据展示区     | div    |
| layout.line-slots   | 单行数据展示区         | div    |
| layout.line-buttons | 单数数据操作按钮区     | div    |
| layout.bottom       | 数组操作按钮区         | div    |

`options`参数请参考`Vue`官网文档。参考：https://cn.vuejs.org/v2/guide/render-function.html#深入数据对象
