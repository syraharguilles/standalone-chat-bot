import 'bootstrap/dist/css/bootstrap.min.css';

import ChatApp from './ChatApp.svelte';

const chatApp = new ChatApp({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default chatApp;