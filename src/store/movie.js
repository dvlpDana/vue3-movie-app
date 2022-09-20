import axios from "axios";
//중복되는 api 값이 있다면, 중복의 문제를 해결하기 위해 lodash/uniqBy 메소드 활용할 수 있음
import _uniqBy from "lodash/uniqBy";

export default {
  //namespaced : movie.js가 store에서 하나의 모듈처럼 사용 가능하다는 것을 명시적으로 나타내는 옵션
  namespaced: true,
  //state : 데이터
  state: () => ({
    movies: [],
    message: 'Search for the movie title!',
    loading: false
  }),
  //getters : computed, 계산된 데이터
  getters: {},
  // mutations : methods, 변이, 데이터의 정의는 mutations에서 정의되어져 있는 개념에서만 가능하도록 하고 기타 다른 작업에서는 수정을 막아 놓는 것 => 데이터의 복잡성 줄이기
  mutations: {
    updateState(state, payload) {
      //객체 데이터만 가지고 새로운 배열 데이터를 만들어 줌
      //['movies', 'message', 'loading']
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
    resetMovies(state) {
      state.movies = [];
      state.message = _defaultMessage
      state.loading = false
    },
  },
  //actions : methods, 특정 데이터의 직접적인 수정은 불가능함, 비동기로 동작함
  actions: {
    async searchMovies({ state, commit }, payload) {
      if(state.loading) return

      commit('updateState', {
        message: '',
        loading: true
      })

      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1,
        });
        const { Search, totalResults } = res.data;
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID'),
        });

        //ceil = 올림!
        const total = parseInt(totalResults, 10);
        const pageLength = Math.ceil(total / 10);

        //추가요청!
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1) {
            //중괄호 안에 로직이 1개 뿐이라면 중괄호 생략가능
            if (page > (payload.number / 10)) break;
            const res = await _fetchMovie({
              ...payload,
              page
            });
            const { Search } = res.data;
            commit('updateState', {
              movies: [
              ...state.movies, 
              ..._uniqBy(Search, 'imdbID')
              ]
            });
          }
        }
      } catch ({ message }) {
        commit('updateState', {
          movies:[],
          message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMovieWithId(context, payload) {
      try {
        const res = await _fetchMovie(payload)
        console.log(res)
      } catch(error) {
        
      }
    }
  },
};

function _fetchMovie(payload) {
  const { title, type, year, page } = payload;
  const OMDB_API_KEY = '7035c60c';
  const url = id 
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        if (res.data.Error) {
          reject(res.data.Error);
        }
        resolve(res);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
}
