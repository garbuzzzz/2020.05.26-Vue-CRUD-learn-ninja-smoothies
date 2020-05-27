<template>
  <div id="app">
		<Navbar />
    <router-view/>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar'
export default {
	name: 'App',
	data() {
		return {}
	},
	components: {
		Navbar,
	}
}
</script>
<style>

</style>
