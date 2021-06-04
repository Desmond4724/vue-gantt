<template>
	<div
		:title="title"
		ref="wrap"
		:style="{width: width + 'px', left: left + 'px'}"
		@mousedown="onMouseDown"
		@click="$emit('click:task', $event)"
		class="task-box">
		{{ title }}
		<task-box-handle
			:left="left"
			:width="width"
			@change-size:finished="$emit('change-size:finished')"
			@change-size="changeSize"
			class="task-box__handle-left"
		/>
		<task-box-handle
			:left="left"
			isRightHandle
			:width="width"
			@change-size:finished="$emit('change-size:finished')"
			@change-size="changeSize"
			class="task-box__handle-right"
		></task-box-handle>
	</div>
</template>

<script>
import './task-box.scss'
import TaskBoxHandle from "@/components/Task/TaskView/TaskViewGantt/TaskBoxHandle";

let current = {
	startX: 0,
	target: null
}

export default {
	name: 'TaskBox',
	props: {
		title: {
			type: String
		}
	},
	emits: [
		"moving:started",
		"moved",
		"moving:finished",
		"change-size:finished",
		"click:task"
	],
	data() {
		return {
			width: 180,
			left: 0
		}
	},
	components: {TaskBoxHandle},
	methods: {
		changeSize(val) {
			this.width = val.width
			this.left = val.left
			this.$emit('moved', {width: this.width, left: val.left})
		},
		onMouseUp() {
			document.removeEventListener('mousemove', this.onMouseMove)
			document.removeEventListener('mouseup', this.onMouseUp)
			current = {
				startX: 0,
				target: null
			}
			this.$emit('moving:finished')
		},
		onMouseMove(e) {
			const {clientX} = e
			const left = (clientX + current.startX)
			current.target.style.left = left + 'px'
			this.left = left
			this.$emit('moved', {width: this.width, left})
		},
		onMouseDown(e) {
			document.addEventListener('mousemove', this.onMouseMove)
			document.addEventListener('mouseup', this.onMouseUp)
			current = {
				startX: e.target.offsetLeft - e.clientX,
				target: e.target
			}
			this.$emit('moving:started')
		}
	}
}
</script>