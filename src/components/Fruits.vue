<template>
  <section v-if="hasFruit">
    <h1>Fruits</h1>
    <ul>
      <li
        v-for="fruit in fruits"
        :key="fruit">
        {{ fruit }}
      </li>
    </ul>
  </section>
  <section>
    <h1>Reverse Fruits</h1>
    <ul>
      <li
        v-for="fruit in reverseFruits"
        :key="fruit">
        {{ fruit }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      fruits: [
        'Apple', 'Cherry', 'Banana'
      ]
    }
  },
  // 계산된 데이터 : 데이터 옵션에 정의해놓은 특정한 데이터를 추가적으로 연산을 통해 정의하고, 정의한 값을 반환해서 사용할 수 있는 새로운 데이터
  computed: {
    hasFruit() {
      return this.fruits.length > 0
    },
    reverseFruits() {
      return this.fruits.map(fruit => {
        // 'Apple' => ['A', 'p', 'p', 'l', 'e'] => ['e', 'l', 'p','p','A' ] => 'elppA'
        return fruit.split('').reverse().join('')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  section {
    padding: 2rem;
    margin: 1rem;
    border: 1px solid lightblue;
    line-height: 1.6;
    h1 {
      font-size: larger;
      font-weight: bolder;
      text-transform: uppercase;
    }
  }
</style>