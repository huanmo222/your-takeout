<template>
  <div id="app">
    <v-header></v-header>
    <v-tab></v-tab>
    <router-view/>
  </div>
</template>

<script>
import VHeader from './components/header/Header'
import VTab from './components/tab/Tab'
export default {
  name: 'App',
  components: {
    VHeader,
    VTab
  }
}
</script>

<style>

</style>
