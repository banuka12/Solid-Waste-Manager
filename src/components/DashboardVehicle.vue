<template>
<div id="dashboard">
<ul class= "collection with-header">
    <li class="collection-header"><h4>Vehicle Details</h4></li>
    <li v-for="vehicle in vehicles"
    v-bind:key="vehicle.id"
    class="collection-item" >
    <div class="chip">{{vehicle.vehicle_no}} </div>
    {{vehicle.vehicle_id }} : {{ vehicle.vehicle_type}}
    
    <router-link class="secondary-content"
    v-bind:to="{name: 'view-vehicle', params: {vehicle_id: vehicle.vehicle_id}}">
    <i class="fa fa-eye"></i>
    </router-link>
    </li>
    </ul>
    
   

<div class="fixed-action-btn">
<router-link to="/newVehicle" class="btn-floating btn-large red">
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
            vehicles: []

        }
    },
    created (){
        db.collection('vehicles').orderBy('vehicle_id').get().then(querySnapshot=> {
            querySnapshot.forEach(doc => {
                
                const data = {
                    'id': doc.id,
                    'vehicle_id': doc.data().vehicle_id,
                    'vehicle_no': doc.data().vehicle_no,
                    'vehicle_type': doc.data().vehicle_type
                    
                    


                }
                this.vehicles.push(data)

            })
        })

    }
}
</script>