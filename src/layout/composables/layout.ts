import { ref } from 'vue';

const menuVisible = ref(false)

const isDark = ref(false)

export function useLayout() {

    const toogleDarkMode = () => {
        isDark.value = !isDark.value
    }
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        isDark.value = true;
    }

    return {
        menuVisible,
        isDark,
        toogleDarkMode
    };
}