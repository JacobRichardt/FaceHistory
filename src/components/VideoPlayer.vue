<template lang="pug">
	v-card.videoPlayer
		v-container
			v-btn(v-if="videoUrl" :href="videoUrl" :download="'faceHistoryVideo.' + videoExtension" block) Download {{videoExtension}} video
			video(v-if="videoUrl" :src="videoUrl" controls)
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator"

	@Component({components: {}})
	export default class VideoPlayer extends Vue {
		@Prop()
		public videoUrl: string | null = null
		@Prop()
		public mimeType: string | null = null

		public get videoExtension(): string {
			return this.mimeType !== null && this.mimeType.indexOf("/") !== -1 ? this.mimeType.substr(this.mimeType.indexOf("/") + 1) : "video"
		}
	}
</script>

<style scoped lang="stylus">

</style>