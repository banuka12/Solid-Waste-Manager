<template>
<div id="dashboard">
<ul class= "collection with-header">
    <li class="collection-header"><h4>Route Details</h4></li>
    <li v-for="route in routes"
    v-bind:key="route.id"
    class="collection-item" >
    <div class="chip">{{route.route_shortName}} </div>
    {{route.route_id }} : {{ route.route_Mileage}}
    
    <router-link class="secondary-content"
    v-bind:to="{name: 'view-route', params: {route_id: route.route_id}}">
    <i class="fa fa-eye"></i>
    </router-link>
    </li>
    </ul>
    
   

<div class="fixed-action-btn">
<router-link to="/newRoute" class="btn-floating btn-large red">
<i class="fa fa-plus" aria-hidden="true"></i>
</router-link>
</div>
</div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'dashboard',
    data(){
        return{
            routes: []

        }
    },
    created (){
        db.collection('routes').orderBy('route_shortName').get().then(querySnapshot=> {
            querySnapshot.forEach(doc => {
                
                const data = {
                    'id': doc.id,
                    'route_id': doc.data().route_id,
                    'route_shortName': doc.data().route_shortName,
                    'route_Mileage': doc.data().route_Mileage
                    


                }
                this.routes.push(data)

            })
        })

    }
}
</script>