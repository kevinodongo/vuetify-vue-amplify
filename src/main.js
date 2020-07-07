import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
import aws_exports from "./aws-exports";
Amplify.configure(aws_exports);
Vue.use(AmplifyPlugin, AmplifyModules);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
