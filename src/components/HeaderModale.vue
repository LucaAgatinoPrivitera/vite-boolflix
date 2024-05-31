<script>
import Header from './Header.vue';
import { store } from '../store.js';
import axios from 'axios';

export default {
    components: {
        store
    },
    props: {
        overview: String

    },


    data() {
        return {
            appTitle: "Boolflix",
            // store,
            searchString: "",
            searchType: "",
        }
    },
}
</script>

<template>
    <div class="modale">
        <p>{{ overview }}ciao</p>
    </div>
</template>