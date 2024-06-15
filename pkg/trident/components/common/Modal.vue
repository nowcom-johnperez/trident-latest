<template>
    <div class="modal-overlay">
      <div class="modal" :class="[`${size}`]">
        <!-- Modal content -->
        <div v-if="$slots.header" class="modal-header">
          <slot name="header"></slot>
        </div>
        <div class="modal-content">
            <slot name="content"></slot>
        </div>

        <!-- Buttons container with flex layout -->
        <div class="moodal-footer button-container">
            <slot name="footer"></slot>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
      size: {
        type: String,
        default: 'sm'
      }
    }
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
}

.modal {
  max-height: 70vh;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  overflow-y: auto;
}

.modal.fixed {
  min-width: 300px;
}

.modal.lg {
  width: 50%;
}

.button-container {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  /* Add margin for spacing */
}

.modal-header {
  border-bottom: 1px solid #2f2d2d;
  padding: 10px 0;
  margin-bottom: 15px;
}

.theme-dark .modal-header {
  border-bottom: 1px solid #fff !important;
}

.modal-content {
  h2 {
    color: #007bff;
  }
}

.modal.lg .button-container {
  justify-content: flex-end !important;
}

.theme-dark {
  .modal {
    background: #27292e;
  }
}
</style>