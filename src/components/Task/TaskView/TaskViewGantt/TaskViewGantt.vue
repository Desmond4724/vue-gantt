<template>
	<div class="gant-task">
		<div class="gant-task__scale" :style="{width: table.allWidth + 'px'}">
			<div class="gant-task__scale__line" style="height: 22px;">
				<div
					v-for="(item) in table.topCells"
					class="gant-task__scale__cell"
					:style="{left: item.left + 'px', width: item.width + 'px'}"
				>{{ item.text }}
				</div>
			</div>
			<div class="gant-task__scale__line" style="height: 22px;">
				<div
					v-for="(item) in table.bottomCells"
					:class="['gant-task__scale__cell']"
					:style="{width: item.width+'px', left: item.left + 'px', top: item.top + 'px+'}">{{ item.text }}
				</div>
			</div>
		</div>
		<div class="gant-task__area" :style="{width: table.allWidth + 'px'}">
			<div class="task-content">
				<div :class="['task-content__row', {'task-content__row-add': index % 2 === 0}]"
				     :key="task.id"
				     v-for="(task, index) in tasks">
					<TaskBox
						:startArea="start"
						:start="task.startDate"
						:end="task.endDate"
						@moved="changeLayer"
						@change-size:finished="clearLayer"
						@moving:finished="onMovedTask"
						:title="task.title"
					/>
				</div>
			</div>
			<task-box-layer
				:width="layer.width"
				:left="layer.left"
			/>
			<task-view-link/>
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
import firstOfDay from "@/utils/date-fns/firstDayOfMonth";
import TaskViewLink from "@/components/Task/TaskView/TaskViewGantt/TaskViewLink";

const id = ((id) => {
	return () => id++
})(1)

export default {
	name: 'TaskViewGantt',
	components: {TaskViewLink, TaskBoxLayer, TaskBox},
	setup() {
		const layer = ref({
			width: 0,
			left: 10
		})
		const start = ref(firstOfDay(new Date()))
		const end = ref(
			firstOfDay(add(new Date(), {
				days: 60
			}))
		)
		return {
			layer,
			start,
			end,
			table: montView(start.value, end.value),
			tasks: /*new Array(1000).fill(null).map(() => {
				return {
					id: id(),
					title: Faker.name.findName(),
					startDate: new Date(),
					endDate: add(new Date(), {days: 10})
				}
			})*/
				[
					{
						id: id(),
						title: Faker.name.findName(),
						startDate: new Date(),
						endDate: add(new Date(), {days: 10})
					},
					{
						id: id(),
						title: Faker.name.findName(),
						startDate: new Date(),
						endDate: add(new Date(), {days: 3})
					},
					{
						id: id(),
						title: Faker.name.findName(),
						startDate: new Date(),
						endDate: add(new Date(), {days: 4})
					}
				],
		}
	},
	methods: {
		onMovedTask(e) {
			this.clearLayer()
		},
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