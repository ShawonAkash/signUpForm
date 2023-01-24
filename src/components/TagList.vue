<template>
  <div class="taglist">
    <div v-for="tag in selectedTags" :key="tag"  >
      <span class="bg-red-600 px-3 py-1 rounded-lg">{{ tag }}</span>
      <span @click="removeTag(tag)">x</span>
    </div>
    <div v-for="tag in availableTags" :key="tag" @click="addTag(tag)">
      {{ tag }}
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  props: {
    value: Array,
    tags: Array,
    maxTags: Number
  },
  setup(props) {
    const selectedTags = ref(props.value || [])
const availableTags = ref(props.tags || [])

    function addTag(tag) {
      if (selectedTags.value.length < props.maxTags) {
        selectedTags.value.push(tag)
        availableTags.value = availableTags.value.filter((t) => t !== tag)
        // update the prop with the new tags
        this.$emit('update:selectedTags', selectedTags.value)
      }
    }

    function removeTag(tag) {
      selectedTags.value = selectedTags.value.filter((t) => t !== tag)
      availableTags.value.push(tag)
      // update the prop with the new tags
      this.$emit('update:selectedTags', selectedTags.value)
    }

    onMounted(() => {
      availableTags.value = availableTags.value.filter(
        (tag) => !selectedTags.value.includes(tag)
      )
    })

    return {
      selectedTags,
      availableTags,
      addTag,
      removeTag
    }
  }
})
</script>
