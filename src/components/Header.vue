<script>
import { ref } from 'vue'
import { store } from '../store.js';
import axios from 'axios';

export default {
  components: {
    store
  },

  data() {
    return {
      appTitle: "Boolflix",
      // store,
      searchString: "",
      searchType: "",
      store
    }
  },

  methods: {
    getFilmBackup() {
      console.log("cerca: ", this.searchString); //il this serve perché è messo nel data, in fondo è vue

      axios.get("https://db.ygoprodeck.com/api/v7/cardinfo.php?num=10&offset=0" + this.searchString).then(risultato => {
        // console.log(risultato.data.results);
        this.store.carteAxios = risultato.data.data;
        // Mettendo il data mi becco tutto l'oggettone e quindi ha tutto dentro
        console.log(this.store.carteAxios)
      });
    },

    getFilm() {
      console.log(this.store.options + this.searchString)

      axios
        .request(this.store.options)
        .then((response) => {
          // Sto coso senza arrow function da errori, non so perché
          console.log(response.data);
          console.log("questo", response.data.results);

          this.store.filmRequest = response.data.results;
          // Da chiedere, non so perché crea un errore
          // Da chiedere le emit

        })
        .catch(function (error) {
          console.error("!errorEEEE");
        });
    },
    consoleprova() {
      console.log(this.searchString, "ciao")
    }
  }
}
</script>

<template>
  <div class="w-100 bg-dark">
    <div class="bg-dark d-flex justify-content-between align-items-center w-50 m-auto py-2">
      <a class="navbar navbar-brand text-danger m-0">Boolflix</a>
      <div class="input-group mb-0 w-50 align-items-center d-flex">
        <!-- Searchbar -->
        <input type="text" class="form-control rounded" placeholder="Cerca un titolo" aria-label="Recipient's username"
          aria-describedby="basic-addon2" v-model="searchString" @keyup.enter="getFilm()">
        <!-- questo keyup l'ho messo in caso i ltasto cerca non funzioni a dovere -->
        <!-- Pulsante per mandare le info -->
        <div class="input-group-append me-2">
          <input class="btn btn-outline-secondary rounded text-light" type="button" @click="getFilm()"
            value="Submit">Cerca</input>
        </div>
      </div>
    </div>
  </div>


  <div class="w-100">
    <div class="cards mb-4 pb-4 w-50 m-auto" v-for="cardSingola, i in store.filmRequest">
      <img :src="'https://api.themoviedb.org/3/movie/' + cardSingola.id + '/images'">
      <h6 class="text-left">{{ cardSingola.title }}</h6>
      <!-- Da chiedere come faccio a prendere solo gli elementi che hanno tutti gli elementi? -->
      <p class="text-left text-dark">{{ cardSingola.overview }}</p>
    </div>
  </div>
</template>

<style scoped></style>
