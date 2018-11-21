<template lang="pug">
	v-card.faceImage
		v-container
			v-icon {{image.isLoaded ? "done" : "autorenew"}}
			span {{image.name}} - {{image.date}}
			v-alert(v-if="image.error !== null" value="true" type="error") {{image.error.message}}
</template>

<script lang="ts">
	import {Component, Prop, Vue} from "vue-property-decorator"
	import ImageInfo from "./ImageInfo"

	@Component({components: {}})
	export default class FaceImage extends Vue {
		@Prop()
		public image!: ImageInfo
	}
</script>

<style scoped>

</style>
