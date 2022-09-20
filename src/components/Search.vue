<template>
  <div class="container">
    <input 
      v-model="title" 
      type="text"
      class="form-control"
      placeholder="Search for Movies, Series & more"
      @keyup.enter="apply" />
    <div class="selects">
      <select 
        v-model="$data[filter.name]"
        v-for="filter in filters"
        :key="filter.name" 
        class="form-select">
        <option 
          v-if="filter.name === 'year'"
          value="">
          All Years
        </option>
        <option 
          v-for="item in filter.items"
          :key="item">
        {{ item }}
        </option>
      </select>
    </div>
    <button class="btn btn-primary" @click="apply">
      Apply
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      type: 'movie',
      number: 10,
      year: '',
      filters: [
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          items: (() => {
            const years = []
            const thisYear = new Date().getFullYear() //
            for (let i = thisYear; i >= thisYear - 30; i -= 1) {
              years.push(i)
            }
            return years
           })()
        }
      ]
    };
  },
  methods: {
    async apply() {
      //movie.js의 actions에 접근하는 메소드 dispatch
      //매개변수로 payload를 전달할 수 있고, payload는 하나의 객체 데이터임
      this.$store.dispatch('movie/searchMovies', {
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  > * {
    margin-right: 10px;
    font-size: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    } 
  }
  .btn {
    widows: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0;
  }
}
</style>
