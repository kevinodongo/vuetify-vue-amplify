import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

/* eslint-disable */
router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user;
    Vue.prototype.$Amplify.Auth.currentAuthenticatedUser()
      .then(data => {
        if (data && data.signInUserSession) {
          user = data;
        }
        next();
      })
      .catch(e => {
        next({
          path: "/"
        });
      });
  }
  next();
});


export default router;
