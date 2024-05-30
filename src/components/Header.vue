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
      store,
      prova: [],
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
      if (this.searchString != '') {
        const options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/search/movie',
          params: { query: this.searchString, include_adult: 'false', language: 'en-US', page: '1' },
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTMxNDk2ZTkzMTljOGU5ZGIxN2FjZjRlZTk3MGY2NiIsInN1YiI6IjY2NTcyM2ZiZTU3MjdjNDE2OTFhMWEwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xKoIZnWtUqUqhxUEimcUFFitmER6Wp755YLUCMr7PzA'
          }
        }

        console.log(options + this.searchString)
        axios
          .request(options)
          .then((response) => {
            // Sto coso senza arrow function da errori, non so perché
            console.log("response", response);
            console.log("response data", response.data);
            console.log("questo", response.data.results);
            if (response.data.results.original_language == "it") {
              console.log("funziona")
            }
            this.store.filmRequest = response.data.results;
            // Da chiedere, non so perché crea un errore
            // Da chiedere le emit

          })
          .catch(function (error) {
            console.error("!errorEEEE");
          });
      }
    },

    getFilmPopular() {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular',
        params: { language: 'en-US', page: '1' },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTMxNDk2ZTkzMTljOGU5ZGIxN2FjZjRlZTk3MGY2NiIsInN1YiI6IjY2NTcyM2ZiZTU3MjdjNDE2OTFhMWEwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xKoIZnWtUqUqhxUEimcUFFitmER6Wp755YLUCMr7PzA'
        }
      };

      axios
        .request(options)
        .then((response) => {
          // Da chiedere, perché senza => non mi gira la function? dicendo che non trova store
          console.log(response.data);
          this.store.filmRequest = response.data.results;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    getSeries() {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/tv/popular',
        params: { include_adult: 'false', language: 'en-US', page: '1' },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTMxNDk2ZTkzMTljOGU5ZGIxN2FjZjRlZTk3MGY2NiIsInN1YiI6IjY2NTcyM2ZiZTU3MjdjNDE2OTFhMWEwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xKoIZnWtUqUqhxUEimcUFFitmER6Wp755YLUCMr7PzA'
        }
      };

      axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          this.store.filmRequest = response.data.results;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    getFilmAndSeries() {
      this.getFilmPopular()

      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/tv/popular',
        params: { include_adult: 'false', language: 'en-US', page: '1' },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTMxNDk2ZTkzMTljOGU5ZGIxN2FjZjRlZTk3MGY2NiIsInN1YiI6IjY2NTcyM2ZiZTU3MjdjNDE2OTFhMWEwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xKoIZnWtUqUqhxUEimcUFFitmER6Wp755YLUCMr7PzA'
        }
      };

      axios
        .request(options)
        .then((response) => {
          console.log(response.data);

          this.prova = response.data.results
          console.log("questo è prova", this.prova)

          /* Stesso codice della riga sotto
          let x = this.store.filmRequest
          let y = this.prova
          this.filmAndSeries = [...x, ...y];
          */

          this.filmAndSeries = [...this.store.filmRequest, ...this.prova];
          // i tre puntini indicano l'array completo
          console.log("questo è prova completo magari", this.filmAndSeries)


          this.store.filmRequest = this.filmAndSeries;
          console.log("Dopo", response.data);
        })
        .catch(function (error) {
          console.error(error);
        });

    },

    consoleprova() {
      console.log(this.searchString, "ciao")
    }
  },

  computed: {
    checkLang() {
      if (this.store.filmRequest.original_language == it) {
        return this.store.filmRequest.original_language = "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg";
      }
    }

  },

  mounted() {
    this.getFilmAndSeries()
  }
}
</script>

<template>
  <div class="w-100 bg-dark">
    <div class="bg-dark d-flex justify-content-between align-items-center w-50 m-auto py-2">
      <a id="siteName" class="navbar navbar-brand text-danger m-0">Boolflix</a>

      <!-- Searchbar -->
      <div class="input-group mb-0 w-50 align-items-center d-flex gap-1">
        <input type="text" class="form-control rounded" placeholder="Cerca un titolo" aria-label="Recipient's username"
          aria-describedby="basic-addon2" v-model="searchString" @keyup.enter="getFilm()">
        <!-- questo keyup l'ho messo in caso i ltasto cerca non funzioni a dovere -->
        <!-- Pulsante per mandare le info -->
        <div class="input-group-append me-0">
          <input class="btn btn-outline-secondary rounded text-light me-0" type="button" @click="getFilm()"
            value="Cerca"></input>
        </div>
      </div>
    </div>
  </div>


  <div class="w-100">
    <div class="cards mb-4 pb-4 w-50 m-auto" v-for="cardSingola, i in store.filmRequest">
      <!-- Div contenitore di ogni singola cardSingola, così da poter applicare il v-if -->
      <div
        v-if="(cardSingola.title != '') && (cardSingola.overview != '') || (cardSingola.original_name != '') && (cardSingola.overview != '')">
        <img class="center" :src="'https://api.themoviedb.org/3/movie/' + cardSingola.id + '/images'">
        <div class="d-flex align-items-center justify-content-between mb-4">

          <h6 v-if="(cardSingola.title != null)" class="text-left mb-0">{{ cardSingola.title }}</h6>
          <h6 v-if="(cardSingola.original_name != null)" class="text-left mb-0">{{ cardSingola.original_name }}</h6>
          <!-- Grazie al null, controllo se è presente nell'array, se avessi messo solamente '' avrebbe stampato sempre gli h6 anche se non fossero esistiti dati dentro -->


          <!-- Contenitore flag e lingua -->
          <div class="d-flex gap-2">
            <p v-if="(cardSingola.original_language != 'it') && (cardSingola.original_language != 'en')"
              class="text-left text-dark mb-0">{{ cardSingola.original_language }}</p>
            <!-- Quel v-if mi fa stampare in pagina il testo della lingua solo se è diverso da it e en -->

            <!-- <img class="text-left text-dark mb-0" :src="cardSingola.original_language"> -->
            <!-- Metodo 1, non ancora funzionante -->

            <img v-if="cardSingola.original_language == 'it'" class="flag mb-0"
              src="https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg" alt="">
            <img v-if="cardSingola.original_language == 'en'" class="flag mb-0"
              src="https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg" alt="">
            <img v-if="cardSingola.original_language == 'es'" class="flag mb-0"
              src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg" alt="">
          </div>

        </div>

        <!-- Da chiedere come faccio a prendere solo gli elementi che hanno tutti gli elementi? fatto nel div contenitore di tutto questo, cerca "Div contenitore di ogni singola cardSingola" -->
        <p class="text-left text-dark">{{ cardSingola.overview }}</p>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

#siteName {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;

}

.flag {
  height: 15px;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>
