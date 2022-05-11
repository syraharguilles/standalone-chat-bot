<script>
    import '$lib/scss/message-body/_base.scss';
    import MESSAGE from '$lib/components/_Message.svelte';
    
</script>

<div class="message-body">
    <MESSAGE />
    <slot/>
</div>