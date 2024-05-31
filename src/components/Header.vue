<script>
import { ref } from 'vue'
import { toRaw } from 'vue'
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
      stars: [],
      title: ''
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
      this.title = 'Ricerca per: ' + this.searchString;
    },

    getFilmPopular() {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular',
        params: { language: 'en-US', page: '1' },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTMxNDk2ZTkzMTljOGU5ZGIxN2FjZjRlZTk3MGY2NiIsInN1YiI6IjY2NTcyM2ZiZTU3MjdjNDE2OTFhMWEwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xKoIZnWtUqUqhxUEimcUFFitmER6Wp755YLUCMr7PzA'
        },
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
      this.title = 'Film Popolari';
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
        },
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
          console.log("Proviamo qui", this.store.filmRequest[0].vote_average)
          console.log("length", this.store.filmRequest.length)

          // Così posso prendere tutti i vote average
          for (let i = 0; i < this.store.filmRequest.length - 1; i++) {
            const element = parseFloat(this.store.filmRequest[i].vote_average);
            this.stars.push(element)
          }

          console.log(this.stars)
          console.log("dopo raw", this.stars)
          this.getRating()
        })
        .catch(function (error) {
          console.error(error);
        });
      this.title = 'Film e SerieTV popolari';


    },

    getRating() {
      let x = this.store.filmRequest.vote_average;
      console.log("x vale", Math.round(x), "il suo tipo è", typeof x);
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
    this.getRating()
  }
}
</script>

<template>
  <div id="similHeader" class="w-100 bg-dark">
    <div class="d-flex justify-content-between align-items-center w-50 m-auto py-2">
      <a id="siteName" class="navbar navbar-brand m-0">Boolflix</a>

      <!-- Searchbar -->
      <div class="input-group mb-0 w-50 align-items-center d-flex gap-1">
        <input type="text" class="form-control rounded borderHeader" placeholder="Cerca un titolo"
          aria-label="Recipient's username" aria-describedby="basic-addon2" v-model="searchString"
          @keyup.enter="getFilm()">
        <!-- questo keyup l'ho messo in caso i ltasto cerca non funzioni a dovere -->
        <!-- Pulsante per mandare le info -->
        <div class="input-group-append me-0">
          <input class="btn btn-outline-secondary rounded text-light me-0 borderHeader" type="button" @click="getFilm()"
            value="Cerca"></input>
        </div>
      </div>

      <div>
        <a href="#"><i class="fa-solid fa-question"></i></a>
      </div>
    </div>
  </div>

  <div id="similMain" class="w-100 contenitoreApp">
    <h3 id="titolo" class="ContainerCards m-auto mt-4">{{ title }}</h3>
    <div class="ContainerCards containerCardsHeight d-flex gap-4 m-auto pb-4">
      <div class="cards mb-0 pb-0 w-100 m-auto mt-0 content" v-for="cardSingola, i in store.filmRequest">

        <!-- Div contenitore di ogni singola cardSingola, così da poter applicare il v-if -->
        <div class="widthCards"
          v-if="(cardSingola.title != '') && (cardSingola.overview != '') || (cardSingola.original_name != '') && (cardSingola.overview != '')">
          <img class="poster" :src="'https://image.tmdb.org/t/p/w342' + cardSingola.poster_path">
          <div class="d-flex align-items-center justify-content-between">

            <h6 v-if="(cardSingola.title != null)" class="text-left mb-0 textBreak">{{ cardSingola.title }}</h6>
            <h6 v-if="(cardSingola.original_name != null)" class="text-left mb-0 textBreak">
              {{ cardSingola.original_name }}</h6>
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
                src="https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg"
                alt="">
              <img v-if="cardSingola.original_language == 'es'" class="flag mb-0"
                src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg" alt="">
            </div>

          </div>
          <!-- Container di tutte le stelle -->
          <div class="position-relative mb-4 containerIcons">

            <!-- Container delle 5 stelle sempre presenti -->
            <div class="allStars">
              <i class="fa-solid fa-star right opacity-25"></i>
              <i class="fa-solid fa-star right opacity-25"></i>
              <i class="fa-solid fa-star right opacity-25"></i>
              <i class="fa-solid fa-star right opacity-25"></i>
              <i class="fa-solid fa-star right opacity-25"></i>
            </div>


            <div class="">
              <!-- <i class="fa-solid fa-star right opacity-50 d-block" v-for="x in store.filmRequest[0]"></i> -->
              <!-- da chiedere -->
            </div>

          </div>

          <!-- Da chiedere come faccio a prendere solo gli elementi che hanno tutti gli elementi? fatto nel div contenitore di tutto questo, cerca "Div contenitore di ogni singola cardSingola" -->
          <p class="text-left text-dark textBreak">{{ cardSingola.overview }}</p>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

#similHeader {
  height: 4rem;
  display: flex;
  background-color: #0A0908 !important;
}

#similHeader * {
  background-color: #0A0908;
}

/* Senza spazio non funziona */
#similHeader ::placeholder {
  color: #E5E6E8;
}

#similHeader input {
  color: #E5E6E8;
}

.form-control:focus {
  border-color: #E5E6E8 !important;
  box-shadow: 0 0 0 0.1rem #E5E6E8 !important;
}

#similHeader i {
  color: #0A0908;
  border-radius: 60px;
  box-shadow: 0 0 2px #E5E6E8;
  padding: 0.5em 0.6em;
  background-color: #E5E6E8;
}

.borderHeader {
  border-color: #E5E6E8;
}

#similMain {
  height: calc(100vh - 4rem);
}

#siteName {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  color: #D72638;
  cursor: pointer
}

#titolo {
  height: 3rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  color: #0A0908;
}

.contenitoreApp {
  background-color: #E5E6E8;
  overflow: auto;
  white-space: nowrap;
}

.ContainerCards {
  width: 90%;
}

.containerCardsHeight {
  height: calc(100% - (3rem + 1.5rem));
  /* 1.5rem sarebbe lo spacer del margine */
}

.content {
  display: contents;
}

.widthCards {
  width: 342px !important;
  height: auto;
}

.widthCards h6,
.widthCards p {
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.widthCards p {
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: overlay;
  max-height: 45%;
}

.poster {
  width: 342px;
  height: 513px;
  object-fit: fill;
}

.flag {
  height: 15px;
}

/* .containerIcons * { 
  right: 0px;
}*/

.allStars {
  position: absolute;
}

.textBreak {
  white-space: normal;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.right {
  margin-left: auto;
}


@media only screen and (max-width: 1920px) {
  .poster {
    width: 256.5px;
    height: 384.75px;
  }

  .widthCards p {
    text-overflow: ellipsis;
    word-wrap: break-word;
    overflow: overlay;
    max-height: 30%;
  }
}
</style>
