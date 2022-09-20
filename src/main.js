import { createApp } from "vue";
import App from "./App.vue";
//특정한 폴더 있는 index.js 파일은 파일명을 경로상에 굳기 입력하지 않아도 연결됨, 만약 다른 이름을 지정한다면, 그 이름은 경로에 지정해주어야 함
import router from "./routes";
import store from "./store"

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
