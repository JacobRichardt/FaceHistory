<template lang="pug">
	.home
		ImageImport(@imagesReady="imagesReady")
		VideoConverter(:images="images")
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator"
	import ImageImport from "@/components/ImageImport.vue"
	import VideoConverter from "@/components/VideoConverter.vue"

	@Component({components: {ImageImport, VideoConverter}})
	export default class Home extends Vue {
		public images: ImageBitmap[] | null = null


		public imagesReady(images: ImageBitmap[]): void {
			this.images = images
		}
	}
</script>
