<template>
<div id="view-route">
<ul class="collection with-header">
    <li class="collection-header"><h4>{{name}}
        </h4> </li> 
        <li class="collection-item">Route ID # : {{route_id}}</li>
        <li class="collection-item">Route Description : {{route_shortName}}</li>
        <li class="collection-item">Route Mileage : {{route_Mileage}}</li>
    
    <div id="map">

<gmap-map v-bind:center="center" v-bind:zoom="7" style="height:225px">
<gmap-marker v-bind:key-"index" v-for="(m,index) in markers" v-bind:position="m.position" v-bind:clickable="true"></gmap-marker>
</gmap-map>
</div>
        </ul>
        <router-link to="/dashboardRoute" class="btn grey">Back</router-link>
        <button @click="deleteRoute" class="btn red">Delete</button>

<div class="fixed-action-btn">
<router-link v-bind:to="{name: 'edit-route',
params: {route_id:route_id}}" 
class="btn-floating btn-large red">
<i class="fa fa-pencil" aria-hidden="true"></i>
</router-link>





</div>

</div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'view-route',
    data(){
        return{
            route_id: null,
            route_shortName: null,
            route_Mileage: null,
        
        center:{lat:6.927079,lng:79.861244},
        markers:[
            {
                position:{lat:6.927079,lng:79.861244}
            },
            {
                position:{lat:6.927079,lng:79.861244}
            }
        ]
    

        }
    },
    beforeRouteEnter (to, from, next) {
        db.collection('routes').where('route_id',
        '==', to.params.route_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.route_id=doc.data().route_id
                    vm.route_shortName = doc.data().route_shortName
                     vm.route_Mileage= doc.data().route_Mileage
                })
            })
        })

    },
    watch: {
        '$route' : 'fetchData'
    },
    methods: {
        fetchData () {
            db.collection('routes').where('route_id', '==', this.$route.params.route_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.route_id=doc.data().route_id                    
                    this.route_shortName = doc.data().nroute_shortNameame
                    this.route_Mileage = doc.data().route_Mileage
                
                })
            })
        },
        deleteRoute () {
            if(confirm('Are you sure?')) {
                db.collection('routes').where('route_id', '==', this.$route.params.route_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.delete();
                    this.$router.push('/dashboardRoute')
                })
            })
            }
        }


    }
}
</script>