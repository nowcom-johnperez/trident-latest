<script>
import { createPopper } from '@popperjs/core';
import { get } from '@shell/utils/object';
import isString from 'lodash/isString';
import VueSelectOverrides from '@shell/mixins/vue-select-overrides';

export default {
  mixins: [VueSelectOverrides],
  props:  {
    buttonLabel: {
      default: '',
      type:    [String, Object], // Accept both String and Object (for a component)
    },
    closeOnSelect: {
      default: true,
      type:    Boolean
    },
    disabled: {
      default: false,
      type:    Boolean,
    },
    dropdownOptions: {
      default: () => [],
      type:    Array,
    },
    optionKey: {
      default: null,
      type:    String,
    },
    optionLabel: {
      default: 'label',
      type:    String,
    },
    size: {
      default: null,
      type:    String,
    },
    value: {
      default: null,
      type:    String,
    },
    placement: {
      default: 'bottom-start',
      type:    String
    },
    selectable: {
      default: (opt) => {
        if ( opt ) {
          if ( opt.disabled || opt.kind === 'group' || opt.kind === 'divider' || opt.loading ) {
            return false;
          }
        }

        return true;
      },
      type: Function
    },
  },
  data() {
    return { focused: false };
  },

  methods: {
    withPopper(dropdownList, component, { width }) {
      const componentWidth = component.$refs.search.clientWidth;
      const dropWidth = dropdownList.clientWidth;

      if (dropWidth < componentWidth) {
        dropdownList.style.width = `${ componentWidth }px`;
      } else {
        dropdownList.style.width = 'min-content';
      }

      const popper = createPopper(component.$refs.toggle, dropdownList, {
        placement: this.placement || 'bottom-start',
        modifiers: [
          {
            name:    'offset',
            options: { offset: [-2, 2] },
          },
          {
            name:    'toggleClass',
            enabled: true,
            phase:   'write',
            fn({ state }) {
              component.$el.setAttribute('x-placement', state.placement);
            },
          },
        ],
      });

      return () => popper.destroy();
    },
    ddButtonAction(option) {
      this.focusSearch();
      this.$emit('dd-button-action', option);
    },
    getOptionLabel(option) {
      if (isString(option)) {
        return option;
      }

      if (this.$attrs['get-option-label']) {
        return this.$attrs['get-option-label'](option);
      }

      if (get(option, this.optionLabel)) {
        if (this.localizedLabel) {
          return this.$store.getters['i18n/t'](get(option, this.optionLabel));
        } else {
          return get(option, this.optionLabel);
        }
      } else {
        return option;
      }
    },

    onFocus() {
      return this.onFocusLabeled();
    },

    onFocusLabeled() {
      this.focused = true;
    },

    onBlur() {
      return this.onBlurLabeled();
    },

    onBlurLabeled() {
      this.focused = false;
    },

    focusSearch() {
      this.$nextTick(() => {
        const el = this.$refs['button-dropdown'].searchEl;

        if ( el ) {
          el.focus();
        }
      });
    },
    get,
  },
};
</script>

<template>
  <v-select
    ref="button-dropdown"
    class="button-dropdown btn"
    :class="{
      disabled,
      focused,
    }"
    v-bind="$attrs"
    :append-to-body="true"
    :calculate-position="withPopper"
    :searchable="false"
    :clearable="false"
    :close-on-select="closeOnSelect"
    :filterable="false"
    :value="null"
    :options="dropdownOptions"
    :map-keydown="mappedKeys"
    :get-option-key="
      (opt) => (optionKey ? get(opt, optionKey) : getOptionLabel(opt))
    "
    :get-option-label="(opt) => getOptionLabel(opt)"
    :selectable="selectable"
    @search:blur="onBlur"
    @search:focus="onFocus"
    @input="$emit('click-action', $event)"
  >
    <template #selected-option="option">
      <button
        tabindex="-1"
        type="button"
        class="dropdown-button-two btn"
        @click="ddButtonAction(option)"
        @focus="focusSearch"
      >
        <!-- Render the button label or the logo component -->
        <component
          :is="typeof buttonLabel === 'string' ? 'span' : buttonLabel"
          v-if="typeof buttonLabel === 'string'"
        >
          {{ buttonLabel }}
        </component>
        <component
          :is="buttonLabel"
          v-else
        />
      </button>
    </template>
    <!-- Pass down templates provided by the caller -->
    <template
      v-for="(_, slot) of $scopedSlots"
      v-slot:[slot]="scope"
    >
      <slot
        v-if="slot !== 'selected-option'"
        :name="slot"
        v-bind="scope"
      />
    </template>
  </v-select>
</template>

<style lang='scss' scoped>
.button-dropdown.btn-sm {
  ::v-deep > .vs__dropdown-toggle {
    .vs__actions {
      &:after {
        font-size: 1.6rem;
      }
    }
  }
}
.button-dropdown.btn-lg {
  ::v-deep > .vs__dropdown-toggle {
    .vs__actions {
      &:after {
        font-size: 2.6rem;
      }
    }
  }
}
.button-dropdown {
  background: var(--accent-btn);
  border: solid 1px var(--link);
  color: var(--link);
  padding: 0;

  &.vs--open ::v-deep {
    outline: none;
    box-shadow: none;
  }

  &:hover {
    ::v-deep .vs__dropdown-toggle .vs__actions,
    ::v-deep .vs__selected-options {
      background: var(--accent-btn-hover);
    }
    ::v-deep .vs__selected-options .vs__selected button {
      background-color: transparent;
      color: var(--accent-btn-hover-text);
    }
    ::v-deep .vs__dropdown-toggle .vs__actions {
      &:after {
        color: var(--accent-btn-hover-text);
      }
    }
  }

  ::v-deep > .vs__dropdown-toggle {
    width: 100%;
    display: grid;
    grid-template-columns: 75% 25%;
    border: none;
    background: transparent;

    .vs__actions {

      &:after {
        color: var(--link);
        line-height: 1;
      }
    }
  }

  ::v-deep .vs__selected-options {
    .vs__selected {
      margin: unset;
      border: none;

      button {
        border: none;
        background: transparent;
        color: var(--link);
      }
    }
    .vs__search {
      position: absolute;
      opacity: 0;
      padding: 0;
    }
  }

  ::v-deep .vs__dropdown-menu {
    min-width: unset;
    width: fit-content;
  }
}
</style>
