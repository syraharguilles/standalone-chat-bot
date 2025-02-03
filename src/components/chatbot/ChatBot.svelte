<script>
    import { browser } from '$app/environment';
    import { state, updateState } from '$lib/stores/state';

    import Chat from "$components/chat/Chat.svelte";

    export let config;

    const setState = {
        messages: [...config.initialMessages],
        ...config.state,
    }

    let stateMessageUpdating;

    $: stateMessage = stateMessageUpdating;

    updateState(setState);

    state.subscribe( (value) => {

        if (browser) {
            window.localStorage.setItem('MESSAGE', value);

            stateMessageUpdating = value;
        }
    });

</script>

{#key stateMessage}
    <Chat />
{/key}

    