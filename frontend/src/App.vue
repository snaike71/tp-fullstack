<script setup lang="ts">
import Form from './components/Form.vue';
import NavBar from './components/NavBar.vue';
import Movie from './components/Movie.vue';
import { recupDate } from './func/utils'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { MovieProps, MoviesProps } from './type';
import Toast from './components/Toast.vue';

const NavBarValue = ref("menu")
const ListOfmovies: Ref<MoviesProps> = ref([])
const ThreeLastMovie: Ref<MoviesProps> = ref([])
const setNavBarValue = (value: string) => {
  NavBarValue.value = value
}

const getMovie = async () => {
  try {
    const res = await fetch("http://localhost:8081/post", {
      method: "GET",
    })
    const result = await res.json();
    ListOfmovies.value = result
    getLastMovies(result)
  }
  catch (err) {
    console.error("Error:", err);
  }

}
const getLastMovies = (result: MoviesProps, number: number = 3) => {
  let threeLastMovie: MoviesProps = []
  for (let k = 0; k < number; k++) {
    let lastMovie: MovieProps = {
      _id: "",
      titre: "",
      année: 0,
      note: 0,
      createdAt: "",
      updatedAt: "",
      __v: 0
    }
    result.map((movie: MovieProps) => {
      if (recupDate(movie.updatedAt) > recupDate(lastMovie.updatedAt) && (movie !== threeLastMovie[0]) && (movie !== threeLastMovie[1]) && (movie !== threeLastMovie[2])) {
        lastMovie = movie
      }
    })
    threeLastMovie.push(lastMovie)
  }

  ThreeLastMovie.value = threeLastMovie
}

const searchMovie = (value: MoviesProps) => {
  ListOfmovies.value = value
}

const onClickSearch = () => {
  setNavBarValue('search')
  getMovie()
}

getMovie()

</script>

<template>
  <div class="nav-contain">
    <NavBar @emit-ajout="setNavBarValue('ajout')" @emit-menu="setNavBarValue('menu')" @emit-search-menu="onClickSearch"
      @emit-search="(v) => { searchMovie(v) }"></NavBar>

  </div>
  <div v-if="NavBarValue === 'ajout'"  style="display: flex;flex-direction: column">
    <div class="new-contain">
      <p>Ajout de films</p>
    </div>
    <div class="form-contain">
      <Form @new-movie="getMovie()"></Form>
    </div>
  </div>
  <div v-else-if="NavBarValue === 'menu'" style="display: flex;flex-direction: column">
    <div class="new-contain">
      <p>Dernier ajout</p>
    </div>
    <div class="list-last-films">
      <div class="list-contain" v-for="movie in ThreeLastMovie">
        <Movie :movie="movie" @emit-update="getMovie()" :id="movie._id" :title="movie.titre" :date="movie.année"
          :note="movie.note">
        </Movie>
      </div>
    </div>
  </div>
  <div v-else style="display: flex;flex-direction: column">
    <div class="new-contain">
      <p>Liste films</p>
    </div>
    <div class="list-films">
      <div class="list-contain" v-for="movie in ListOfmovies">
        <Movie :movie="movie" @emit-update="getMovie()" :id="movie._id" :title="movie.titre" :date="movie.année"
          :note="movie.note">
        </Movie>
      </div>
    </div>
  </div>
</template>

<style>
.nav-contain {
  min-height: 10vh;
  width: 100vi;
}

.form-contain {
  display: flex;
  height: 80vh;
  justify-content: center;
  align-items: center;
}

.list-films-container {
  display: flex;
  height: 80vh;
}

.list-films {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;

}

.list-last-films {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;

}

.list-contain {
  display: flex;
  margin: 10px;
  justify-content: center;
}

.new-contain {
  display: flex;
  justify-content: center;

}

.new-contain p {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--last-color);
  width: 50%;
  color : var(--first-color);
  font-size: x-large;
  border-radius: 20px;
  height: 50px;
}

@media (min-width: 1000px) {

  .list-films {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
  }

  .list-last-films {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
  }
}
</style>


