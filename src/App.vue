<template>
  <router-view/>
</template>
<style src="./assets/css/index.css"></style>
<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {ArrowLeftIcon} from "tdesign-icons-vue-next";
import {MessagePlugin} from "tdesign-vue-next";

@Options({
  components: {

  },
  methods: {
  },
})
export default class App extends Vue {
}

</script>