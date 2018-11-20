<template lang="pug">
	v-app
		v-toolbar(app)
			v-toolbar-title(class="headline text-uppercase")
				span Face History
			v-spacer
		v-content
			v-container
				router-view
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator"
	import Home from "@/views/Home.vue"

	@Component({components: {Home}})
	export default class App extends Vue {

	}
</script>
