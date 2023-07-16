<script setup lang="ts">
import { PORT } from '@/func/const';
import type { MovieProps } from '@/type';
import { ref } from 'vue';
import { Search } from 'lucide-vue-next';
const searchValue = ref("")

const emit = defineEmits(["emitSearch", "emitSearchMenu"])

const handleClick = async () => {
    try {
        const res = await fetch(`http://localhost:${PORT}/search`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titre: searchValue.value })

        })
        const result: MovieProps = await res.json();
        emit("emitSearch", result)

    } catch (error) {
        console.log("Error", error)
    }

}
const handleClickSearch = () => {
    emit("emitSearchMenu")
}

</script>

<template>
    <div style="display: flex; align-items: center;">
        <input @click="handleClickSearch" class="search-bar" placeholder="chercher un film..." v-model="searchValue" />
        <button class="button-cherche" @click="handleClick">
            <Search class="search-logo"></Search>
        </button>
    </div>
</template>

<style>
.search-bar {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    height: 30px;
    width: 200px;
    border: 1px solid gray;
}

.search-logo {
    size: 50;
}


.button-cherche {
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    font-size: large;
    border: 13px solid var(--second-color);
    padding: 5px;
    height: 10px;
    width: 80px;
}

@media (min-width: 1000px) {
    .search-bar {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        height: 60px;
        width: 400px;
        border: 1px solid brown;
    }

    .button-cherche {
        display: flex;
        justify-content: center;
        align-items: center;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        font-size: x-large;
        border: 13px solid var(--second-color);
        padding: 20px;
        height: 20px;
        width: 100px;
    }

    .search-logo {
        height: 100px;
        width: 100px;
       
    }
}</style>