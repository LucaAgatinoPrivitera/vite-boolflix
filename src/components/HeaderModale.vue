<script>
import Header from './Header.vue';
import { store } from '../store.js';
import axios from 'axios';

export default {
    name: 'HeaderModale',
    components: {
        store
    },
    props: {
        overview: String,
        title: String,
        name: String,
        originalTitle: String,
        original_name: String,
        poster_path: String,
        first_air_date: String,
        release_date: String,
        language: String

    },


    data() {
        return {
            appTitle: "Boolflix",
            // store,
            searchString: "",
            searchType: "",
            isVisible: true
        }
    },
    methods: {
        closeModal() {
            this.isVisible = false;
            this.$emit('close');
        }
    }
}
</script>

<template>
    <div class="modale modale-content close m-0 p-0 rounded-0 textBreak" v-if="isVisible" @keydown.esc="closeModal">
        <div class="modale-content text-light m-0 px-4 rounded-0" @keydown.esc="closeModal">
            <i class="fa-regular fa-circle-xmark close" @click="closeModal"></i>
            <div id="container" class="d-flex gap-4" @keydown.esc="closeModal">
                <img :src="'https://image.tmdb.org/t/p/w342' + poster_path" alt="Poster">
                <div class="info">
                    <h3 v-show="title != null">{{ title }}</h3>
                    <h3 v-show="name != null">{{ name }}</h3>
                    <h3 v-if="language != 'en' && originalTitle != null">({{ originalTitle }})</h3>
                    <h3 v-if="language != 'en' && original_name != null">({{ original_name }})</h3>
                    <p>{{ overview }}</p>
                    <div class="pt-4 mt-4">
                        <p v-if="release_date">Data di uscita: {{ release_date.slice(0, 7) }}</p>
                        <p v-if="first_air_date">Data di uscita: {{ first_air_date.slice(0, 7) }}</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

.modale {
    width: 100%;
    height: calc(100vh - 4rem);
    top: 4rem !important;
    z-index: 100;
    background-color: #0a0908f6;
    position: fixed !important;
}

#container {
    padding: 0 0 0 10rem !important;
    width: calc(100% / 1.618);
}

.modale-content {
    padding: 20px;
    border-radius: 5px;
    position: relative;
    height: 100%;
}

.close {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    font-size: larger;
}

i {
    position: absolute;
    right: 20px !important;
    top: 12px !important;
    box-sizing: content-box;
    padding: .625rem 1.25rem 1.25rem 1.25rem;

}

img {
    height: calc(100% / 1.618) !important;
}

.info {
    width: calc(100% / 1.618);
    min-width: 50%;
    font-family: "Rubik", sans-serif;
}



.textBreak {
    white-space: normal;
}
</style>