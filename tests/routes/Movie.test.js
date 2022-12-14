import { shallowMount } from '@vue/test-utils'
import store from '~/store'
import router from '~/routes'
import loadImage from '~/plugins/loadImage'
import Movie from '~/routes/Movie'

//Movie.vue의 requestDiffSizeImage 메소드가 정상 동작하는지, created에서 id: this.$route.params.id가 정상적으로 id를 받아오는지 확인하기 위한 테스트

describe('routes/Movie.vue', () => {
  let wrapper

  beforeEach(async () => {
    window.scrollTo = jest.fn() // Mock
    router.push('/movie/tt1234567')
    await router.isReady()
    wrapper = shallowMount(Movie, {
      global: {
        plugins: [
          store,
          router,
          loadImage
        ]
      }
    })
  })

  test('최초 접속한 URL의 파라미터를 확인합니다', () => {
    // 설정
    // 동작
    // 확인
    expect(wrapper.vm.$route.params.id).toBe('tt1234567')
  })

  test('지정한 이미지 크기로 URL을 변경합니다', () => {
    // 설정
    const url = 'https://google.com/sample_image_SX300.jpg'
    // 동작
    // 확인
    expect(wrapper.vm.requestDiffSizeImage(url)).toContain('SX700')
    expect(wrapper.vm.requestDiffSizeImage(url, 900)).toContain('SX900')
  })

  test('정상적인 이미지 주소가 아닌 경우 빈 문자를 반환합니다', () => {
    expect(wrapper.vm.requestDiffSizeImage()).toBe('')
    // N/A : 해당사항 없음
    expect(wrapper.vm.requestDiffSizeImage('N/A')).toBe('')
  })
})