<script>
    
    import { state, updateState } from '$lib/stores/state';

    import MessageChatbot from '$components/message-chatbot/MessageChatbot.svelte';
    import MessageClient from '$components/message-client/MessageClient.svelte';
    import MessageBottom from '$components/message-bottom/MessageBottom.svelte';

    let stateMessage = JSON.parse($state);
    
</script>

<!-- Will accept config, state -->
{#if stateMessage}
    {#each stateMessage.messages as message}
        <!-- Chatbot Message -->
        {#if message.type === "bot"}
            <MessageChatbot messageType={message.messageType} messageObjType={message.messageObjType} messages={message.message}/>
        {/if}

        <!-- User Message -->
        {#if message.type === "user"}
            <MessageClient messageType={message.messageType} messageObjType={message.messageObjType} messages={message.message}/>
        {/if}

        <!-- User Field -->
        {#if message.type === "field"}
            <MessageBottom messageType={message.messageType} messageObjType={message.messageObjType} messages={message.message}/>
        {/if}
   {/each}
{/if} 
