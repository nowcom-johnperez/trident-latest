<template>
    <span v-clean-tooltip="tooltip" class="hover-container">
        <a :href="value" target="_blank">
            <i class="fa fa-link fa-2x"></i>
        </a>
    </span>
</template>

<script>
export default {
    name: 'IconLink',
    props: {
        value: {
            type: String,
            required: true,
        }
    },
    computed: {
        tooltip() {
            return {
                content: this.value,
                hideOnTargetClick: false
            };
        }
    }
}
</script>