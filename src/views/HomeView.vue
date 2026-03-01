<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { WORDS_4, WORDS_5 } from "@/data/words";

const selectedLength = ref<4 | 5>(5);
const letters = ref<string[]>([]);

watch(
  selectedLength,
  (len) => {
    letters.value = Array.from({ length: len }, (_, i) => letters.value[i] ?? "");
  },
  { immediate: true }
);

// Only show words of the selected length
const activeWords = computed(() =>
  selectedLength.value === 4 ? WORDS_4 : WORDS_5
);

const hasAnyLetter = computed(() =>
  letters.value.some((ch) => ch.trim().length > 0)
);

// Simple similarity scoring: +2 per letter in correct position, +1 if present
function scoreWord(word: string, guess: string): number {
  const w = word.toUpperCase();
  const g = guess.toUpperCase();
  if (!g) return 0;

  let score = 0;
  const max = Math.min(w.length, g.length);

  for (let i = 0; i < max; i++) {
    if (w[i] === g[i]) {
      score += 2;
    } else if (g.includes(w[i])) {
      score += 1;
    }
  }

  return score;
}

// Best matches: filter by per-position constraints from the letter inputs
const bestMatches = computed(() => {
  const constraints = letters.value
    .map((ch, index) => ({ ch: ch.trim().toUpperCase(), index }))
    .filter(({ ch }) => ch.length > 0);

  if (constraints.length === 0) return [];

  return activeWords.value.filter((word) =>
    constraints.every(({ ch, index }) => {
      const wch = word[index]?.toUpperCase();
      return wch === ch;
    })
  );
});
</script>

<template>
  <section class="page">
    <div class="controls">
      <select v-model.number="selectedLength">
        <option :value="4">4 letras</option>
        <option :value="5">5 letras</option>
      </select>

      <div class="letters">
        <div class="letter-row">
          <input
            v-for="(letter, index) in letters"
            :key="index"
            v-model="letters[index]"
            maxlength="1"
            inputmode="text"
          />
        </div>

        <div v-if="hasAnyLetter" class="matches">
          <ul>
            <li v-for="word in bestMatches" :key="word" class="match-row">
              <span
                v-for="(ch, idx) in word"
                :key="idx"
                class="match-letter"
              >
                {{ ch }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page {
  max-width: 640px;
  margin: 0 auto;
  --cell-size: 72px;
  --cell-font-size: 2.4rem;
}
.controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 32px;
}
.letters {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.letter-row {
  display: flex;
  gap: 10px;
}
.letter-row input {
  width: var(--cell-size);
  height: var(--cell-size);
  text-align: center;
  text-transform: uppercase;
  font-size: var(--cell-font-size);
}
label {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  gap: 6px;
}
input,
select {
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(0, 0, 0, 0.25);
  color: inherit;
  font-size: 1.05rem;
}
.matches {
  margin-top: 16px;
}
.matches ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.match-row {
  display: flex;
  gap: 8px;
  padding: 6px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.match-letter {
  width: var(--cell-size);
  height: var(--cell-size);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: var(--cell-font-size);
}
</style>