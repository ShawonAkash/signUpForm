<template>
  <div>
    <template v-for="(option, index) in selectedOptions" :key="index">
      <span>
        {{ option }}
        <button @click="removeOption(option, index)">X</button>
      </span>
    </template>
    <div>
      <input
        v-model="search"
        @keyup.enter="addOption"
        @blur="addOption"
        @focus="open = true"
        @keydown.arrow-up="highlightOption(-1)"
        @keydown.arrow-down="highlightOption(1)"
        @keydown.tab="addOption"
        @keydown.escape="search = ''"
        type="text"
        placeholder="Search or add options..."
      />
    </div>
    <div v-if="open">
      <ul>
        <li
          v-for="(option, index) in filteredOptions"
          :key="index"
          @click="addOption(option)"
          :class="{ highlight: index === highlightedIndex }"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, computed, toRefs } from 'vue'

export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    max: {
      type: Number,
      default: 3
    }
  },
  setup(props) {
    const state = reactive({
      search: '',
      open: false,
      highlightedIndex: -1,
      selectedOptions: []
    })

    const filteredOptions = computed(() => {
      return props.options.filter(
        (option) =>
          !state.selectedOptions.includes(option) &&
          option.toLowerCase().includes(state.search.toLowerCase())
      )
    })

    function addOption(option) {
      if (!state.selectedOptions.includes(option)) {
        state.selectedOptions.push(option)
        state.search = ''
        state.open = false
        state.highlightedIndex = -1
      }
    }

    function removeOption(option, index) {
      state.selectedOptions.splice(index, 1)
    }

    function highlightOption(direction) {
      state.highlightedIndex += direction
      if (state.highlightedIndex < script - 1) {
        state.highlightedIndex = filteredOptions.value.length - 1
      }
      if (state.highlightedIndex >= filteredOptions.value.length) {
        state.highlightedIndex = -1
      }
    }
    return {
      ...toRefs(state),
      filteredOptions,
      addOption,
      removeOption,
      highlightOption
    }
  }
}
</script>
