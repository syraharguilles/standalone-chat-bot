<script>
    import { onMount } from "svelte";
    import { browser } from '$app/environment';
    
    import { MESSAGES } from '../../defaults/messages';
    import { MESSAGES_CHATBOT_OBJ_TYPE, MESSAGES_CHATCLIENT_OBJ_TYPE } from '../../defaults/messageObjType';

    import { state, updateState } from '$lib/stores/state';

    import { MessageParser } from '$lib/class/MessageParser';
    import { ActionProvider } from '$lib/class/ActionProvider';

    import { getPostData, savePostData } from "../../utils/browserStorage";

    import {createChatBotMessage, createClientMessage} from "../../utils/helper";

    export let messageObj;

    let stateMessage = JSON.parse($state);

    let postData = {
        zip_select: "",
        city_select: "",
        state_select: ""
    };

    onMount(async () => {
        getPostData()
        .then(result => {
            postData = { ...postData, ...result };
        })
        .catch(() => {});
    });

    const isGeoIp = (choice) => {

        // https://svelte.dev/tutorial/updating-arrays-and-objects
        postData.isGeoIp = [...postData.isGeoIp, choice];
        savePostData(postData);

        const LOCATION = choice == 'YES' ? MESSAGES_CHATCLIENT_OBJ_TYPE.IS_GEOLOCATION_YES : MESSAGES_CHATCLIENT_OBJ_TYPE.IS_GEOLOCATION_YES;

        const message = {
            Title: "",
            List: {
                choice
            }
        }

        stateMessage.messages = [...stateMessage.messages, createClientMessage("p", LOCATION, message)];

        const ActionProviderInstance = new ActionProvider(stateMessage);

        const MessageParserInstance = new MessageParser(ActionProviderInstance);
        
        updateState(stateMessage);

        const parseObj = {
            choice: message.List,
            type: LOCATION
        }

        if(choice == 'YES') {
            MessageParserInstance.parseGeoLocation(parseObj);
        }

        if(choice == 'NO') {
            MessageParserInstance.parseConsumerLocation(parseObj);
        }

        // MessageParserInstance.parseSupCategoryList(parseObj);

        state.subscribe( (value) => {

            if (browser) {
                window.localStorage.setItem('MESSAGE', value);
            }
        });
    };
</script>

<p class="message-item__message">{messageObj.messageTitle}</p>

<style>
    .message-item__message {
        background-color: #e9eff5;
        padding: 5px;
        border-radius: 5px;
        margin: 0 0 10px 0;
    }
</style>