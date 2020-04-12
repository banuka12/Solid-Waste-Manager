<template>
<div id="view-vehicle">
<ul class="collection with-header">
    <li class="collection-header"><h4>{{vehicle_type}}
        </h4> </li> 
        <li class="collection-item">Vehicle ID # : {{vehicle_id}}</li>
        <li class="collection-item">Vehicle Number : {{vehicle_no}}</li>
    
        </ul>
        <router-link to="/dashboardVehicle" class="btn grey">Back</router-link>
        <button @click="deleteVehicle" class="btn red">Delete</button>



</div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'view-vehicle',
    data(){
        return{
            vehicle_id: null,
            vehicle_no: null,
            vehicle_type:null
            
        
    

        }
    },
    beforeRouteEnter (to, from, next) {
        db.collection('vehicles').where('vehicle_id',
        '==', to.params.vehicle_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.vehicle_id=doc.data().vehicle_id
                    vm.vehicle_no= doc.data().vehicle_no
                    vm.vehicle_type = doc.data().vehicle_type
                    
                })
            })
        })

    },
    watch: {
        '$route' : 'fetchData'
    },
    methods: {
        fetchData () {
            db.collection('vehicles').where('vehicle_id', '==', this.$route.params.vehicle_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.vehicle_id=doc.data().vehicle_id                    
                    this.vehicle_type = doc.data().vehicle_type
                    this.vehicle_no = doc.data().vehicle_no
                
                })
            })
        },
        deleteVehicle () {
            if(confirm('Are you sure?')) {
                db.collection('vehicles').where('vehicle_id', '==', this.$route.params.vehicle_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.delete();
                    this.$router.push('/dashboardVehicle')
                })
            })
            }
        }


    }
}
</script>