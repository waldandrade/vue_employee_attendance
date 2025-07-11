import { ref } from 'vue';

const menuVisible = ref(false)

export function useLayout() {
    return {
        menuVisible
    };
}