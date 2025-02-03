<script>
    import { onMount } from "svelte";
    import { browser } from '$app/environment';

    import { MESSAGES_CHATCLIENT_OBJ_TYPE } from '../../defaults/messageObjType';

    import { state, updateState } from '$lib/stores/state';

    import { MessageParser } from '$lib/class/MessageParser';
    import { ActionProvider } from '$lib/class/ActionProvider';

    import { getPostData, savePostData } from "../../utils/browserStorage";

    import {createClientMessage} from "../../utils/helper";

    export let messageObj;
    export let selected = {};

    let stateMessage = JSON.parse($state);

    let postData = {
        areaOfLaw: []
    };

    let supCatErrors = [];

    onMount(async () => {
        getPostData()
        .then(result => {
            postData = { ...postData, ...result };
        })
        .catch(() => {});
    });

    const addAreaOfLaw = (id, description) => {
        const parsedId = parseInt(id);

        if (!postData.areaOfLaw.includes(parsedId)) {

            // https://svelte.dev/tutorial/updating-arrays-and-objects
            postData.areaOfLaw = [...postData.areaOfLaw, parsedId];
            savePostData(postData);
            supCatErrors = [];

            const message = {
                Title: "",
                List: {
                    id: parsedId,
                    description: description
                }
            }

            stateMessage.messages = [
                ...stateMessage.messages, 
                createClientMessage("p", MESSAGES_CHATCLIENT_OBJ_TYPE.AREA_OF_LAW_IDS, message)];

            const ActionProviderInstance = new ActionProvider(stateMessage);

            const MessageParserInstance = new MessageParser(ActionProviderInstance);
            
            updateState(stateMessage);

            const parseObj = {
                id: parsedId, 
                type: MESSAGES_CHATCLIENT_OBJ_TYPE.AREA_OF_LAW_IDS
            }

            MessageParserInstance.parseSupCategoryList(parseObj);

            state.subscribe( (value) => {

                if (browser) {
                    window.localStorage.setItem('MESSAGE', value);
                }
            });
        }
    };

</script>

<ul class="list-selection">
    <li class="list-selection-item list-selection-item-title">{messageObj.messageTitle}</li>

    {#each messageObj.messageList as item}
        <li class="list-selection-item" on:click={addAreaOfLaw(item.id, item.description)} value={item.id}>{item.description}</li>
    {/each}
</ul>

<style>
    .list-selection {
        border-radius: 10px;
        border: 1px solid #e9eff5;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .list-selection-item:first-child {
        border-top: none;
    }

    .list-selection-item:first-child:hover {
        background-color: transparent;
    }

    .list-selection-item {
        border-top: 1px solid #e9eff5;
        padding: 10px;
    }

    .list-selection-item:hover {
        background-color: #e9eff5;
    }

    .list-selection-item-title {
        padding: 15px 10px;
    }
</style>