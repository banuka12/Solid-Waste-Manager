<template>
<div id="dashboard">
<ul class= "collection with-header">
    <li class="collection-header"><h4>Employee Details</h4></li>
    <li v-for="employee in employees"
    v-bind:key="employee.id"
    class="collection-item" >
    <div class="chip">{{employee.contact_no}} </div>
    {{employee.employee_id }} : {{ employee.name}}
    
    <router-link class="secondary-content"
    v-bind:to="{name: 'view-employee', params: {employee_id: employee.employee_id}}">
    <i class="fa fa-eye"></i>
    </router-link>
    </li>
    </ul>
    
   

<div class="fixed-action-btn">
<router-link to="/new" class="btn-floating btn-large red">
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
            employees: []

        }
    },
    created (){
        db.collection('employees').orderBy('contact_no').get().then(querySnapshot=> {
            querySnapshot.forEach(doc => {
                
                const data = {
                    'id': doc.id,
                    'employee_id': doc.data().employee_id,
                    'name': doc.data().name,
                    'contact_no': doc.data().contact_no
                    


                }
                this.employees.push(data)

            })
        })

    }
}
</script>