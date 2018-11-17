<template>
	<v-app>
		<v-toolbar app>
			<v-toolbar-title class="headline text-uppercase">
				<span>Face History</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
		</v-toolbar>
		<v-content>
			<Home/>
		</v-content>
	</v-app>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator"
	import Home from "@/views/Home.vue"

	@Component({components: {Home}})
	export default class App extends Vue {

	}
</script>
