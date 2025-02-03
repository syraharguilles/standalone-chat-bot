<script>
    import { MESSAGES_CHATCLIENT_OBJ_TYPE } from '../../defaults/messageObjType';

    export let messageType;
    export let messageObjType;
    export let messages;
    
    console.log("messages client: ", messages);
</script>

<div class="message-item">
    <div class="message-item__profile-messages" >
        {#if messages && messageType === "p" && messages.messageList.id && messages.messageList.description && (messageObjType !== 'IS_GEOLOCATION_YES' || messageObjType !== 'IS_GEOLOCATION_NO')}
            <!-- {#each messages.messageList as message} -->
                <p class="message-item__message" item-id={messages.messageList.id}>{messages.messageList.description}</p>
            <!-- {/each} -->
        {/if}

        {#if messages && messageType === "p" && (messageObjType === MESSAGES_CHATCLIENT_OBJ_TYPE.IS_GEOLOCATION_YES || messageObjType === MESSAGES_CHATCLIENT_OBJ_TYPE.IS_GEOLOCATION_NO) }
            <!-- {#each messages.messageList as message} -->
                <p class="message-item__message">{messages.messageList.choice}</p>
            <!-- {/each} -->
        {/if}
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

    .message-item__profile-messages {
        display: flex;
        justify-content: flex-end;
    }
</style>