import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import DashboardVehicle from '@/components/DashboardVehicle';
import dashboardRoutes from '@/components/dashboardRoutes';
import NewEmployee from '@/components/NewEmployee';
import ViewEmployee from '@/components/ViewEmployee';
import EditEmployee from '@/components/EditEmployee';
import Login from '@/components/Login';
import Home from '@/components/Home';
import Register from '@/components/Register';
import addVehicle from '@/components/addVehicle';
import ViewVehicles from '@/components/ViewVehicles';
import addRoute from '@/components/addRoute';
import editRoute from '@/components/editRoute';
import ViewRoute from '@/components/ViewRoute';
import wasteProducts from '@/components/wasteProducts';
import firebase from 'firebase';



import * as VueGoogleMaps from 'vue2-google-maps';
Vue.use(VueGoogleMaps,{
  load:{
    key:'AIzaSyDe-ydH1lyvRQnJv36vv69AIs9njBziTqA'
  }
});


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta:{
        requiresAuth: true
      }
    },

    {
      
      path: '/dashboardVehicle',
      name: 'dashboardVehicle',
      component: DashboardVehicle,
      meta:{
        requiresAuth: true
      }
    },

    {
      
      path: '/prod',
      name: 'wasteProducts',
      component: wasteProducts,
      meta:{
        requiresAuth: true
      }
    },

    {
      
      path: '/dashboardRoute',
      name: 'dashboardRoute',
      component: dashboardRoutes,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta:{
        requiresAuth: true
      }
    },

    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        requiresGuest: true
      }
    },

    {
      path: '/register',
      name: 'register',
      component: Register,
      meta:{
        requiresGuest: true
      }
    },


    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee,
      meta:{
        requiresAuth: true
      } 
    },
    
    {
      path: '/newVehicle',
      name: 'new-vehicle',
      component: addVehicle,
      meta:{
        requiresAuth: true
      }
      
    },

    {
      path: '/newRoute',
      name: 'new-route',
      component: addRoute,
      meta:{
        requiresAuth: true
      }
      
    },
    {
      path: '/edit/:employee_id',
      name: 'edit-employee',
      component: EditEmployee,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/:employee_id',
      name: 'view-employee',
      component: ViewEmployee,
      meta:{
        requiresAuth: true
      }
    },

    
    {
      path: '/:vehicle_id',
      name: 'view-vehicle',
      component: ViewVehicles,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/edit/:route_id',
      name: 'edit-route',
      component: editRoute,
      meta:{
        requiresAuth: true
      }
    },

    {
      path: '/:route_id',
      name: 'view-route',
      component: ViewRoute,
      meta:{
        requiresAuth: true
      }
    },
   

  ]
});

router.beforeEach((to, from, next) => {
  //check for requiredAuth guard
  if(to.matched.some(record => record.meta.requiresAuth)){
    //Check if NOT logged in
    if(!firebase.auth().currentUser){
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    }else {
      next();
    }
  }else if(to.matched.some(record => record.meta.requiresGuest)){
    //Check if logged in
    if(firebase.auth().currentUser){
      next({
        path: '/home',
        query: {
          redirect: to.fullPath
        }
      });
    }else {
      next();
    }

  }else{
    next();
  }
})

export default router;
