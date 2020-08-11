/**
 * 控制题目关联选项的显示
 */
/* type: {
	title: '活动性质',
	type: 'array',
	minItems: 2,
	maxItems: 3,
	enum: [{
		"label": "美食/餐厅线上活动",
		"value": "a",
		"group": "v1"
	}, {
		"label": "地推活动",
		"value": "b",
		"group": "v1"
	}, {
		"label": "线下主题活动",
		"value": "c"
	}, {
		"label": "单纯品牌曝光",
		"value": "d"
	}],
	enumGroups: [{
		"id": "v1",
		"label": "分组1",
		"assocEnum": {
			"property": "resouce",
			"value": "1"
		}
	}]
}, */
function fnToggleAssocOptions(properties, oRecordData) {
	Object.entries(properties).forEach(([oSchemaKey, oSchema]) => {
    // 如果有设置分组
		if (oSchema.enum && oSchema.enum.length && oSchema.enumGroups && oSchema.enumGroups.length ) {
      // 遍历分组信息
      oSchema.enumGroups.forEach(function (enumGroup) {
        // 如果有设置关联的属性和值
				if (enumGroup.assocEnum && enumGroup.assocEnum.property && enumGroup.assocEnum.value) {
          // 如果记录中的该属性的值与被关联的值 不等
          if ($parse(enumGroup.assocEnum.property)(oRecordData) !== enumGroup.assocEnum.value) {
            // 遍历所有的现象
            oSchema.enum.forEach(function (oOption) {
              var domOption
              // 如果有设置分组信息
							if (oOption.group && oOption.group === enumGroup.id) {
                // 如果为单选且配置为S 就从父节点删除该选项
                if (oSchema.type === 'string' && oSchema.enum && oSchema.enum.length && oConfig.component === 'S') {
									domOption = document.querySelector(
										'option[name="data.' +
										oSchemaKey +
										'"][value=' +
										oOption.value +
										']'
									)
									if (domOption && domOption.parentNode) {
										domOption.parentNode.removeChild(domOption)
									}
								} else {
									if (oSchema.type === 'string' && oSchema.enum && oSchema.enum.length) {
										domOption = document.querySelector(
											'input[name=' +
											oSchemaKey +
											'][value=' +
											oOption.value +
											']'
										)
									} else if (oSchema.type === 'array' && oSchema.enum && oSchema.enum.length) {
										domOption = document.querySelector(
											'input[ng-model="data.' +
											oSchemaKey +
											'.' +
											oOption.value +
											'"]'
										)
                  }
                  // 给当前选项的父节点li元素添加option-hide属性
									if (domOption && (domOption = domOption.parentNode)) {
										domOption.classList.add('option-hide')
									}
								}
								if (oSchema.type === 'single') {
                  // 如果该题的值与当前选项一样，则把该题的值置为空
									if (oRecordData[oSchema.id] === oOption.v) {
										oRecordData[oSchema.id] = ''
									}
								} else {
									if (
										oRecordData[oSchema.id] &&
										oRecordData[oSchema.id][oOption.v]
									) {
										delete oRecordData[oSchema.id][oOption.v]
									}
								}
							}
						})
					} else {
						oSchema.ops.forEach(function (oOption) {
							var domOption, domSelect
							if (oOption.g && oOption.g === oOptGroup.i) {
								if (oSchema.type === 'single' && oConfig.component === 'S') {
									domSelect = document.querySelector(
										'select[ng-model="data.' + oSchema.id + '"]'
									)
									if (domSelect) {
										domOption = domSelect.querySelector(
											'option[name="data.' +
											oSchema.id +
											'"][value=' +
											oOption.v +
											']'
										)
										if (!domOption) {
											domOption = document.createElement('option')
											domOption.setAttribute('value', oOption.v)
											domOption.setAttribute('name', 'data.' + oSchema.id)
											domOption.innerHTML = oOption.l
											domSelect.appendChild(domOption)
										}
									}
								} else {
									if (oSchema.type === 'single') {
										domOption = document.querySelector(
											'input[name=' +
											oSchema.id +
											'][value=' +
											oOption.v +
											']'
										)
									} else if (oSchema.type === 'multiple') {
										domOption = document.querySelector(
											'input[ng-model="data.' +
											oSchema.id +
											'.' +
											oOption.v +
											'"]'
										)
									}
									if (domOption && (domOption = domOption.parentNode) && (domOption = domOption.parentNode)	) {
										domOption.classList.remove('option-hide')
									}
								}
							}
						})
					}
				}
			})
		}
	})
}