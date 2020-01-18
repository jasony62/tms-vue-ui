# tms-vue-ui

## 运行和打包

运行演示程序，需执行`cnpm i vue`（注意不要-S 或-D）。

运行演示程序，需执行`cnpm i vant`（注意不要-S 或-D）。

执行`yarn serve`启动演示程序。

执行`yarn build`编译组件库。

## 在项目中使用

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

```js
import Vue from 'vue'
import { Login } from 'tms-vue-ui'
Vue.use(Login, { fnGetCaptcha, fnGetToken })
```

| 参数         | 说明                               | 类型     | 默认值 | 备注                                       |
| ------------ | ---------------------------------- | -------- | ------ | ------------------------------------------ |
| fnGetCaptcha | 获得验证码的回调函数，返回 promise | function | -      | {code: "0", msg: "\*\*", result:值为 svg } |
| fnGetToken   | 获得token的回调函数，返回 promise | function | -      | -                                          |

### 属性（props）

| 参数   | 说明                 | 类型     | 默认值 |
| ------ | -------------------- | -------- | ------ |
| data   | 给后台传递的键和配置 | Array    | -      |
| submit | 回调函数             | Function | -      |

```javascript
data: [
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

## json-schema 编辑器

## json 编辑器
