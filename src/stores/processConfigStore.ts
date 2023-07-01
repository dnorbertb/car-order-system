// import type { IOrderConfig } from '@/types/IOrderConfig';
import { defineStore } from 'pinia';

import { computed, ref } from 'vue';

import type { OrderLoaderFunction } from '@/types/IOrderController';
import { useRoute } from 'vue-router';
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

    // const orderTitle = computed(() => config.value.process_data.content.process_title);
    const pages = computed(() => config.value.pages);
    // const pricing = computed(() => config.value.process_data.pricing);

    return {
        fetchConfig,
        pages
    };
});


