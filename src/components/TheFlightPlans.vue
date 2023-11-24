<template>
    <h1 class="text-4xl text-center m-7">Flight Plans</h1>

    <div class="flex flex-col justify-around w-full px-5">

        <form class="flex flex-col text-center" @submit.prevent="enviarDatos">


            <div class="overflow-x-auto">
                <table class="table">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th></th>
                            <th>Select</th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- row 1 -->
                        <tr class="bg-base-200">
                            <th>1</th>
                            <td><input type="checkbox" v-model="selectedRows" value="1"></td>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                        <!-- row 2 -->
                        <tr>
                            <th>2</th>
                            <td><input type="checkbox" v-model="selectedRows" value="2"></td>
                            <td>Hart Hagerty</td>
                            <td>Desktop Support Technician</td>
                            <td>Purple</td>
                        </tr>
                        <!-- row 3 -->
                        <tr>
                            <th>3</th>
                            <td><input type="checkbox" v-model="selectedRows" value="3"></td>
                            <td>Brice Swyre</td>
                            <td>Tax Accountant</td>
                            <td>Red</td>
                        </tr>
                    </tbody>
                </table>
                <button @click="deleteSelected">Delete Selected</button>
            </div>

        </form>
    </div>
</template>

<script setup>

// const enviarDatos = async ( ()=> {

// });

</script>