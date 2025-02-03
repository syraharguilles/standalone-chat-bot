<script>
	let chatSupportProfileName='Alex';
</script>

<header class="message-header">
    <div class="message-header__profile">
        <img class="message-header__profile-image" src="images/profile-pic.png" alt=""/>
        <span class="message-header__profile-status"></span>
    </div>
    <div class="message-header__profile-name">{chatSupportProfileName} - LegalMatch ChatBot Support</div>
</header>

<style>
	.message-header {
		align-items: center; /* Vertical */
		background-color: #0b287e;
		color: #fff;
		display: flex;
		padding: 10px;
	}
	.message-header__profile {
		padding-right: 15px;
		position: relative;
	}
	.message-header__profile-image {
		border: 2px solid #fff;
		border-radius: 50%;
		height: 36px;
		object-fit: cover;
		width: 36px;
	}
	.message-header__profile-status {
		border: 2px solid #fff;
		border-radius: 50%;
		background-color: #62ee53;
		bottom: 0;
		display: block;
		height: 10px;
		position: absolute;
		right: 14px;
		width: 10px;
	}
</style>
