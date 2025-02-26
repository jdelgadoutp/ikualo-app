<script setup>
import { ref } from 'vue';
import api from '@/services/api.js'; // Importamos Axios
import { useRouter } from 'vue-router';

const users = ref([]);
const userEmail = ref("");
const router = useRouter();


const Consultar = async () => {
    try {
        const response = await api.get(`/users/email/${userEmail.value}`);
        users.value = response.data;
        const id = users.value[0]._id
        router.push({ name: 'user', params: { userId: id } });
        return id;
    } catch (error) {
        console.error('Error al obtener usuarios', error);
    }
};

</script>
<template>
    <div class="card p-5 text-center">
        <div class="card row p-3 marco">
            <div class="col" style="margin: 10px;">
                <img src="https://cdn.prod.website-files.com/66473e76e9c2d66e80a2a800/675559080ccac30459cae25d_logo%20ikualo%20morado.svg"
                class="card-img-top logo" alt="logo">
            </div>
        </div>
        <div class="row p-5">
            <div class="col">
                <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">@</span>
                    <input type="text" class="form-control" placeholder="user@example.com" aria-label="Username"
                        aria-describedby="addon-wrapping" v-model="userEmail">
                    <button type="button" class="btn btn-outline-success" @click="Consultar">Consultar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.logo {
    margin: 0;
    padding: 7%;
    height: 10%;
    width: 10%;
}
</style>