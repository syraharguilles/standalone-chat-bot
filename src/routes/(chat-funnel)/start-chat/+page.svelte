<script>
	import {
		onMount,
	} from "svelte";	

	import { goto } from "$app/navigation";

	import {createChatBotMessage} from "../../../utils/helper";

	import { stepsCompleted, updateStepsCompleted } from '$lib/stores/stepsCompleted.js';

	import ChatBot from '$components/chatbot/ChatBot.svelte';

	import { MESSAGES } from '../../../defaults/messages';
	
	import Time from '$components/message-time/MessageTime.svelte';
	import Footer from '$components/message-footer/MessageFooter.svelte';
	import StartButton from '$components/start-button/StartButton.svelte';

	export let data;

	const hasData = data.data == null ? true : false;

	const config = {
        botName: 'chatBot'
    }

	let steps = JSON.parse($stepsCompleted);

	const message = {
		Title: '',
		List: MESSAGES.PRE_GREETING
	}

	if (steps.openChat) {
		config.initialMessages = [createChatBotMessage('p', 'PRE_GREETING', message)];
	}

	export const startButtonClick = async (event) => {

		if (hasData) {
			if (data.data.supCatIds.length || data.data.chosenCat.length) {
			
				const setStartChat = {
					startChat: true
				}

           		updateStepsCompleted(setStartChat);

				goto(`/has-category`);
			}
		}

		if (!hasData) {
			const setStartChat = {
				startChat: true
			}

			updateStepsCompleted(setStartChat);

			goto(`/has-no-category`);
		}
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Time />

<ChatBot config={config}/>

<Footer>
	<div slot="footer">
		<StartButton on:click={startButtonClick}/>
	</div>
</Footer>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
