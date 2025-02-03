<script>
    import ZipcodeField from '$components/field/ZipcodeField.svelte';

    export let messageType;
    export let messageObjType;
    export let messages;
</script>

{#if messageObjType === 'CONSUMERLOCATION' }
    <ZipcodeField />
{/if}