<script>
    import { MESSAGES_CHATBOT_OBJ_TYPE } from '../../../defaults/messageObjType';

    import {createChatBotMessage} from "../../../utils/helper";

    import ChatBot from '$components/chatbot/ChatBot.svelte';

    export let data;

    let isDataLoaded = false;
    let primaryCatData = [];

    if (data.categories.length > 1) {
        isDataLoaded = true;
    }

    primaryCatData = data.categories;

    const message = {
		Title: "Select an area of law",
		List: primaryCatData
	}

    const config = {
        initialMessages: [createChatBotMessage("l", MESSAGES_CHATBOT_OBJ_TYPE.AREA_OF_LAW_LIST, message)]
    }

</script>
<svelte:head>
	<title>No Category</title>
	<meta name="description" content="No Category" />
</svelte:head>

<div class="content">

    <h1>No Category</h1>

    {#if isDataLoaded}
        <ChatBot config={config}/>
    {/if}
    
    <p>ask case summary</p>
    <p>ask level experience</p>
    <p>ask how will you pay</p>
    <p>ask client details</p>
    <p>closing</p>
</div>
