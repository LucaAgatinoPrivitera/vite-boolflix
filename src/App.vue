<script>
import Header from './components/Header.vue';
import Main from './components/Main.vue';
import { store } from './store.js';
import axios from 'axios';

export default {
  components: {
    Header,
    Main,
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
      console.log(this.searchType, "ciao")
    }
  }
}
</script>

<template>
  <Header/>
  <Main></Main>
</template>

<style scoped></style>
