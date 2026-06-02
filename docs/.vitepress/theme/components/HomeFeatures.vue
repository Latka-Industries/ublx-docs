<script setup lang="ts">
import { ref } from 'vue'
import Badge from './ui/Badge.vue'
import Card from './ui/Card.vue'
import ScrollArea from './ui/ScrollArea.vue'
import { cn } from '../lib/utils'

type StackNote = {
  product: 'UBLX' | 'Nefaxer' | 'ZahirScan'
  accent: string
  body: string
  link: string
  linkLabel: string
}

type HomeFeature = {
  id: string
  title: string
  details: string
  backTitle: string
  stacks: StackNote[]
}

const productBadgeVariant = {
  UBLX: 'default',
  Nefaxer: 'secondary',
  ZahirScan: 'outline',
} as const

const features: HomeFeature[] = [
  {
    id: 'snapshot',
    title: 'Snapshot & browse',
    details:
      'Index a directory once, then navigate a flat catalog with previews, lenses, and delta views.',
    backTitle: 'Index with Nefaxer, browse in UBLX',
    stacks: [
      {
        product: 'Nefaxer',
        accent: '#0EA5E9',
        body: 'Parallel directory walks write SQLite snapshots and diffs — paths, sizes, optional Blake3 hashes.',
        link: '/nefaxer/',
        linkLabel: 'Nefaxer docs',
      },
      {
        product: 'UBLX',
        accent: '#7C3AED',
        body: 'Turns each snapshot into a flat TUI catalog: Viewer, lenses, Delta tab, and per-root cache under ubli/.',
        link: '/getting-started',
        linkLabel: 'Install',
      },
    ],
  },
  {
    id: 'enhance',
    title: 'Path-only or full enhance',
    details:
      'Lightweight path catalogs by default; batch or on-demand ZahirScan enrichment when you need depth.',
    backTitle: 'Fast index first, ZahirScan when you need depth',
    stacks: [
      {
        product: 'Nefaxer',
        accent: '#0EA5E9',
        body: 'Default snapshot is path + filetype only — a quick walk without opening every file.',
        link: '/guides/path-only-vs-full-enhance',
        linkLabel: 'Path-only vs full enhance',
      },
      {
        product: 'ZahirScan',
        accent: '#DEA584',
        body: 'Batch or on-demand runs extract templates, metadata, and writing stats into Zahir JSON for previews.',
        link: '/zahirscan/',
        linkLabel: 'ZahirScan overview',
      },
      {
        product: 'UBLX',
        accent: '#7C3AED',
        body: 'enable_enhance_all and [[enhance_policy]] let you scope auto vs manual enhance per subtree.',
        link: '/configuration',
        linkLabel: 'UBLX configuration',
      },
    ],
  },
  {
    id: 'trees',
    title: 'Built for project trees',
    details: 'Fast diffs, duplicate detection, and export — not a file manager replacement.',
    backTitle: 'What UBLX optimizes for',
    stacks: [
      {
        product: 'UBLX',
        accent: '#7C3AED',
        body: 'Project-scale navigation: command mode, saved lenses, headless --export, and duplicate detection from hashes.',
        link: '/guides/headless-snapshot-export',
        linkLabel: 'Headless snapshot + export',
      },
      {
        product: 'Nefaxer',
        accent: '#0EA5E9',
        body: 'Snapshot diffs drive the Delta tab — added, modified, and removed paths without re-walking blind.',
        link: '/tui/delta',
        linkLabel: 'Delta tab',
      },
    ],
  },
]

const flipped = ref<Record<string, boolean>>({})

function isFlipped(id: string) {
  return !!flipped.value[id]
}

function toggle(id: string) {
  flipped.value = { ...flipped.value, [id]: !flipped.value[id] }
}
</script>

<template>
  <section class="home-features tet-shadcn" aria-label="UBLX highlights">
    <div class="home-features__grid">
      <button
        v-for="feature in features"
        :key="feature.id"
        type="button"
        class="home-features__item feature-flip h-full w-full"
        :aria-label="
          isFlipped(feature.id)
            ? `Show summary for ${feature.title}`
            : `Show stack details for ${feature.title}`
        "
        :aria-pressed="isFlipped(feature.id)"
        @click="toggle(feature.id)"
      >
        <div
          class="feature-flip__inner"
          :class="{ 'feature-flip__inner--flipped': isFlipped(feature.id) }"
        >
          <Card
            :class="
              cn(
                'feature-flip__face feature-flip__face--front flex h-full flex-col p-6 text-left transition-colors',
                'hover:border-primary/40 hover:shadow-md',
              )
            "
          >
            <h3 class="text-base font-semibold leading-snug text-card-foreground">
              {{ feature.title }}
            </h3>
            <p class="mt-2 flex-grow text-sm leading-relaxed text-muted-foreground">
              {{ feature.details }}
            </p>
          </Card>

          <Card class="feature-flip__face feature-flip__face--back h-full overflow-hidden p-0 text-left">
            <ScrollArea class="feature-flip__scroll h-full p-4">
              <p class="text-sm font-semibold text-card-foreground">{{ feature.backTitle }}</p>
              <ul class="mt-3 space-y-3 pb-1">
                <li
                  v-for="stack in feature.stacks"
                  :key="stack.product"
                  class="space-y-1.5 border-l-2 pl-3"
                  :style="{ borderColor: `${stack.accent}66` }"
                >
                  <Badge :variant="productBadgeVariant[stack.product]">
                    {{ stack.product }}
                  </Badge>
                  <p class="text-sm leading-snug text-muted-foreground">{{ stack.body }}</p>
                  <a
                    :href="stack.link"
                    class="text-xs font-medium text-primary hover:underline"
                    @click.stop
                  >
                    {{ stack.linkLabel }} →
                  </a>
                </li>
              </ul>
            </ScrollArea>
          </Card>
        </div>
      </button>
    </div>
  </section>
</template>

<style scoped>
.home-features {
  --feature-card-height: 14rem;
  margin: 2rem auto 0;
  max-width: 72rem;
  padding: 0 1.5rem;
}

.home-features__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.home-features__item {
  height: var(--feature-card-height);
  width: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: inherit;
  font: inherit;
  color: inherit;
}

.feature-flip {
  height: 100%;
  perspective: 1000px;
}

.feature-flip__inner {
  position: relative;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.55s ease-in-out;
}

.feature-flip__inner--flipped {
  transform: rotateY(180deg);
}

.feature-flip__face {
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.feature-flip__face--back {
  position: absolute;
  inset: 0;
  transform: rotateY(180deg);
}

.feature-flip__scroll {
  height: 100%;
}

@media (min-width: 768px) {
  .home-features__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 640px) {
  .home-features {
    padding: 0 3rem;
  }
}

@media (min-width: 960px) {
  .home-features {
    padding: 0 4rem;
  }
}

.tet-shadcn a {
  color: inherit;
}

.tet-shadcn a.text-primary {
  color: hsl(var(--primary));
}

@media (prefers-reduced-motion: reduce) {
  .feature-flip__inner {
    transition: none;
    transform-style: flat;
  }

  .feature-flip__inner:not(.feature-flip__inner--flipped) .feature-flip__face--back {
    visibility: hidden;
  }

  .feature-flip__inner--flipped .feature-flip__face--front {
    visibility: hidden;
  }

  .feature-flip__inner--flipped {
    transform: none;
  }

  .feature-flip__face--back {
    transform: none;
  }
}
</style>
