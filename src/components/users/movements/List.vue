<template>
    <tr>
        <th class="text-center" scope="row">{{ date }}</th>
        <td class="text-center">{{ type }}</td>
        <td :class="type === 'Ingreso' ? 'verde' : 'rojo'">{{ valueformat }}</td>
        <td class="text-center">{{ description }}</td>
        <td>
            <div class="text-center">
                <img src="@/assets/close.png" alt="elimiar" @click="eliminar">
            </div>
        </td>
    </tr>
</template>

<script setup>

import { defineProps, toRefs, computed } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'

const router = useRouter();

const props = defineProps({
    _id: {
        type: String,
    },
    date: {
        type: String,
    },
    type: {
        type: String,
    },
    value: {
        type: Number,
    },
    description: {
        type: String,
    },
    userId: {
        type: String,
    }
});

const { _id, date, type, value, description, userId } = toRefs(props);

const currencyFormater = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
});

const valueformat = computed(() => {
    return type.value === "Egreso" ? currencyFormater.format((value.value * -1)) : currencyFormater.format(value.value);
});


const eliminar = () => {
    router.push({ name: 'deletemovement', params: { movementId: _id.value, userId: userId.value } })
}

</script>

<style scoped>
div button {
    margin: 5px;
}

div img {
    width: 30px;
    height: 30px;
    cursor: pointer;
}

td {
    font-size: var(--sm);
}

td,
th {
    font-size: var(--xsm);
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
</style>