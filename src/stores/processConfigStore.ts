// import type { IOrderConfig } from '@/types/IOrderConfig';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { OrderLoaderFunction } from '@/types/IOrderController';
import type { IModel } from '@/types/IModel';

export const useProcessConfigStore = defineStore('Process Config Store', () => {
    const route = useRoute();

    const config = ref<IModel>({
        processTitle: '',
        pages: []
    });

    const fetchConfig = async (loader: OrderLoaderFunction) => {
        config.value = await loader({ route });
    }

    const pages = computed(() => config.value.pages);

    return {
        fetchConfig,
        pages
    };
});


