<script setup lang="ts">
import type { MovieProps } from "@/type";
import Button from "./Button.vue"
import SearchBar from "./SearchBar.vue";


const emit = defineEmits(["emitMenu", "emitAjout", "emitSearch", "emitSearchMenu"])

const onMenu = () => {
    emit("emitMenu")
}
const onSearchMenu = () => {
    emit("emitSearchMenu")
}


const onAjout = () => {
    emit("emitAjout")
}

const onSearch = (value: MovieProps) => {
    emit("emitSearch", value)
}
</script>

<template>
    <nav>
        <div style="display: flex; justify-content: start; ">
            <img src="../../public/image/authentifier-logo.png">
        </div>
        <div style="display: flex ; justify-content: center; align-items: center;">
            <div>
                <Button @click="onMenu" text="menu"></Button>
            </div>
            <div>
                <Button @click="onAjout" text="ajout"></Button>
            </div>
        </div>
            <div>
                <SearchBar @emit-search-menu="onSearchMenu" @emit-search="(r) => onSearch(r)"></SearchBar>
            </div>
        

    </nav>
</template>

<style>
nav {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    padding-left: 50px;
    padding-right: 50px;
}

@media (min-width: 1000px) {
    nav {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        flex-direction: row;
        gap: 30px;
        align-items: center;
        justify-content: center;
        min-height: 100%;
    }
}
</style>