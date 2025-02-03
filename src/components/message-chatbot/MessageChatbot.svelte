<script>

    import { MESSAGES_CHATBOT_OBJ_TYPE } from '../../defaults/messageObjType';

    import ListSelection from '$components/list-selection/ListSelection.svelte';
    import ListSelectionBySupCat from '$components/list-selection/ListSelectionBySupCat.svelte';
    import ListSelectionBySubCat from '$components/list-selection/ListSelectionBySubCat.svelte';
    import Message from '$components/message/Message.svelte';
    import MessageLocation from '$components/message/MessageLocation.svelte';
    
    export let selected;
    export let messageType;
    export let messageObjType;
    export let messages;
</script>

<div class="message-item">
    <div class="message-item__profile">
        <img class="message-item__profile-image" src="images/profile-pic.png" alt=""/>
        <div class="message-item__profile-messages">
            {#if messages && messageType === "p" && messageObjType === 'PRE_GREETING'}
                {#each messages.messageList as message}
                    <p class="message-item__message">{message}</p>
                {/each}
            {/if}

            {#if messages && messageType === "l" && messageObjType === MESSAGES_CHATBOT_OBJ_TYPE.AREA_OF_LAW_LIST}
                <ListSelection bind:selected messageObj={messages}/>
            {/if}

            {#if messages && messageType === "l" && messageObjType === MESSAGES_CHATBOT_OBJ_TYPE.SUP_CAT_LIST}
                <ListSelectionBySupCat bind:selected messageObj={messages}/>
            {/if}

            {#if messages && messageType === "l" && messageObjType === MESSAGES_CHATBOT_OBJ_TYPE.CAT_LIST}
                <ListSelectionBySubCat bind:selected messageObj={messages}/>
            {/if}

            {#if messages && messageType === "p" && messageObjType === MESSAGES_CHATBOT_OBJ_TYPE.IS_GEOLOCATION}
                <Message messageObj={messages}/>
            {/if}

            <!-- {#if messages && messageType === "p" && messageObjType === MESSAGES_CHATBOT_OBJ_TYPE.CONSUMERLOCATION}
                <MessageLocation messageObj={messages}/>
            {/if} -->
        </div>
    </div>
</div>

<style>
    .message-item {
        padding: 10px;
    }
    .message-item__message {
        background-color: #e9eff5;
        padding: 5px;
        border-radius: 5px;
        margin: 0 0 10px 0;
    }
    .message-item__profile {display: flex;}
    .message-item__profile-image {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
        object-fit: cover;
    }
</style>