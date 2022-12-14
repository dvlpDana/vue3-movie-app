import axios from "axios";
//중복되는 api 값이 있다면, 중복의 문제를 해결하기 위해 lodash/uniqBy 메소드 활용할 수 있음
import _uniqBy from "lodash/uniqBy";
const _defaultMessage = "Search for the movie title!";

export default {
  //namespaced : movie.js가 store에서 하나의 모듈처럼 사용 가능하다는 것을 명시적으로 나타내는 옵션
  namespaced: true,
  // Vue.js data 옵션과 유사함, 상태(State)는 함수로 만들어서 객체 데이터를 반환해야 가변 이슈(데이터 불변성)가 발생하지 않습니다!
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),
  //getters : Vue.js computed과 유사함, 계산된 데이터
  getters: {},
  // Vue.js methods 옵션과 유사함, 상태(State)는 변이(Mutations)를 통해서만 값을 바꿀 수 있음
  // mutations : methods, 변이, 데이터의 정의는 mutations에서 정의되어져 있는 개념에서만 가능하도록 하고 기타 다른 작업에서는 수정을 막아 놓는 것 => 데이터의 복잡성 줄이기
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
    resetMovies(state) {
      state.movies = [];
      state.message = _defaultMessage;
      state.loading = false;
    }
  },
  //Vue.js methods 옵션과 유사함, 변이(Mutations)가 아닌 나머지 모든 로직을 관리합니다.
  //actions : methods, 특정 데이터의 직접적인 수정은 불가능함, 비동기로 동작함
  actions: {
    async searchMovies({ state, commit }, payload) {
      // const { title, type, number, year } = payload
      if (state.loading) return;

      commit("updateState", {
        message: "",
        loading: true
      });

      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1
        });
        const { Search, totalResults } = res.data;
        commit("updateState", {
          movies: _uniqBy(Search, "imdbID")
        });

        // ceil = 올림!
        const total = parseInt(totalResults, 10);
        const pageLength = Math.ceil(total / 10); // 총 페이지의 길이

        // 추가 요청!
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1) {
            if (page > payload.number / 10) break;
            const res = await _fetchMovie({
              ...payload,
              page
            });
            const { Search } = res.data;
            commit("updateState", {
              movies: [...state.movies, ..._uniqBy(Search, "imdbID")]
            });
          }
        }
      } catch ({ message }) {
        commit("updateState", {
          movies: [],
          message
        });
      } finally {
        commit("updateState", {
          loading: false
        });
      }
    },
    async searchMovieWithId({ state, commit }, payload) {
      // const { id } = payload
      if (state.loading) return;

      commit("updateState", {
        theMovie: {},
        loading: true
      });

      try {
        const res = await _fetchMovie(payload);
        commit("updateState", {
          theMovie: res.data
        });
      } catch (error) {
        commit("updateState", {
          theMovie: {}
        });
      } finally {
        commit("updateState", {
          loading: false
        });
      }
    }
  }
};

async function _fetchMovie(payload) {
  return await axios.post('/.netlify/functions/movie', payload)
}
