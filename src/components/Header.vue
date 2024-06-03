<script>
import { ref } from 'vue'
import { toRaw } from 'vue'
import { store } from '../store.js';
import axios from 'axios';
import HeaderModale from './HeaderModale.vue';

export default {
  components: {
    store,
    HeaderModale
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
      title: '',
      titleTV: '',
      isModalOpen: false,
      selectedCard: {},
      accountInfo: [],
      avatar: '',
      avatarAll: [],
      username: false,
      isHovered: false
    }
  },

  methods: {
    openModal(card) {
      this.selectedCard = card;
      this.isModalOpen = true;
    },

    account() {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/account/21296641',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTMxNDk2ZTkzMTljOGU5ZGIxN2FjZjRlZTk3MGY2NiIsInN1YiI6IjY2NTcyM2ZiZTU3MjdjNDE2OTFhMWEwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xKoIZnWtUqUqhxUEimcUFFitmER6Wp755YLUCMr7PzA'
        }
      };

      axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          this.accountInfo = response.data;
          console.log(this.accountInfo.avatar.gravatar)
          this.avatar = this.accountInfo.avatar.gravatar.hash
          this.avatarAll = this.accountInfo

          console.log("avatar", this.avatarAll)
        })
        .catch(function (error) {
          console.error(error);
        });
    },
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
      // Questo if fa si che non si mostri mai un "Ricerca per:" e poi è tutto vuoto
      if (this.searchString.length > 0) {
        this.title = 'Ricerca per: ' + this.searchString;
      }

    },

    getSeriesSearch() {
      if (this.searchString != '') {
        const options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/search/tv',
          params: { query: this.searchString, include_adult: 'false', language: 'en-US', page: '1' },
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTMxNDk2ZTkzMTljOGU5ZGIxN2FjZjRlZTk3MGY2NiIsInN1YiI6IjY2NTcyM2ZiZTU3MjdjNDE2OTFhMWEwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xKoIZnWtUqUqhxUEimcUFFitmER6Wp755YLUCMr7PzA'
          }
        };

        axios
          .request(options)
          .then((response) => {
            this.prova = response.data.results
            console.log("ENTRAAA", this.prova)
            let ciao = this.store.filmRequest;
            this.store.seriesRequest = this.prova;
            console.log("film e serie", this.store.filmRequest);
            // Da chiedere, perché il console log funziona ma la pagina non vuole prendere i dati, ok era perché il v-for in basso non era settato bene
            return this.store.filmRequest
          })
          .catch(function (error) {
            console.error(error);
          });
      }
      if (this.searchString.length > 0) {
        this.title = 'Film ricercati per: ' + this.searchString;
        this.titleTV = 'SerieTV ricercate per: ' + this.searchString;
      }
      this.titleTV = 'SerieTV ricercate per: ' + this.searchString;
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
          this.store.seriesRequest = response.data.results;
        })
        .catch(function (error) {
          console.error(error);
        });
      this.titleTV = "SerieTV Popolari"
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
      this.title = 'Film popolari';


    },

    getRating(rating) {
      let newVote = rating / 2
      newVote = newVote.toFixed(2)
      newVote = Math.round(newVote)

      /* metodo vecchio
      let x = this.store.filmRequest.vote_average;
      console.log("x vale", Math.round(x), "il suo tipo è", typeof x);
      */
      return newVote;
    },

    consoleprova() {
      console.log(this.searchString, "ciao")
    },

    showUsername() {
      // document.getElementById('username').classList.add("showUsername")
      if (this.isHovered == true) {
        this.isHovered = false;
        console.log("quuiiiiii", this.isHovered)
        return this.isHovered;
      }
      else {
        this.isHovered = true;
        console.log("quuiiiiii", this.isHovered)
        return this.isHovered;
      }
    },
    hideUsername() {
      // document.getElementById(username).classList.remove("hideUsername")
      this.isHovered = false;
    },
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
    this.account()
    this.getFilmPopular()
    this.getSeries()
    this.getRating()
  }
}
</script>

<template>
  <div id="similHeader" class="w-100">
    <div class="d-flex justify-content-between align-items-center m-auto py-2 similHeaderWidth">
      <!-- Prima aveva un w-50 -->
      <a id="siteName" class="navbar navbar-brand m-0"
        @click="getFilmAndSeries(), getSeries(), isModalOpen = false">Boolflix</a>

      <!-- Searchbar -->
      <div class="input-group mb-0 w-25 align-items-center d-flex gap-1">
        <input type="text" class="form-control rounded borderHeader" placeholder="Cerca un titolo"
          aria-label="Recipient's username" aria-describedby="basic-addon2" v-model="searchString"
          @keyup.enter="getFilm(), getSeriesSearch()">
        <!-- questo keyup l'ho messo in caso i ltasto cerca non funzioni a dovere -->
        <!-- Pulsante per mandare le info -->
        <div class="input-group-append me-0">
          <input class="btn btn-outline-secondary rounded text-light me-0 borderHeader" type="button"
            @click="getFilm(), getSeriesSearch()" value="Cerca"></input>
        </div>
      </div>

      <div id="session" class="d-flex gap-1 align-items-center">
        <!-- <a href="#"><i class="fa-solid fa-question"></i></a> -->
        <span id="username" class="usernameDefault" :class="{ showUsername: isHovered }">{{ avatarAll.username }}</span>
        <img :src="'https://image.tmdb.org/t/p/w500/' + this.avatar" alt="">
        <!-- da chiedere perché non mi becca niente -->
        <img id="avatar" src="https://i.imgur.com/ruxIlU7.png" alt="" @click="showUsername()">
        <!-- Da chiedere, cambia qualcosa se metto o no le parentesi? -->
      </div>
    </div>
  </div>

  <div id="similMain" class="w-100 contenitoreApp position-relative">
    <h3 id="titolo" class="ContainerCards m-auto mt-4">{{ title }}</h3>
    <div class="ContainerCards containerCardsHeight d-flex gap-4 m-auto pb-4">
      <!-- MODALE -->
      <HeaderModale v-if="isModalOpen" @close="isModalOpen = false" class="position-absolute"></HeaderModale>

      <div class=" cards mb-0 pb-0 w-100 m-auto mt-0 content" v-for="cardSingola, i in store.filmRequest" :key="i">

        <!-- Div contenitore di ogni singola cardSingola, così da poter applicare il v-if -->
        <div class="widthCards"
          v-if="(cardSingola.title != '') && (cardSingola.overview != '') || (cardSingola.original_name != '') && (cardSingola.overview != '')">
          <div class="poster" @click="openModal(cardSingola)">

            <img class="poster" :src="'https://image.tmdb.org/t/p/w342' + cardSingola.poster_path">

            <h3 v-if="(cardSingola.title != null)" class="text-left mb-0 textBreak position-absolute titleInCard">
              {{ cardSingola.title }}</h3>
            <h3 v-if="(cardSingola.original_name != null)"
              class="text-left mb-0 textBreak position-absolute titleInCard">
              {{ cardSingola.original_name }}</h3>
          </div>

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
              <!-- {{ cardSingola.vote_average / 2 }} -->
            </div>


            <div class="">
              <!-- <i class="fa-solid fa-star right opacity-50 d-block" v-for="x in store.filmRequest[0]"></i> -->
              <!-- da chiedere -->

              <!-- Due modi uguali -->
              <!-- <i class="fa-solid fa-star right opacity-50 d-block">{{ (cardSingola.vote_average / 2).toFixed(2) }}</i> -->


              <!-- <i class="fa-solid fa-star right opacity-50 d-block">{{ getRating(cardSingola.vote_average) }}</i> -->

              <div class="">
                <i class="fa-solid fa-star right opacity-50" v-if="getRating(cardSingola.vote_average) >= 1"></i>
                <i class="fa-solid fa-star right opacity-50" v-if="getRating(cardSingola.vote_average) >= 2"></i>
                <i class="fa-solid fa-star right opacity-50" v-if="getRating(cardSingola.vote_average) >= 3"></i>
                <i class="fa-solid fa-star right opacity-50" v-if="getRating(cardSingola.vote_average) >= 4"></i>
                <i class="fa-solid fa-star right opacity-50" v-if="getRating(cardSingola.vote_average) >= 5"></i>
              </div>
            </div>

          </div>

          <!-- Da chiedere come faccio a prendere solo gli elementi che hanno tutti gli elementi? fatto nel div contenitore di tutto questo, cerca "Div contenitore di ogni singola cardSingola" -->
          <p class="text-left text-dark textBreak testoCard notVisibleModale">{{ cardSingola.overview }}</p>
        </div>

      </div>
    </div>


    <!-- Spazio delle serietv -->
    <h3 id="titolo" class="ContainerCards m-auto mt-4">{{ titleTV }}</h3>
    <div class="ContainerCards containerCardsHeight d-flex gap-4 m-auto pb-4">
      <!-- MODALE -->
      <Transition>
        <HeaderModale v-if="isModalOpen" @close="isModalOpen = false" class="position-absolute"
          :overview="selectedCard.overview" :title="selectedCard.title" :name="selectedCard.name"
          :original_name="selectedCard.original_name" :poster_path="selectedCard.poster_path"
          :first_air_date="selectedCard.first_air_date" :release_date="selectedCard.release_date"
          :originalTitle="selectedCard.original_title" :language="selectedCard.original_language"
          :backdrop_path="selectedCard.backdrop_path" :original_language="selectedCard.original_language.toUpperCase()"
          @call-parent-method="getFilmAndSeries"></HeaderModale>
      </Transition>

      <div class=" cards mb-0 pb-0 w-100 m-auto mt-0 content" v-for="cardSingola, i in store.seriesRequest" :key="i">

        <!-- Div contenitore di ogni singola cardSingola, così da poter applicare il v-if -->
        <div class="widthCards" v-if="(cardSingola.name != '') && (cardSingola.overview != '')">
          <div class="poster" @click="openModal(cardSingola)">

            <img class="poster" :src="'https://image.tmdb.org/t/p/w342' + cardSingola.poster_path">

            <h3 v-if="(cardSingola.name != null)" class="text-left mb-0 textBreak position-absolute titleInCard">
              {{ cardSingola.name }}</h3>
          </div>

          <div class="d-flex align-items-center justify-content-between">

            <h6 v-if="(cardSingola.name != null)" class="text-left mb-0 textBreak">{{ cardSingola.name }}</h6>
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
              <!-- {{ cardSingola.vote_average / 2 }} -->
            </div>


            <div class="">
              <!-- <i class="fa-solid fa-star right opacity-50 d-block" v-for="x in store.filmRequest[0]"></i> -->
              <!-- da chiedere -->

              <!-- Due modi uguali -->
              <!-- <i class="fa-solid fa-star right opacity-50 d-block">{{ (cardSingola.vote_average / 2).toFixed(2) }}</i> -->


              <!-- <i class="fa-solid fa-star right opacity-50 d-block">{{ getRating(cardSingola.vote_average) }}</i> -->

              <div class="">
                <i class="fa-solid fa-star right opacity-50" v-if="getRating(cardSingola.vote_average) >= 1"></i>
                <i class="fa-solid fa-star right opacity-50" v-if="getRating(cardSingola.vote_average) >= 2"></i>
                <i class="fa-solid fa-star right opacity-50" v-if="getRating(cardSingola.vote_average) >= 3"></i>
                <i class="fa-solid fa-star right opacity-50" v-if="getRating(cardSingola.vote_average) >= 4"></i>
                <i class="fa-solid fa-star right opacity-50" v-if="getRating(cardSingola.vote_average) >= 5"></i>
              </div>
            </div>

          </div>

          <!-- Da chiedere come faccio a prendere solo gli elementi che hanno tutti gli elementi? fatto nel div contenitore di tutto questo, cerca "Div contenitore di ogni singola cardSingola" -->
          <p class="text-left text-dark textBreak testoCard notVisibleModale">{{ cardSingola.overview }}</p>
        </div>

      </div>
    </div>


  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

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
  color: #f1f1f1;
}

#similHeader input,
span {
  color: #E5E6E8;
  color: #f1f1f1;
}

.similHeaderWidth {
  width: 90%;
}

.form-control:focus {
  border-color: #E5E6E8 !important;
  border-color: #f1f1f1 !important;
  box-shadow: 0 0 0 0.1rem #E5E6E8 !important;
}

#similHeader i {
  color: #0A0908;
  border-radius: 60px;
  box-shadow: 0 0 2px #E5E6E8;
  padding: 0.5em 0.6em;
  border-color: #E5E6E8;
  border-color: #f1f1f1;
}

.usernameDefault {
  opacity: 0;
  transition: ease-in-out 0.2s;
  z-index: -1;
}

.showUsername {
  opacity: 1 !important;
  z-index: 1;
}

/* .hideUsername {
  opacity: 0 !important;
} */

#avatar {
  max-height: 3rem;
  padding: .5rem 0;
}

.borderHeader {
  border-color: #E5E6E8;
  border-color: #f1f1f1;
}

#similMain {
  height: calc(100vh - 4rem);
  /* Nascondo le scrollbar */
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
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
  color: #f1f1f1;
}

.contenitoreApp {
  background-color: #E5E6E8;
  background-color: #0A0908;
  overflow: auto;
  white-space: nowrap;
}

.ContainerCards {
  width: 90%;
}

/*.containerCardsHeight {
   height: calc(100% - (3rem + 1.5rem));Rimosso perché adesso l'overview sta nella modale */
/* 1.5rem sarebbe lo spacer del margine 
}*/

.content {
  display: contents;
}

p,
h6,
i {
  color: #f1f1f1 !important;
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
  max-height: 60%;
}

.poster {
  width: 342px;
  height: 513px;
  object-fit: fill;
  transition: 0.3s ease-in-out;
  cursor: pointer;
}

.titleInCard {
  top: 12.36px;
  left: 20px;
  opacity: 0;
  color: #f1f1f1;
  transition: 0.3s ease-in-out;
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
}

/* .testoCard {
  display: none;
  opacity: 0;
  transition: 0.3s ease-in-out;
} */

/* Da chiedere come posso togliere il fatto che se hover il testo mi resiza il poster? */

.poster:hover {
  transform: scale(1.1);
  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
  box-shadow: rgba(0, 0, 0, 1) 0px 3px 16px;
  display: block !important;
  /* Da chiedere come faccio a non generare quella compenetrazione? */
}

.widthCards:hover .testoCard {
  /* display: block; */
  opacity: 1;
}

.poster:hover .titleInCard {
  display: block;
  text-shadow: 0px 0px 15px #0A0908 !important;
  opacity: 1;
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

.notVisibleModale {
  display: none;
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
    max-height: 40%;
  }
}
</style>
