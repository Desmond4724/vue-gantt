<template>
	<div class="task-box-layer" :style="{left: left + 'px', width: width + 'px'}">

	</div>
</template>


<script>
import './task-box-layer.scss'
export default {
	name: 'TaskBoxLayer',
	props: {
		width: Number,
		left: Number
	}
}
</script>