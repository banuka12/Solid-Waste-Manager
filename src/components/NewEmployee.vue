<template>
<div id="new-employee">
<h3>New Employee</h3>
<div class="row">
    <form @submit.prevent="saveEmployee" class="col s12">
        <div class="row">
            <div class="input-field col s12">
                <input type="text" v-model="employee_id"
                required>
                <label>Employee ID#</label>
                </div>
                </div>
                <div class="row">
            <div class="input-field col s12">
                <input type="text" v-model="name"
                required>
                <label>Name</label>
                </div>
                </div>
                <div class="row">
            <div class="input-field col s12">
                <input type="text" v-model="contact_no"
                required>
                <label>Contact Number</label>
                </div>
                </div>
                
                <button type="submit" class="btn">Submit</button>
                <router-link to="/" class="btn grey">Cancel</router-link>
    </form>
</div>
</div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'new-employee',
    data(){
        return{
            employee_id: null,
            name: null,
            contact_no: null

        }
    },
    methods: {
        saveEmployee() {
            db.collection('employees').add({
                employee_id: this.employee_id,
                name: this.name,
                contact_no: this.contact_no
            })
            .then(docRef => this.$router.push('/'))
            .catch(error => console.log(err))
        }
    }
}
</script>