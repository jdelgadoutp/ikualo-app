<template>
    <div class="card p-4 text-center" style="width: 60rem;">
        <header>
            <div class="card p-1">
                <div class="col cerrar">
                    <img src="@/assets/close-icon.svg" alt="close" @click="cerrar">
                </div>
            </div>
        </header>
        <div class="row p-3">
            <div class="col text-center">
                <img src="@/assets/avatar.png" alt="Avatar" class="avatar">
                <div class="col text-center p-1">
                    <h3>Hola {{ this.users.name }}</h3>
                </div>
            </div>
            <div class="col text-center">
                <h2>Capital actual</h2>
                <h1 class="verde"> {{ this.formatCurrency(this.users.balance) }}</h1>
            </div>
        </div>
        <div class="col-12 text-end">
            <img src="@/assets/plus.png" alt="Agregar" class="agregar" @click="adicionar">
        </div>
        <div class="row tabla">
            <table id="table" class="table table-hover mt-0">
                <thead class>
                    <tr>
                        <th scope="col" class="text-center" v-for="registro in fields" :key="registro._id">
                            {{ registro.label }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <List v-for="{ _id, date, type, value, description } in movements" :key="_id" :_id="_id"
                        :date="date" :type="type" :value="value" :description="description" :userId="this.users._id">
                    </List>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

import api from '@/services/api.js'; // Importamos Axios
import List from './movements/List.vue';

export default {
    props: {
        userId: {
            type: String,
            default: '',
        }
    },
    data() {
        return {
            users: {
                name: '',
                balance: 0,
            },
            fields: [
                { key: 'date', label: 'Fecha' },
                { key: 'type', label: 'Tipo' },
                { key: 'value', label: 'Valor' },
                { key: 'description', label: 'Descripción' },
                { key: 'delete', label: 'Eliminar' }
            ],
            movements: [],
        }
    },
    methods: {
        async getUser() {
            try {
                const response = await api.get(`/users/${this.userId}`); // Llama a NestJ
                this.users = response.data;
            } catch (error) {
                console.error('Error al obtener usuarios', error);
            }
        },
        async getMovements() {
            try {
                const response = await api.get(`/movements/${this.userId}`); // Llama a NestJ
                this.movements = response.data;
            } catch (error) {
                console.error('Error al obtener usuarios', error);
            }
        },
        async adicionar() {
            this.$router.push({ name: 'addmovement', params: { userId: this.userId } })
        },
        async cerrar() {
            this.$router.push({ name: 'login' })
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 2
            }).format(value);
        }
    },
    created() {
        this.getUser();
        this.getMovements();
    },
    components: {
        List,
    },
}

</script>

<style>
.avatar {
    margin: 0;
    width: 30%;
    height: 60%;
    background-color: white;
    border-radius: 25%;
}

.agregar {
    margin: 0;
    width: 8%;
    height: 8%;
    border-radius: 25%;
    padding: 10px;
}

.verde {
    text-align: center;
    color: green;
    ;
    padding: 10px;
}

.rojo {
    text-align: center;
    color: red;
    padding: 10px;
}

.cerrar {
    text-align: right;
    margin-right: 10px;
    margin-top: 10px;
    cursor: pointer;
}
</style>