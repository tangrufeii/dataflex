import HomeComponent from "@/views/common/home/index.vue";
export const CONSTANT_ROUTES = [
  {
    name: "root",
    path: "/",
    visible: 0,
    redirect: "/home",
    meta: { hidden: false }
  },
  {
    name: "home",
    path: "/home",
    visible: 0,
    component: HomeComponent
  }
];
