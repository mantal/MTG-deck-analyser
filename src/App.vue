<template>
	<div id="app">
		<deck-viewer></deck-viewer>
	</div>
</template>

<script>
	import 'materialize-css/bin/materialize.css'
	import 'materialize-css/bin/materialize.js'
	import DeckViewer from './components/DeckViewer'
	import * as db from './cache';

	export default {
		name: 'app',
		components: {
			DeckViewer
		},
		mounted() {
			db.init();
		}
	}
</script>

<style>
	#app {
	  font-family: 'Avenir', Helvetica, Arial, sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	  text-align: center;
	  color: #2c3e50;
	  margin-top: 60px;
	}
</style>
