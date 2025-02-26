<template>
    <div class="container" style="width: 60rem;">
        <div class="row">
            <div class="col"></div>
            <div class="card p-3 text-center" style="width: 35rem;">
                <div class="card">
                    <div class="col p-3">
                        <h4>Movimiento!</h4>
                        <p>Esta seguro de eliminar movimiento fianciero !</p>
                        <div class="col p-3">
                            <button class="btn btn-outline-danger" @click="deleteMovement">Eliminiar</button>
                            <button class="btn btn-outline-secondary" @click="cerrar">Cancelar</button>
                        </div>
                    </div>
                </div>
                <footer>
                    <div class="card">
                        <img src="https://cdn.prod.website-files.com/66473e76e9c2d66e80a2a800/675559080ccac30459cae25d_logo%20ikualo%20morado.svg"
                            class="card-img-center logo" alt="logo">
                    </div>
                </footer>
            </div>
            <div class="col"></div>
        </div>



    </div>
</template>

<script setup>

import { defineProps, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import Swal from 'sweetalert2'

const router = useRouter();

const props = defineProps({
    movementId: {
        type: String,
    },
    userId: {
        type: String,
    }
});

const { movementId, userId } = toRefs(props);

const cerrar = () => {
    router.push({ name: 'user', params: { userId: userId.value } });
}

const deleteMovement = async () => {
    try {
        const response = await api.delete(`/movements/delete/${movementId.value}`); // Llama a NestJ
        if (response.data.code == 1) {
            Swal.fire({
                title: 'Movimiento!',
                text: response.data.message,
                icon: 'error',
                confirmButtonText: 'Entendido'
            });
            router.push({ name: 'user', params: { userId: userId.value } });
        } else {
            Swal.fire({
                title: 'Movimiento!',
                text: response.data.message,
                icon: 'warning',
                confirmButtonText: 'Entendido'
            });
        }

    } catch (error) {
        console.error('Error al borrar movimiento', error);
    }
}


</script>


<style scoped>
p span {
    font-weight: bold;
    color: red;
}

header h5 {
    color: red;
}

header {
    margin: 10px;
}

body {
    margin: 10px;
}

footer {
    margin: 10px;
    align-content: center;
}

.cerrar {
    text-align: right;
    margin-right: 10px;
    margin-top: 10px;
    cursor: pointer;
}

div button {
    margin-left: 2px;
}

.logo {
    height: 10%;
    width: 50%;
}
</style>