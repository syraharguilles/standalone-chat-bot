<script>
	import Header from '$components/message-header/MessageHeader.svelte';
	import '../app.css';

</script>

<main>
	<slot />
</main>

<style>
	main {
		margin: 0 auto;
		padding: 0;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
