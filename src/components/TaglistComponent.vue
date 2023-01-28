<template>
  <div class="taglist">
    <div class="taglist-input-container border rounded-lg flex">
      <div class="mt-2">
        <div class="selected-tags-container">
          <span
            v-for="tag in selectedTag"
            :key="tag"
            class="
              bg-blue-500
              text-white
              rounded-full
              px-2
              py-1
              mr-2
              mb-1
              text-xs
            "
          >
            {{ tag }}
            <span @click="removeTag(tag)" class="cursor-pointer text-white"
              >&times;</span
            >
          </span>
        </div>
      </div>
      <div>
        <input
          v-model="search"
          @input="filterTags"
          @keyup.space="
            filteredTags.length ? selectedTag.push(filteredTags[0]) : null
          "
          @keyup.delete="selectedTag.pop()"
          class="border-none outline-none p-2 rounded-lg w-full"
          placeholder="Search for tags..."
          @focus="inFocus = true"
        />
      </div>
    </div>
    <div class="taglist-tags-container rounded-lg bg-slate-100" v-if="inFocus && search.length > 0">
      <span
        v-for="tag in filteredTags"
        :key="tag"
        class="
          taglist-tag
          text-sm
          flex
          py-1
          shadow-sm
          hover:bg-blue-500
        "
        @click="selectTag(tag)"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => [(isHovered = false)]
    },
    maxTags: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      search: '',
      selectedTag: [],
      inFocus: false
    }
  },
  computed: {
    filteredTags() {
      return this.tags.filter(
        (tag) =>
          !this.selectedTag.includes(tag) &&
          tag.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  methods: {
    filterTags() {
      this.search = this.search.trim()
    },
    selectTag(tag) {
      if (
        !this.selectedTag.includes(tag) &&
        this.selectedTag.length < this.maxTags
      ) {
        this.selectedTag.push(tag)
        this.$emit('selectedTag', this.selectedTag)
        this.search = ''
      }
    },
    removeTag(tag) {
      this.selectedTag = this.selectedTag.filter((t) => t !== tag)
    }
  }
}
</script>
