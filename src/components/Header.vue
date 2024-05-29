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

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    consoleprova() {
      console.log("ciao")
    }
  }
}
</script>

<template>
  <div class="w-100 bg-dark">
    <div class="bg-dark d-flex justify-content-around align-items-center w-50 m-auto py-2">
      <a class="navbar navbar-brand text-danger m-0">Boolflix</a>
      <div class="input-group mb-0 w-25 align-items-center d-flex">
        <!-- Searchbar -->
        <input type="text" class="form-control rounded" placeholder="Cerca un titolo" aria-label="Recipient's username"
          aria-describedby="basic-addon2" v-model="searchType" @keyup.enter="consoleprova()">
          <!-- questo keyup l'ho messo in caso i ltasto cerca non funzioni a dovere -->
          <!-- Pulsante per mandare le info -->
        <div class="input-group-append me-2">
          <input class="btn btn-outline-secondary rounded text-light" type="button"
            @click="consoleprova()" value="Submit">Cerca</input>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="bg-white">
    
  </div> -->
</template>

<style scoped></style>
