<script setup lang="ts">

const props = defineProps(["text"])

</script>

<template>
    <button class="button-menu">
        {{ props.text }}
    </button>
</template>

<style>
.button-menu {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    font-size: large;
    border-radius: 50px;
    border: 0;
    padding: 20px;
    height: 40px;
    margin: 10px;
    width: 80px;

}

@media (min-width: 1000px) {
    .button-menu {
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        font-size: x-large;
        border-radius: 50px;
        border: 0;
        padding: 20px;
        height: 60px;
        margin: 30px;
        width: 100px;
    }
}
</style>

