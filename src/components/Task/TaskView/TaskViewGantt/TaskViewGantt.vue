<template>
	<div class="gant-task">
		<div class="gant-task__scale" style="width: 3000px;">
			<div class="gant-task__scale__line" style="height: 22px;">
				<div
					v-for="(item) in table.topCells"
					class="gant-task__scale__cell"
					:style="{left: item.left, width: item.width}"
				>{{ item.text }}
				</div>
			</div>
			<div class="gant-task__scale__line" style="height: 22px;">
				<div
					v-for="(item) in table.bottomCells"
					:class="['gant-task__scale__cell']"
					:style="{width: item.width, left: item.left, top: item.top}">{{ item.text }}
				</div>
			</div>
		</div>
		<div class="gant-task__area" style="width: 3000px;">
			<div class="task-content">
				<div :class="['task-content__row', {'task-content__row-add': index % 2 === 0}]"
				     :key="task.id"
				     v-for="(task, index) in tasks">
					<TaskBox
						@moved="changeLayer"
						@change-size:finished="clearLayer"
						@moving:finished="clearLayer"
						:title="task.title"
					/>
				</div>
			</div>
			<task-box-layer
				:width="layer.width"
				:left="layer.left"
			/>
		</div>
	</div>
</template>


<script>
import {montView} from "./taskFaker";
import Faker from 'faker'
import TaskBox from "@/components/Task/TaskView/TaskViewGantt/TaskBox";
import TaskBoxLayer from "@/components/Task/TaskView/TaskViewGantt/TaskBoxLayer";
import {ref} from 'vue'
import add from "date-fns/add";

const id = ((id) => {
	return () => id++
})(1)

export default {
	name: 'TaskViewGantt',
	components: {TaskBoxLayer, TaskBox},
	setup() {
		const layer = ref({
			width: 0,
			left: 10
		})
		return {
			layer,
			table: montView(),
			tasks: new Array(1000).fill(null).map(() => {
				return {
					id: id(),
					title: Faker.name.findName(),
					startDate: new Date(),
					endDate: add(new Date(), {days: 10})
				}
			})
		}
	},
	methods: {
		changeLayer(e) {
			this.layer = e
		},
		clearLayer() {
			this.layer = {
				width: 0,
				left: 0
			}
		}
	}
}
</script>

<style lang="scss" src="./style.scss" scoped></style>