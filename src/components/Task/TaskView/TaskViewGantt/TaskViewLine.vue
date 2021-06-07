<template>
	<div class="gantt_task_link" data-link-id="CUARNW" link_id="CUARNW" aria-label="Link Build gantt (end) dto (start) ">
		<!--		<div class="gantt_line_wrapper" style="top: 42.5px; left: 1261px; height: 20px; width: 32px;">-->
		<!--			<div class="gantt_link_line_right" style="height: 2px; width: 14px; margin-top: 9px; margin-left: 9px;"></div>-->
		<!--		</div>-->
		<!--		<div class="gantt_line_wrapper" style="top: 42.5px; left: 1273px; height: 55px; width: 20px;">-->
		<!--			<div class="gantt_link_line_down" style="height: 37px; width: 2px; margin-top: 9px; margin-left: 9px;"></div>-->
		<!--		</div>-->
		<!--		<div class="gantt_line_wrapper" style="top: 77.5px; left: 1273px; height: 20px; width: 231px;">-->
		<!--			<div class="gantt_link_line_right" style="height: 2px; width: 213px; margin-top: 9px; margin-left: 9px;"></div>-->
		<!--		</div>-->
		<!--		<div class="gantt_link_arrow gantt_link_arrow_right" style="top: 84.5px; left: 1494px;"></div>-->

		<div class="gantt_line_wrapper" style="top: 0; left: 450px; height: 20px; width: 32px;">
			<div class="gantt_link_line_left" style="height: 2px; width: 22px; margin-top: 9px; margin-left: 9px;"></div>
		</div>
		<div class="gantt_line_wrapper" style="top: 0; left: 450px; height: 55px; width: 20px;">
			<div class="gantt_link_line_down" style="height: 40px; width: 2px; margin-top: 9px; margin-left: 9px;"></div>
		</div>
		<div class="gantt_line_wrapper" style="top: 40px; left: 450px; height: 20px; width: 231px;">
			<div class="gantt_link_line_right" style="height: 2px; width: 20px; margin-top: 9px; margin-left: 9px;"></div>
		</div>
		<div class="gantt_link_arrow gantt_link_arrow_right" style="top: 46px; left: 475px;"></div>

	</div>
</template>

<script>
export default {
	name: 'TaskViewLine'
}
</script>

<style lang="scss">
.gantt_task_link {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	cursor: pointer;
}

.gantt_line_wrapper {
	position: absolute;
}

.gantt_line_wrapper div {
	background: red;
}


.gantt_task_link .gantt_link_arrow_right {
	width: 0;
	height: 0;
	margin-top: -3px;
	border-top: 6px solid transparent;
	border-bottom: 6px solid transparent;
	border-left: 6px solid red;
}

.gantt_link_arrow {
	position: absolute;
}

.gantt_task_link:hover .gantt_line_wrapper div {
	--theme-main-color: red;
	box-shadow: 0 0 5px 0 var(--theme-main-color);
}

</style>