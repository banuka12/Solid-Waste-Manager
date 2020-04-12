<template>
<div id="new-vehicle">
<h3>Add New Vehicle</h3>
<div class="row">
    <form @submit.prevent="saveVehicle" class="col s12">
        <div class="row">
            <div class="input-field col s12">
                <input type="text" v-model="vehicle_id"
                required>
                <label>Vehicle_ID#</label>
                </div>
                </div>
        <div class="row">
            <div class="input-field col s12">
                <input type="text" v-model="vehicle_no"
                required>
                <label>Vehicle Number</label>
                </div>
                </div>
        <div class="row">
            <div class="input-field col s12">
                <input type="text" v-model="vehicle_type"
                required>
                <label>Vehicle Type</label>
                </div>
                </div>
                <button type="submit" class="btn">Submit</button>
                <router-link to="/dashboardVehicle" class="btn grey">Cancel</router-link>
    </form>
</div>
</div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'new-vehicle',
    data(){
        return{
            vehicle_id: null,
            vehicle_no: null,
            vehicle_type: null

        }
    },
    methods: {
        saveVehicle() {
            db.collection('vehicles').add({
                vehicle_id: this.vehicle_id,
                vehicle_no: this.vehicle_no,
                vehicle_type: this.vehicle_type
            })
            .then(docRef => this.$router.push('/dashboardVehicle'))
            .catch(error => console.log(err))
        }
    }
}
</script>