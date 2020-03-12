# JSONSchema 编辑器（json-schema）

编辑 json-schema 的编辑器。

```js
import { JsonSchema } from 'tms-vue-ui'
```

```html
<tms-json-schema :schema="jsonSchema"></tms-json-schema>
```

> 注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变这个对象或数组本身将会影响到父组件的状态。

参考：https://json-schema.org
