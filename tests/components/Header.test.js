import { shallowMount } from '@vue/test-utils'
//사용하지 않는 플러그인은 연결하지 않도록 유의할 것, 최소한의 자원만 활용하여 효율적으로 테스트하기 위함
import store from '~/store'
import router from '~/routes'
import Header from '~/components/Header'

describe('components/Header.vue', () => {
  let wrapper
//각각의 테스트 함수 내부에서는 고유의 값으로 테스트를 할 수 있도록 값이 오염되지 않도록 하는 것이 중요함
//테스트 실행 전, 테스트의 상세 페이지로 이동해서 header라는 컴포넌트를 연결하여 테스트를 진행할 수 있도록 설정함
  beforeEach(async () => {
    window.scrollTo = jest.fn() // Mock
    router.push('/movie/tt1234567')
    await router.isReady()
    wrapper = shallowMount(Header, {
      global: {
        plugins: [
          store,
          router
        ]
      }
    })
  })

  test('경로 정규표현식이 없는 경우 일치하지 않습니다', () => {
    // 설정
    const regExp = undefined
    // 동작
    // 확인
    expect(wrapper.vm.isMatch(regExp)).toBe(false)
  })

  test('경로 정규표현식과 일치해야 합니다', () => {
    // 설정
    const regExp = /^\/movie/
    // 동작
    // 확인
    expect(wrapper.vm.isMatch(regExp)).toBe(true)
  })

  test('경로 정규표현식과 일치하지 않아야 합니다', () => {
    // 설정
    const regExp = /^\/dana/
    // 동작
    // 확인
    expect(wrapper.vm.isMatch(regExp)).toBe(false)
  })
})