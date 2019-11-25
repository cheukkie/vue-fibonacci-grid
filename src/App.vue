<template>
	<div id="app">
		<AppHeader />
		<FibonacciTable :data="getGrid.content" />
		<AppFooter />
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	// TO DO: FIGURE OUT MAPSTATE HELPER + NAMESPACED STORE

	import AppHeader from '@/components/AppHeader.vue';
	import AppFooter from '@/components/AppFooter.vue';
	import FibonacciTable from '@/components/FibonacciTable.vue';

	export default {
		name: 'app',
		data: function () {
			return {
			}
		},
		mounted: function () {
			this.setupGrid();
		},
		methods: {
			...mapActions(['setupGrid']),
		},
		computed: {
			...mapGetters(['getGrid']),
		},
		components: {
			AppHeader,
			FibonacciTable,
			AppFooter,
		}
	}
</script>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400,400i&display=swap');

	html {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	*,
	*:before,
	*:after {
		-webkit-box-sizing: inherit;
		-moz-box-sizing: inherit;
		box-sizing: inherit;
	}

	#app {
		font-family: 'IBM Plex Mono', monospace;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;

		display: flex;
		flex-direction: column;
		justify-content: space-between;

		min-height: 100vh;
		padding: 15px;

		font-size: 14px;
	}
	button{
		display: inline-block;
		-webkit-appearance: none;
		border: none;
		background-color: #000000;
		padding: 5px 10px;
		border: solid 1px #ffffff;
		color: #ffffff;
		cursor: pointer;
		
		&:hover{
			color: #000000;
			background-color: #ffffff;
			border-color: #000000;
		}
	}
</style>