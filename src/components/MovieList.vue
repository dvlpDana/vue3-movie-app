<template>
  <div class="container">
    <div
      :class="{ 'no-result' : !movies.length }" 
      class="inner">
      <div
        v-if="loading" 
        class="spinner-border text-primary"></div>
      <div 
        v-if="message"
        class="message">
        {{ message }}
      </div>
      <div
        v-else 
        class="movies">
        <MovieItem
          v-for="movie in movies"
          :key="movie.imdbID"
          :movie="movie" />
        <MovieItem />
      </div>
    </div>
  </div>
</template>

<!-- movies라는 계산된 데이터는 movies라는 데이터를 받는 MovieItem 컴포넌트에서 사용할 수 있음
  MovieItem에 movie를 props로 전달할 수 있음
  계산된 데이터의 movies는 배열 데이터임, 배열 데이터 안에는 각각의 객체 데이터가 10개까지 들어있음
  movies라는 데이터에서 각각의 객체를 v-for 디렉티브를 활용하여 'movie'라는 이름으로 받아올 수 있고, 
  'movie'에 들어있는 imdbID라는 문자를 속성을 key에 넣어 각각의 데이터에 고유한 속성으로 만들어줌  
  객체 데이터인 'movie'를 movie:라는 이름으로 MovieItem에 전달해주는 것
-->

<script>
import MovieItem from '~/components/MovieItem'

export default {
  components: {
    MovieItem
  },
  computed: {
    movies() {
      return this.$store.state.movie.movies
    },
    message() {
      return this.$store.state.movie.message
    },
    loading() {
      return this.$store.state.movie.loading
    }
  }
}
</script>


<style lang="scss" scoped>
@import "~/scss/main";
.container {
  margin-top: 30px;
  .inner {
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
    text-align: center;
    &.no-result {
      padding: 70px 0;
    }
  }
  .message {
    color: $gray-400;
    font-size: 20px;
  }
  .movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>