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
        language: String,
        backdrop_path: String,
        original_language: String

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
        },
        callParentMethod() {
            this.$emit('call-parent-method');
        }
    },
    created() {
        this.$emit('call-parent-method');
    },
    mounted() {
        this.$emit('call-parent-method');
    }
}
</script>

<template>
    <div class="modale modale-content close m-0 p-0 rounded-0 textBreak" v-if="isVisible" @keydown.esc="closeModal">
        <div class="modale-content text-light m-0 px-4 rounded-0" @keydown.esc="closeModal">
            <i class="fa-regular fa-circle-xmark close" @click="closeModal"></i>
            <div id="container" class="d-flex gap-4" @keydown.esc="closeModal">
                <!-- Da chiedere, come posso renderla una Bg image in css? -->

                <div class="backgroundContainer"><img id="backgroundImage"
                        :src="'https://image.tmdb.org/t/p/w342' + backdrop_path" alt="">
                </div>
                <img class="z-indexFixato" :src="'https://image.tmdb.org/t/p/w342' + poster_path" alt="Poster">
                <div class="info">
                    <h3 v-show="title != null">{{ title }}</h3>
                    <h3 v-show="name != null">{{ name }}</h3>
                    <h3 v-if="language != 'en' && originalTitle != null">({{ originalTitle }})</h3>
                    <h3 v-if="language != 'en' && original_name != null">({{ original_name }})</h3>
                    <p>{{ overview }}</p>
                    <div class="d-flex justify-content-between pt-4 mt-4">
                        <div class="">
                            <p v-if="release_date">Data di uscita: {{ release_date.slice(0, 7) }}</p>
                            <p v-if="first_air_date">Data di uscita: {{ first_air_date.slice(0, 7) }}</p>
                        </div>
                        <p>({{ original_language }})</p>
                    </div>


                </div>
            </div>

            <!-- Da chiedere, perché non funziona? Cannot read properties of undefined (reading 'filmAndSeries')-->
            <div class="suggested mt-5">
                <div>
                    <h3>Contenuti consigliati</h3>
                    <!-- <div class=" cards mb-0 pb-0 w-100 m-auto mt-0 content"
                        v-for="cardSingola, i in store.filmAndSeries" :key="i">

                        <div class="widthCards" v-if="(cardSingola.name != '') && (cardSingola.overview != '')">
                            <div class="poster" @click="openModal(cardSingola)">

                                <img class="poster" :src="'https://image.tmdb.org/t/p/w342' + cardSingola.poster_path">

                                <h3 v-if="(cardSingola.name != null)"
                                    class="text-left mb-0 textBreak position-absolute titleInCard">
                                    {{ cardSingola.name }}</h3>
                            </div>

                            <div class="d-flex align-items-center justify-content-between">

                                <h6 v-if="(cardSingola.name != null)" class="text-left mb-0 textBreak">
                                    {{ cardSingola.name }}</h6>
                            </div>
                        </div>
                    </div> -->
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

.backgroundContainer {
    box-shadow: 0 0 500px rgb(0, 0, 0) inset !important;
    position: absolute;
    width: 100% !important;
    height: 100vh !important;
    object-fit: cover;
    top: 0;
    left: 0;
}

#backgroundImage {
    position: relative;
    z-index: -1;
    width: 100% !important;
    height: 100% !important;
    opacity: 0.15;

}



.modale-content {
    padding: 20px;
    border-radius: 5px;
    position: relative;
    height: 100%;
    z-index: 50;
    padding-top: 4.5rem;
}

i {
    z-index: 200;
}

.z-indexFixato {
    z-index: 100;
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
    z-index: 40;
}

.suggested {
    padding: 0 0 0 10rem !important;
}

.textBreak {
    white-space: normal;
}
</style>