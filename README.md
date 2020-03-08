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

## json 文档编辑器（json-doc）

根据指定的`JSONSchema`编辑 json 数据。

### 属性（props）

通过组件调用时，支持以下 Props：

| 参数               | 说明                             | 类型    | 默认值 |
| ------------------ | -------------------------------- | ------- | ------ |
| schema             | JSONSchema 定义                  | Object  | -      |
| value              | 要编辑的 json 文档对象           | Object  | -      |
| inputWrappingClass | 输入控件的包括类                 | String  | -      |
| requireButtons     | 是否显示表单操作按钮，例如：提交 | Boolean | true   |
| oneWay             | 传入数据是单向的，不会被修改     | Boolean | true   |

必须传入`schema`对象。支持`v-model`传递要编辑的 json 文档。

### 方法

| 名称    | 说明             | 参数                                                      |
| ------- | ---------------- | --------------------------------------------------------- |
| editing | 返回表单中的数据 | isCheckValidity，返回前是否做合规性检查，不合规返回 false |
| reset   | 恢复数据原始值   | -                                                         |

### 事件

通过组件调用时，支持以下事件：

| 名称   | 说明                   | 参数 |
| ------ | ---------------------- | ---- |
| submit | 选择表单的提交按钮时。 | -    |

参考：https://json-schema.org

### 定制（setComponent 方法）

使用`setComponent`方法替换组件。

| 参数           | 说明                                                              | 类型     | 默认   |
| -------------- | ----------------------------------------------------------------- | -------- | ------ |
| type           | 控件名称                                                          | String   | -      |
| tag            | 组件名称，例如：`el-input`等                                      | String   | -      |
| options        | 传入 `createElement` 函数的组件选项                               | Object   | 空对象 |
| options.native | true 将指定的值添加到`attrs`否则添加到`props`                     | Boolean  | 空对象 |
| options        | 指定为一个函数，将被调用，传入参数`{vm,field,item}`，返回属性设置 | Function | -      |

支持设置的控件及组件：

| 控件名称      | 说明                     | 默认组件 |
| ------------- | ------------------------ | -------- |
| title         | JSONSchema.\$title       | h1       |
| description   | JSONSchema.\$description | p        |
| error         | 错误提示                 | div      |
| form          | -                        | form     |
| label         | -                        | label    |
| input         | -                        | input    |
| textarea      | -                        | textarea |
| radio         | 定义中出现`oneOf`时      | input    |
| radiogroup    | -                        | div      |
| select        | 定义中包含`enum:[]`      | select   |
| option        | select 控件中的选项      | option   |
| checkbox      | -                        | input    |
| checkboxgroup | -                        | div      |
| file          | -                        | input    |
| button        | -                        | div      |
| jsondoc       | -                        | div      |

### 嵌套使用 json-doc

### 返回数据的方式

## json 文档编辑器（element-ui 版）

```js
import { ElJsonDoc } from 'tms-vue-ui'
```

```html
<tms-el-json-doc :schema="schema" :doc="doc" v-on:submit="jsonDocSubmit"></tms-el-json-doc>
```

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

## 对象输入（object-input）

编辑一个对象或数组。

```js
import { ObjectInput } from 'tms-vue-ui'
```

```html
<template>
  <div class="object-input">
    <tms-object-input :value="array" @add="add">
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
```

### 属性（props）

通过组件调用时，支持以下 Props：

| 属性  | 说明                       | 类型         | 默认值 |
| ----- | -------------------------- | ------------ | ------ |
| value | 需要处理的对象或数组数据。 | Object/Array | -      |

### 事件

通过组件调用时，支持以下事件：

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
ObjectInput.setComponent('layout.root', 'tms-flex', options)
ObjectInput.setComponent('button.add', 'el-button', options)
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
