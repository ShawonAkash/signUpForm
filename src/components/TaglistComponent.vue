<template>
  <div class="taglist">
    <div class="taglist-input-container">
      <div class="relative clearfix">
        <div class="selected-tags-container float-right absolute top-2 right-0">
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
      <input
        v-model="search"
        @input="filterTags"
        @keyup.enter="selectTag"
        class="border p-2 rounded-lg w-full"
        placeholder="Search for tags..."
        @focus="inFocus = true"
      />
    </div>
    <div class="taglist-tags-container" v-if="inFocus && search.length > 0">
      <span
        v-for="tag in filteredTags"
        :key="tag"
        class="taglist-tag text-xs flex"
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
      default: () => []
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
      return this.tags.filter((tag) =>
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

<style scoped>
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
</style>
