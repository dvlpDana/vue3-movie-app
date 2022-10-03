import { shallowMount } from '@vue/test-utils'
import Search from '~/components/Search'

describe('components/Search.vue', () => {
  let wrapper

  //외부의 자원을 연결하지 않아도 된다면, 자원 연결 없이 최소한의 자원으로 테스트를 할 수 있도록 할 것
  beforeEach(() => {
    wrapper = shallowMount(Search)
  })

  test('선택 가능한 연도의 개수가 일치합니다', () => {
    // 설정
    const year = wrapper.vm.filters.find(f => f.name === 'year')
    const yearLength = new Date().getFullYear() - 1985 + 1
    // 동작
    // 확인
    expect(year.items.length).toBe(yearLength)
  })
})