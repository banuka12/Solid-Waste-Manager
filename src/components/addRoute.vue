<template>
<div id="new-route">
<h3>New Route</h3>
<div class="row">
    <form @submit.prevent="saveroute" class="col s12">
        <div class="row">
            <div class="input-field col s12">
                <input type="text" v-model="route_id"
                required>
                <label>Route ID#</label>
                </div>
                </div>
                <div class="row">
            <div class="input-field col s12">
                <input type="text" v-model="route_shortName"
                required>
                <label>Short Name</label>
                </div>
                </div>
                <div class="row">
            <div class="input-field col s12">
                <input type="text" v-model="route_Mileage"
                required>
                <label>Route Mileage </label>
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
    name: 'new-route',
    data(){
        return{
            route_id: null,
            route_shortName: null,
            route_Mileage: null

        }
    },
    methods: {
        saveroute() {
            db.collection('routes').add({
                route_id: this.route_id,
                route_shortName: this.route_shortName,
                route_Mileage: this.route_Mileage
            })
            .then(docRef => this.$router.push('/dashboardRoute'))
            .catch(error => console.log(err))
        }
    }
}
</script>