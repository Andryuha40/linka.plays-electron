<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { gameArtSrc } from "../../core/gameArt";
import { wordImageSrc } from "../../core/wordImage";

const props = withDefaults(
  defineProps<{
    wordId?: string;
    /** Game-specific picture, tried before the shared word picture. */
    artId?: string;
    word: string;
    emoji: string;
    decorative?: boolean;
  }>(),
  {
    decorative: false,
  },
);

// Sources in order of preference; a failed image moves on to the next one and
// the emoji is the last resort.
const sources = computed(() => {
  const list: string[] = [];
  if (props.artId) list.push(gameArtSrc(props.artId));
  if (props.wordId) list.push(wordImageSrc(props.wordId));
  return list;
});
const sourceIndex = ref(0);
const currentSrc = computed(() => sources.value[sourceIndex.value]);

watch(sources, () => {
  sourceIndex.value = 0;
});
</script>

<template>
  <span class="game-word-image" :aria-hidden="decorative || undefined">
    <img
      v-if="currentSrc"
      class="game-word-image__asset"
      :src="currentSrc"
      :alt="decorative ? '' : word"
      draggable="false"
      @error="sourceIndex += 1"
    />
    <span
      v-else
      class="game-word-image__fallback emoji-glyph"
      :aria-label="decorative ? undefined : word"
      >{{ emoji }}</span
    >
  </span>
</template>

<style scoped>
.game-word-image {
  align-items: center;
  display: inline-flex;
  font-size: inherit;
  justify-content: center;
  line-height: 1;
}

.game-word-image__asset,
.game-word-image__fallback {
  block-size: 1em;
  inline-size: 1em;
}

.game-word-image__asset {
  object-fit: contain;
  pointer-events: none;
  user-select: none;
}
</style>
