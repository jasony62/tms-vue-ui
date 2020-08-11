/**
 * 控制关联题目的可见性
 */
/* dependencies: {
	online: {
		rules: {
			resource: '1',
		},
		operator: 'and',
	},
	offline: {
		rules: {
			resource: '2',
		},
		operator: 'and',
	},
}, */
function fnToggleAssocSchemas(schema, oRecordData) {
	if (schema.dependencies) {
		const dependencies = schema.dependencies
		Object.entries(dependencies).forEach(([key, val]) => {
			var domSchema = document.querySelector(
				'[wrap=input][schema="' +
					key +
					'"],[wrap=html][schema="' +
					key +
					'"]'
			)
			if (domSchema) {
				if (val.rules) {
					var bVisible = this.getSchemaVisible(val, oRecordData)
					domSchema.classList.toggle('hide', !bVisible)
					val.visibility.visible = bVisible
					/* 被隐藏的题目需要清除数据 */
					if (false === bVisible) {
						$parse(key).assign(oRecordData, undefined)
					}
				}
			}
		})
	}
}
this.getSchemaVisible = function (config, oRecordData) {
	var bVisible,  oRuleVal
	if (config.operator==='and') {
		bVisible = false
		Object.entries(config.rules).forEach(([key, value]) => {
			oRuleVal = $parse(key)(oRecordData)
			if (oRuleVal) {
				if (oRuleVal === value || oRuleVal[value]) {
					bVisible = true
					break
				}
			}
		})
	} else if (config.operator==='or'){
		bVisible = true
		Object.entries(config.rules).forEach(([key, value]) => {
			oRuleVal = $parse(key)(oRecordData)
			if (!oRuleVal || (oRuleVal !== value && !oRuleVal[value])) {
				bVisible = false
				break
			}
		})
	}
	return bVisible
}