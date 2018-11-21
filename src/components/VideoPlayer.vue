<template lang="pug">
	v-card.videoPlayer
		v-container
			v-btn(v-if="videoUrl" :href="videoUrl" download="faceHistoryVideo.webm" block) Download video
			video(v-if="videoUrl" :src="videoUrl" controls)
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator"

	@Component({components: {}})
	export default class VideoPlayer extends Vue {
		@Prop()
		public videoUrl: string | null = null
	}
</script>

<style scoped lang="stylus">

</style>