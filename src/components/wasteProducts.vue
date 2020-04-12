<template>
    <div>
        <h5> Add Solid Waste Items </h5>

        <div class="card products_add-product">
            <div>
                <input required
                v-model="addProductData.product_id"
                class="validate"
                placeholder="No."
                >
                </div>
                <div>
                <input
                v-model="addProductData.date"
                class="validate"
                placeholder="date"
                >
                </div>
                 <div>
                <input
                v-model="addProductData.cardboard"
                class="validate"
                placeholder="cardboard"
                >
                </div>
                <div>
                <input
                v-model="addProductData.plastic"
                class="validate"
                placeholder="plastic"
                >
                </div>
                 <div>
                <input
                v-model="addProductData.water_bottles"
                class="validate"
                placeholder="Plastic bottles"
                >
                </div>
                 <div>
                <input
                v-model="addProductData.polythene"
                class="validate"
                placeholder="polythene"
                >
                </div>
                 <div>
                <input
                v-model="addProductData.tin"
                class="validate"
                placeholder="tin"
                >
                </div>
                <div>
                    <i
                    @click="onAdd"
                     class="material-icons medium">
                       add </i>
                    </div>
                </div>
                
                
                
        <h5>View Report</h5>

        <div
        v-for="product in sortedProducts"
        v-bind:key="product.product_id"
        class="collection">

        <div
        v-if="editId === product.product_id"
        class="collection-item products_list-item"
        v-bind:class="{ 'yellow lighten-4':editId === product.product_id}">
         <div>{{product.product_id}}</div>

         <div>
        <input
        class="validate"
        v-model="editProductData.date"/></div>

        <div>
        <input
        class="validate"
        v-model="editProductData.cardboard"/></div>

        <div>
        <input
        class="validate"
        v-model="editProductData.plastic"/></div>

         <div>
        <input
        class="validate"
        v-model="editProductData.water_bottles"/></div>

         <div>
        <input
        class="validate"
        v-model="editProductData.polythene"/></div>

         <div>
        <input
        class="validate"
        v-model="editProductData.tin"/></div>
       <div>
                    <i
                    @click="onEditSubmit"
                     class="material-icons">
                     check
                    </i>
                    <i
                    @click="onCancel"
                     class="material-icons">
                       cancel</i>
                    </div>
        </div>
        

        

        <div
        v-else 
        class="collection-item products_list-item">
            <div>{{product.product_id}}</div>
            <div>{{product.date}}</div>
            <div>{{product.cardboard}}</div>
            <div>{{product.plastic}}</div>
            <div>{{product.water_bottles}}</div>
            <div>{{product.polythene}}</div>
            <div>{{product.tin}}</div>
            <div>
                    <i
                    @click="onEdit(product)"
                     class="material-icons">
                     mode_edit
                    </i>
                    <i
                    @click="onDelete(product.product_id)"
                     class="material-icons">
                       delete </i>
                    </div>
        </div>
        </div>
        </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'products',
    data(){
        return{
            products: [],
            addProductData: {
                product_id: '',
                date:'',
                cardboard:'',
                plastic:'',
                water_bottles:'',
                polythene:'',
                tin:''
            },
            editId:'',
            editProductData: {
                product_id: '',
                date:'',
                cardboard:'',
                plastic:'',
                water_bottles:'',
                polythene:'',
                tin:''
            }       
            
        }
    },
    computed:{
        sortedProducts (){
            return this.products.slice().sort((a, b) => {
                return a.product_id - b.product_id
            }) 
        }
    },
    created() {
        this.getProducts()
    },

    methods: {
        getProducts (){
        db.collection('Products').get().then(querySnapshot => {
            const products = []
            querySnapshot.forEach(doc => {
               // console.log(doc.data())
                products.push(doc.data())
            })
            this.products = products
        })
    
    },
           onAdd (){
            db.collection('Products').add(this.addProductData).then(this.getProducts)
        },
        onDelete (product_id){
            db.collection('Products')
            .where ('product_id','==',product_id).get
            ()
            .then(querySnapshot => {
                querySnapshot.forEach(doc =>
                {
                    doc.ref.delete().then(this.getProducts)
                })
            })
        },
        onEdit (product) {
            this.editId = product.product_id
            this.editProductData.date = product.date
            this.editProductData.cardboard = product.cardboard
            this.editProductData.plastic = product.plastic
            this.editProductData.water_bottles = product.water_bottles
            this.editProductData.polythene = product.polythene
            this.editProductData.tin = product.tin
        },
        onCancel (){
            this.editId = ''
            this.editProductData.date = ''
            this.editProductData.cardboard = ''
            this.editProductData.plastic = ''
            this.editProductData.water_bottles = ''
             this.editProductData.polythene = ''
            this.editProductData.tin = ''
        },
        onEditSubmit (){
           db.collection('Products')
            .where ('product_id','==',this.editId).get
            ()
            .then(querySnapshot => {
                querySnapshot.forEach(doc =>
                {
                    doc.ref.set({
                        product_id: this.editId,
                        date:this.editProductData.date ,
                        cardboard:this.editProductData.cardboard,
                        plastic:this.editProductData.plastic,
                        water_bottles:this.editProductData.water_bottles ,
                        polythene:this.editProductData.polythene,
                        tin:this.editProductData.tin 
                    }).then(this.getProducts)
                })

                this.onCancel()
            })
        }
    }
}
</script>

<style scoped>
.products_list-item{
    align-items: center;
    display: flex;
    justify-content: space-between;
}
.products_add-product{
    align-items: center;
    display: flex;
    justify-content: space-between;
}
.material-icons {
    cursor: pointer;
}
</style>

