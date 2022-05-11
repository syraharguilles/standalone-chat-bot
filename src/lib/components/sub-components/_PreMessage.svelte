<script>
    import '$lib/scss/message-item/_base.scss';
    import { MESSAGES } from '$lib/js/utils/constants.js';

    let chatSupportProfileName='John Doe';
	let chatSupportProfileImage='https://storage.needpix.com/rsynced_images/male-teacher-cartoon.jpg';
</script>

<div class="message-item">
    <div class="message-item__profile">
        <div class="message-item__profile-time"></div>
            <img class="message-item__profile-image" src="{chatSupportProfileImage}" alt=""/>
        <div class="message-item__profile-messages">
            {#each MESSAGES.PRE_GREETING as message}
                <p class="message-item__message">{message}</p>
            {/each}
        </div>
    </div>
</div>