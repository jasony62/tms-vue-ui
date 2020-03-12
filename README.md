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

[弹性布局（flex）](doc/flex.md)

[卡片（card）](doc/card.md)

[文本（text）](doc/text.md)

[布局框（frame）](doc/frame.md)

[登录框（login）](doc/login.md)

[JSONSchema 编辑器（json-schema）](doc/json-schema.md)

[json 文档编辑器（json-doc）](doc/json-doc.md)

[在线组件（comp-online）](doc/comp-online.md)

[对象输入（object-input）](doc/object-input.md)
