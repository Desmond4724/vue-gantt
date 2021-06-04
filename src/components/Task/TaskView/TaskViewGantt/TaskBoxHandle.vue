<template>
	<div
		ref="wrap"
		@mousedown="mouseDown"
		class="task-box__handle">
		<svg xmlns="http://www.w3.org/2000/svg" width="5" height="8" fill="none" style="&#10;    background: red;&#10;">
			<path fill-rule="evenodd" clip-rule="evenodd"
			      d="M1 0a1 1 0 100 2 1 1 0 000-2zm3 0a1 1 0 100 2 1 1 0 000-2zM0 4a1 1 0 112 0 1 1 0 01-2 0zm4-1a1 1 0 100 2 1 1 0 000-2zM0 7a1 1 0 112 0 1 1 0 01-2 0zm4-1a1 1 0 100 2 1 1 0 000-2z"
			      fill="#fff"/>
		</svg>
	</div>
</template>


<script>
import useMouseMove from "@/composable/useMouseMove";

let current = {
	target: null,
	startX: 0,
	left: 0
}
export default {
	name: 'TaskBoxHandle',
	setup(props, {emit}) {
		const move = useMouseMove({
			mouseUp: () => {
				current = {
					startX: 0,
					target: null
				}
				emit('change-size:finished')
			},
			mouseMove: (e) => {
				const size = props.isRightHandle ? e.clientX - current.startX : current.startX - e.clientX
				const left = props.isRightHandle ? props.left : current.left - size
				emit('change-size', {width: current.width + size, left})
			},
			mouseDown: (e) => {
				e.stopPropagation()
				current = {
					startX: e.clientX,
					width: props.width,
					left: props.left
				}
				emit('change-size:started')
			}
		})
		return {
			...move
		}
	},
	emits: [
		"change-size:started",
		"change-size",
		"change-size:finished",
	],
	props: {
		width: {
			type: Number
		},
		left: {
			type: Number
		},
		isRightHandle: {
			type: Boolean,
			default: false
		}
	}
}
</script>