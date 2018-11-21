<template lang="pug">
	.home
		ImageImport(@imagesReady="imagesReady")
		VideoConverter(:images="images" @videoReady="videoReady")
		VideoPlayer(:videoUrl="videoUrl", :mimeType="mimeType")
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator"
	import ImageImport from "@/components/ImageImport.vue"
	import VideoConverter from "@/components/VideoConverter.vue"
	import VideoPlayer from "@/components/VideoPlayer.vue"
	import ImageInfo from "@/components/ImageInfo"

	@Component({components: {ImageImport, VideoConverter, VideoPlayer}})
	export default class Home extends Vue {
		public images: ImageInfo[] | null = null
		public videoUrl: string | null = null
		public mimeType: string | null = null

		public imagesReady(images: ImageInfo[]): void {
			this.images = images
		}

		public videoReady(video: Blob): void {
			if (this.videoUrl !== null)
				URL.revokeObjectURL(this.videoUrl)

			this.videoUrl = URL.createObjectURL(video)
			this.mimeType = video.type
		}
	}
</script>
