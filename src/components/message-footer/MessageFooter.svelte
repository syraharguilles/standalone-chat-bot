<div class="message-footer"> 
    <slot name="footer" />
</div>

<style>
    .message-footer {
        border-top: 1px solid rgb(11 40 123 / 60%);
        padding: 15px;
        text-align: center;
    }
    .message-footer__button {
        width: 5%;
    }
    .message-footer__input-group {
     display: flex;
    }
    .message-footer__text-field {
        width: 95%;
        margin-right: 10px;
    }

</style>