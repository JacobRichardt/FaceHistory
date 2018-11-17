<template lang="pug">
	.home
		ImageImport
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator"
	import ImageImport from "@/components/ImageImport.vue"

	@Component({components: {ImageImport}})
	export default class Home extends Vue {

	}
</script>
