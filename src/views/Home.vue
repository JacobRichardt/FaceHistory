<template>
  <div class="home">
    <ImageImport/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import ImageImport from "@/components/ImageImport.vue"

  @Component({components: {ImageImport}})
  export default class Home extends Vue {

  }
</script>
