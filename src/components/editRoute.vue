<template>
<div id="edit-route">
<h3>Edit Route</h3>
<div class="row">
    <form @submit.prevent="updateRoute" class="col s12">
        <div class="row">
            <div class="input-field col s12">
                <input disabled type="text" v-model="route_id"
                required>
                
                </div>
                </div>
                <div class="row">
            <div class="input-field col s12">
                <input type="text" v-model="route_shortName"
                required>
               
                </div>
                </div>
                <div class="row">
            <div class="input-field col s12">
                <input type="text" v-model="route_Mileage"
                required>
                
                </div>
                </div>
               
                <button type="submit" class="btn">Submit</button>
                <router-link to="/dashboardRoute" class="btn grey">Cancel</router-link>
    </form>
</div>
</div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'edit-route',
    data(){
        return{
            route_id: null,
            route_shortName: null,
            route_Mileage: null

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
                    this.route_shortName = doc.data().route_shortName
                    this.route_Mileage = doc.data().route_Mileage
                })
            })
        },
        updateRoute() {
            db.collection('routes').where('route_id', '==', this.$route.params.route_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        route_id: this.route_id,
                        route_shortName: this.route_shortName,
                        route_Mileage: this.route_Mileage
                    })
                    .then(() => {
                        this.$router.push({name:'view-route',
                        params: {route_id: this.route_id}})
                    })
                })
            })

        }


    }
}
</script>