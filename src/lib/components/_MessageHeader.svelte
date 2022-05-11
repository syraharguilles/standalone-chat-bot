<script>
    import '$lib/scss/message-header/_base.scss';

	let chatSupportProfileName='John Doe';
	let chatSupportProfileImage='https://storage.needpix.com/rsynced_images/male-teacher-cartoon.jpg';
</script>

<header class="message-header">
    <div class="message-header__profile">
        <img class="message-header__profile-image" src="{chatSupportProfileImage}" alt=""/>
        <span class="message-header__profile-status"></span>
    </div>
    <div class="message-header__profile-name">{chatSupportProfileName} - LegalMatch ChatBot Support</div>
</header>