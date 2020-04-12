<template>
    <div id="home">
        <br>
        <br>
        <br>
        
        
        <div id="buttons">
        <ul>
            <li><router-link to="/dashboardVehicle" class="btn green">Register Vehicles</router-link></li><br>
            <br><li><router-link to="/" class="btn green">Register Employees</router-link></li><br>
            <br><li><router-link to="/dashboardRoute" class="btn green">Register Routes</router-link></li><br>
            <br><li><router-link to="/" class="btn green">Assign Daily Routine</router-link></li><br>
            <br><li><router-link to="/prod" class="btn green">Garbage Collection Details</router-link></li><br>
            <br><li><router-link to="" class="btn green">Forecasting</router-link></li>
           
        </ul>  
        
    </div>
    </div>
</template>

<style scoped>
  #buttons{
    margin-left: 35%;
  }

  .btn{
      width:50%;
      height:60px;
      margin-top:2%;
      padding-top:1.5%;
      color:black;
      font-weight:bold;
      
  }

  </style>