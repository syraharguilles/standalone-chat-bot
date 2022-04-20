<script>
// logic goes here
import MessageHeader from './components/MessageHeader.svelte';
import MessageBody from './components/MessageBody.svelte';
import MessageBottom from './components/MessageBottom.svelte';
</script>

<style>
/* styles go here */

</style>

<!-- markup (zero or more HTML elements) goes here -->
<svelte:head>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</svelte:head>
<div class="card card-danger direct-chat direct-chat-danger">
    <MessageHeader/>
    <MessageBody/>
    <MessageBottom/>
</div>