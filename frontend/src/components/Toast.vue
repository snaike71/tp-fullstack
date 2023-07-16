<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps(["text", "type", "y"])

</script>


<template>
    <div class="Toast-success" v-if="props.type === 'success'">
        {{ props.text }}
    </div>
    <div class="Toast-error" v-else-if="props.type === 'error'">
        {{ props.text }}
    </div>
</template>

<style>
.Toast-success {
    background-color: greenyellow;
    display: flex;
    color: var(--first-color);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    justify-content: center;
    align-items: center;
    font-size: x-large;
    width: 50%;
    height: 80px;


}

.Toast-error {
    background-color: red;
    display: flex;
    color: var(--first-color);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    justify-content: center;
    align-items: center;
    font-size: x-large;
    width: 50%;
    height: 80px;

}
</style>
