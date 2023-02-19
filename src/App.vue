<template>
  <router-view />
  <div class="app-wrapper">
    <h1>title</h1>
    <!-- <img src="./img/screen.png" alt=""> -->
    <div class="app-wrapper">test img</div>
    <div class="image-screen"></div>
    <svg-icon icon-class="test-svg" />
  </div>
</template>

<style lang="scss">
.app-wrapper {
  color: red;

  .image-screen {
    background: url('./img/screen.png');
    width: 500px;
    height: 200px;
    background-size: cover;
  }

}
</style>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'App'
  })
</script>