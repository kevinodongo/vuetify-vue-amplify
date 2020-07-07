import Home from "../views/Home.vue";
const routes = [
  // public routes
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("../views/Contact.vue")
  },
  //auth routes
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/auth/Login.vue")
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("../components/auth/SignUp.vue")
  },
  {
    path: "/loginhelp",
    name: "LoginHelp",
    component: () => import("../components/auth/LoginHelp.vue")
  },
  // private routes
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../components/private/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  // otherwise redirect to home
  { path: "*", redirect: "/" }
];
export default routes;
