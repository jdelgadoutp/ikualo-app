<template>
    <div class="card text-center" style="width: 38rem;">
        <div class="card">
            <div class="card">
                <div class="col cerrar">
                    <img src="@/assets/close-icon.svg" alt="close" @click="cerrar">
                </div>
                <div class="col">
                    <h5>Nuevo Movimiento</h5>
                </div>
            </div>
        </div>
        <div class="card p-3">
            <form @submit.prevent="crear">
                <div class="row p-2">
                    <div class="col">
                        <img src="https://cdn.prod.website-files.com/66473e76e9c2d66e80a2a800/675559080ccac30459cae25d_logo%20ikualo%20morado.svg"
                            class="card-img-top logo" alt="logo">
                    </div>
                </div>
                <div class="row p-2">
                    <div class="input-group mb-3 col">
                        <span class="input-group-text">Є</span>
                        <input type="number" class="form-control text-end" v-model="from.value" input>
                        <span class="input-group-text">Valor</span>
                    </div>
                </div>
                <div class="row p-2">
                    <div class="input-group mb-3 col">
                        <span class="input-group-text">Descripción</span>
                        <textarea id="nota" class="form-control" v-model="from.description"
                            placeholder="Escribe aquí..."></textarea>
                    </div>
                </div>
                <div class="row p-2">
                    <div class="col"></div>
                    <div class="col"></div>
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="RadiosIngreso" id="Ingreso"
                                value="Ingreso" checked v-model="from.type">
                            <label class="form-check-label" for="RadiosIngreso">
                                Ingreso
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="RadiosEngreso" id="Egreso" value="Egreso"
                                v-model="from.type">
                            <label class="form-check-label" for="RadiosEgreso">
                                Egreso
                            </label>
                        </div>
                    </div>
                    <div class="col"></div>
                    <div class="col"></div>
                </div>
                <div class="row p-3">
                    <div class="action">
                        <button class="btn btn-outline-primary" @click="addMovement">Adicionar</button>
                        <button class="btn btn-outline-danger" type="button" @click="cerrar">Cancelar</button>
                    </div>
                </div>
            </form>

        </div>
        <footer>
            <div class="card">
                <h5>IkualoApp</h5>
            </div>
        </footer>

    </div>
</template>

<script>
import Swal from 'sweetalert2';
import api from '@/services/api';

export default {
    props: {
        userId: {
            type: String,
        },
    },
    methods: {
        cerrar() {
            this.$router.push({ name: 'user', params: { userId: this.userId } });
        },
        async addMovement() {
            try {
                const response = await api.post('/movements/', this.from, {
                    headers: { 'Content-Type': 'application/json' }
                });
                Swal.fire({
                    title: 'Movimiento!',
                    text: 'Se adiciona nuevo registro',
                    icon: 'success',
                    confirmButtonText: 'Entendido'
                });
                this.$router.push({ name: 'user', params: { userId: this.userId } });
            } catch (error) {
                console.error('Error al obtener usuarios', error);
            }
        },
    },
    data() {
        return {
            from: {
                date: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD,
                value: 0,
                description: '',
                type: 'Ingreso',
                user: this.userId,
            },
        }
    },
}

</script>

<style scoped>
header h5 {
    color: var(--nuevo);
}

header {
    margin: 10px;
}

body {
    margin: 10px;
}

footer {
    margin: 10px;
}

.cerrar {
    text-align: right;
    margin-right: 10px;
    margin-top: 10px;
    cursor: pointer;
}

.logo {
    width: 80px;
    height: 80px;
}

div button {
    margin-left: 2px;
}
</style>