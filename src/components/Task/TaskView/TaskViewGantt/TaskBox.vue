<template>
	<div
		:title="title"
		ref="wrap"
		:style="{width: width + 'px', left: left + 'px'}"
		@mousedown="mouseDown"
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
import formatDistanceStrict from 'date-fns/formatDistanceStrict'
import useMouseMove from "@/composable/useMouseMove";
import {ref} from 'vue'

let current = {
	startX: 0,
	target: null
}

export default {
	name: 'TaskBox',
	props: {
		title: {
			type: String
		},
		start: {
			type: Date,
		},
		end: {
			type: Date
		},
		startArea: {
			type: Date
		}
	},
	emits: [
		"moving:started",
		"moved",
		"moving:finished",
		"change-size:finished",
		"click:task"
	],
	setup(props, {emit}) {
		const left = ref(0)
		const columnSize = 80
		const width = ref(80)
		const wrap = ref(null)
		const move = useMouseMove({
			mouseDown(e) {
				current = {
					startX: e.target.offsetLeft - e.clientX,
					target: e.target
				}
				emit('moving:started')
			},
			mouseUp(e) {
				current = {
					startX: 0,
					target: null
				}
				const {left: leftValue} = wrap.value.getBoundingClientRect()
				if (leftValue % columnSize !== 0) {
					const prop = {width: width.value, left: Math.floor(leftValue / columnSize) * columnSize}
					width.value = prop.width
					left.value = prop.left
					emit('moved', prop)
				}
				emit('moving:finished', {
					left: left.value,
					width: width.value
				})
			},
			mouseMove(e) {
				const {clientX} = e
				const leftValue = (clientX + current.startX)
				current.target.style.left = left + 'px'
				left.value = leftValue
				emit('moved', {width: width.value, left})
			}
		})
		return {
			...move,
			columnSize,
			width,
			left,
			wrap
		}
	},
	components: {TaskBoxHandle},
	methods: {
		changeSize(val) {
			this.width = val.width
			this.left = val.left
			this.$emit('moved', {width: this.width, left: val.left})
		}
	},
	created() {
		const distance = parseInt(formatDistanceStrict(this.start, this.end, {
			roundingMethod: 'ceil',
			unit: 'day'
		}))

		const distanceDay = parseInt(formatDistanceStrict(this.startArea, this.start, {
			roundingMethod: 'ceil',
			unit: 'day'
		}))

		this.width = distance * this.columnSize
		this.left = (distanceDay - 1) * this.columnSize
	}
}
</script>