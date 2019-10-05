<template>
	<div class="hello">
		<tms-card id="myCard" thumb="/images/123.jpg" desc="tms-card-desc">
			<template slot="title">
				<b>tms-card-title</b>
			</template>
			<template slot="desc">
				<span style="color:grey;">tms-card-desc</span>
			</template>
		</tms-card>
	</div>
</template>

<script>
import Vue from 'vue'
import { Flex, Card } from '../../lib'
import '../../lib/flex/style'
import '../../lib/card/style'
Vue.use(Flex).use(Card)

export default {
	name: 'HelloJsx'
}
</script>

<style>
#myCard img {
	width: 100px;
	height: 100px;
}
</style>
