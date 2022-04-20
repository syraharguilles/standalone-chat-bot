<script>
// logic goes here
</script>

<style>
/* styles go here */
    .card-body {
		overflow-x: hidden;
        height: 80vh;
		padding: 0;
		position: relative;
	}

	.direct-chat-messages {
		-webkit-transform: translate(0, 0);
		transform: translate(0, 0);
		height: 400px;
		overflow: auto;
		padding: 10px;
		transition: -webkit-transform .5s ease-in-out;
		transition: transform .5s ease-in-out;
		transition: transform .5s ease-in-out, -webkit-transform .5s ease-in-out;
	}
</style>

<!-- markup (zero or more HTML elements) goes here -->
<div class="card-body">
    <div class="direct-chat-messages">
        <!-- {#each messages as message}
            <ChatMessage
                nameMe = {nameMe}
                profilePicMe = {profilePicMe}
                nameChatPartner = {nameChatPartner}
                profilePicChatPartner = {profilePicChatPartner}
                                    message={message.message}
                                  timestamp={message.timestamp}
                                    sentByMe={message.sentByMe} 
                                    timeRead={message.timeRead}
                                    />
        {/each}
                
                <TodayDivider></TodayDivider>
                 {#each todayMessages as todayMessage}
            <ChatMessage
                nameMe = {nameMe}
                profilePicMe = {profilePicMe}
                nameChatPartner = {nameChatPartner}
                profilePicChatPartner = {profilePicChatPartner}
                                    message={todayMessage.message}
                                  timestamp={todayMessage.timestamp}
                                    sentByMe={todayMessage.sentByMe} 
                                    timeRead={todayMessage.timeRead}										
                                    isToday={true} 														 
                                    />
        {/each} -->
    </div>
</div>