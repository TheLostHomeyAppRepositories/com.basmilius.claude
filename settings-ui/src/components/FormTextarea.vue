<template>
    <label
        v-if="label"
        class="homey-form-label"
        :for="id">
        {{ label }}
    </label>

    <textarea
        class="homey-form-textarea"
        :disabled="disabled"
        :id="id"
        :placeholder="placeholder"
        :rows="rows ?? 4"
        v-model="modelValue"/>
</template>

<script
    lang="ts"
    setup>
    import { useId } from 'vue';

    const modelValue = defineModel<string>();

    defineProps<{
        readonly disabled?: boolean;
        readonly label?: string;
        readonly placeholder?: string;
        readonly rows?: number;
    }>();

    const id = useId();
</script>
