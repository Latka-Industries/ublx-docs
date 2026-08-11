<script setup lang="ts">
import { computed, ref } from 'vue'
import Badge from './ui/Badge.vue'
import Card from './ui/Card.vue'
import ScrollArea from './ui/ScrollArea.vue'

type StackNote = {
  id: string
  product: 'UBLX' | 'Nefaxer' | 'ZahirScan'
  accent: string
  body: string
  hint?: string
  link: string
  linkLabel: string
  secondaryLink?: string
  secondaryLinkLabel?: string
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
        id: 'snapshot-nefaxer',
        product: 'Nefaxer',
        accent: '#0EA5E9',
        body: 'Parallel directory walks write SQLite snapshots and diffs — paths, sizes, optional Blake3 hashes.',
        link: '/guides/snapshot-and-browse',
        linkLabel: 'Snapshot & browse',
        secondaryLink: '/nefaxer/',
        secondaryLinkLabel: 'Nefaxer docs',
      },
      {
        id: 'snapshot-ublx',
        product: 'UBLX',
        accent: '#7C3AED',
        body: 'Turns each snapshot into a flat TUI catalog: Snapshot tab, per-root cache under ubli/, and main tabs when data exists.',
        link: '/guides/snapshot-and-browse',
        linkLabel: 'Snapshot & browse',
        secondaryLink: '/getting-started',
        secondaryLinkLabel: 'Install',
      },
      {
        id: 'snapshot-zahir',
        product: 'ZahirScan',
        accent: '#DEA584',
        body: 'Enhance fills Viewer, Templates, Metadata, and Writing; path-only snapshots still get basic Viewer previews from disk.',
        hint: 'Cycle main tabs with ~ · right-pane tabs: v / t / m / w',
        link: '/guides/right-pane-previews',
        linkLabel: 'Right-pane previews',
        secondaryLink: '/zahirscan/formats',
        secondaryLinkLabel: 'Supported formats',
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
        id: 'enhance-nefaxer',
        product: 'Nefaxer',
        accent: '#0EA5E9',
        body: 'Default snapshot is path + filetype only — a quick walk without opening every file.',
        link: '/guides/path-only-vs-full-enhance',
        linkLabel: 'Path-only vs full enhance',
      },
      {
        id: 'enhance-zahir',
        product: 'ZahirScan',
        accent: '#DEA584',
        body: 'Batch or on-demand runs extract templates, metadata, and writing stats into Zahir JSON for previews.',
        link: '/zahirscan/',
        linkLabel: 'ZahirScan overview',
      },
      {
        id: 'enhance-ublx',
        product: 'UBLX',
        accent: '#7C3AED',
        body: 'enable_enhance_all and [[enhance_policy]] let you scope auto vs manual enhance per subtree.',
        link: '/configuration',
        linkLabel: 'UBLX configuration',
        secondaryLink: '/guides/enhance-policies',
        secondaryLinkLabel: 'Enhance policies',
      },
    ],
  },
  {
    id: 'previews',
    title: 'Right-pane previews',
    details: 'Viewer, Templates, Metadata, and Writing tabs for the selected file.',
    backTitle: 'What fills the Snapshot right pane',
    stacks: [
      {
        id: 'previews-zahir',
        product: 'ZahirScan',
        accent: '#DEA584',
        body: 'Full enhance writes Zahir JSON — templates, typed metadata columns, and writing stats extracted per format.',
        link: '/guides/right-pane-previews',
        linkLabel: 'Right-pane previews',
        secondaryLink: '/zahirscan/metadata/',
        secondaryLinkLabel: 'Metadata extraction',
      },
      {
        id: 'previews-ublx',
        product: 'UBLX',
        accent: '#7C3AED',
        body: 'UBLX renders markdown, code, images, and .tet summaries; Zahir-backed tabs light up after enhance.',
        hint: 'Available on Snapshot, Lenses, and Duplicates when a file row is selected.',
        link: '/guides/right-pane-previews',
        linkLabel: 'Right-pane previews',
        secondaryLink: '/tui/right-pane/viewer',
        secondaryLinkLabel: 'Viewer tab',
      },
    ],
  },
  {
    id: 'lenses',
    title: 'Lenses & export',
    details: 'Saved path lists and Markdown export — curated subsets of the catalog.',
    backTitle: 'Focus on a subset, export to share',
    stacks: [
      {
        id: 'lenses-ublx',
        product: 'UBLX',
        accent: '#7C3AED',
        body: 'The Lenses tab lists saved path sets; add from Snapshot with l or bulk a, then export to ublx-lenses/ Markdown.',
        hint: 'Tab appears when the database has at least one lens.',
        link: '/guides/lenses',
        linkLabel: 'Making & exporting lenses',
        secondaryLink: '/tui/lenses',
        secondaryLinkLabel: 'Lenses tab',
      },
    ],
  },
  {
    id: 'changes',
    title: 'Change & duplicates',
    details: 'Diff snapshots over time and review hash duplicate groups.',
    backTitle: 'Delta when history exists; Duplicates after detection',
    stacks: [
      {
        id: 'changes-nefaxer',
        product: 'Nefaxer',
        accent: '#0EA5E9',
        body: 'Each snapshot compares to the prior walk — added, modified, and removed paths land in the database for UBLX.',
        hint: 'Delta tab appears when a prior snapshot exists.',
        link: '/guides/change-and-duplicates',
        linkLabel: 'Change & duplicates',
        secondaryLink: '/nefaxer/database',
        secondaryLinkLabel: 'Database schema',
      },
      {
        id: 'changes-ublx',
        product: 'UBLX',
        accent: '#7C3AED',
        body: 'Delta tab buckets changed paths; Duplicates tab groups files by Blake3 hash after Ctrl+A → d detection.',
        hint: 'Duplicates tab appears when duplicate groups exist.',
        link: '/guides/change-and-duplicates',
        linkLabel: 'Change & duplicates',
        secondaryLink: '/tui/delta',
        secondaryLinkLabel: 'Delta tab',
      },
    ],
  },
  {
    id: 'trees',
    title: 'Built for project trees',
    details: 'Command mode, bulk actions, and repo-scale navigation — not a file manager replacement.',
    backTitle: 'Navigate large trees efficiently',
    stacks: [
      {
        id: 'trees-ublx',
        product: 'UBLX',
        accent: '#7C3AED',
        body: 'Space and Ctrl+A command mode, multi-select bulk actions, and saved lenses for recurring path sets.',
        hint: 'Press ? in the TUI for context help on the active tab.',
        link: '/guides/project-trees',
        linkLabel: 'Built for project trees',
        secondaryLink: '/guides/command-mode-and-menus',
        secondaryLinkLabel: 'Command mode & menus',
      },
      {
        id: 'trees-nefaxer',
        product: 'Nefaxer',
        accent: '#0EA5E9',
        body: 'Parallel walks keep snapshots fast on deep project trees; optional Blake3 hashes feed duplicate detection.',
        link: '/guides/project-trees',
        linkLabel: 'Built for project trees',
        secondaryLink: '/nefaxer/architecture',
        secondaryLinkLabel: 'Nefaxer architecture',
      },
    ],
  },
  {
    id: 'headless',
    title: 'Headless & export',
    details: 'Snapshot-only runs and catalog export for CI and scripts.',
    backTitle: 'UBLX without the TUI',
    stacks: [
      {
        id: 'headless-ublx',
        product: 'UBLX',
        accent: '#7C3AED',
        body: 'ublx --snapshot-only / --export for CI; ublx query and ublx doctor read the catalog without the TUI; optional ublx serve (--features serve or ui) exposes HTTP / a browser SPA.',
        link: '/guides/headless-snapshot-export',
        linkLabel: 'Headless snapshot + export',
        secondaryLink: '/cli',
        secondaryLinkLabel: 'UBLX CLI',
      },
      {
        id: 'headless-nefaxer',
        product: 'Nefaxer',
        accent: '#0EA5E9',
        body: 'Run nefaxer directly for indexing-only jobs; UBLX picks up the SQLite snapshot on the next launch or export pass.',
        link: '/nefaxer/cli',
        linkLabel: 'Nefaxer CLI',
      },
    ],
  },
]

const selectedFeatureId = ref(features[0]!.id)
const selectedStackId = ref(features[0]!.stacks[0]!.id)

const selectedFeature = computed(
  () => features.find((feature) => feature.id === selectedFeatureId.value) ?? features[0]!,
)

const selectedStack = computed(() => {
  const stacks = selectedFeature.value.stacks
  return stacks.find((stack) => stack.id === selectedStackId.value) ?? stacks[0]!
})

function selectFeature(id: string) {
  selectedFeatureId.value = id
  const feature = features.find((item) => item.id === id)
  if (feature?.stacks[0]) selectedStackId.value = feature.stacks[0].id
}

function selectStack(id: string) {
  selectedStackId.value = id
}
</script>

<template>
  <section class="home-features tet-shadcn" aria-label="UBLX stack explorer">
    <Card class="home-features__shell overflow-hidden p-0">
      <div class="home-features__panes">
        <nav class="home-features__pane home-features__pane--left" aria-label="Workflows">
          <p class="home-features__pane-label">Workflow</p>
          <ScrollArea class="home-features__scroll min-h-0 flex-1">
            <ul class="home-features__list">
              <li v-for="feature in features" :key="feature.id">
                <button
                  type="button"
                  class="home-features__row"
                  :class="{ 'home-features__row--active': feature.id === selectedFeatureId }"
                  :aria-pressed="feature.id === selectedFeatureId"
                  @click="selectFeature(feature.id)"
                >
                  <span class="home-features__row-title">{{ feature.title }}</span>
                  <span class="home-features__row-detail">{{ feature.details }}</span>
                </button>
              </li>
            </ul>
          </ScrollArea>
        </nav>

        <nav class="home-features__pane home-features__pane--middle" aria-label="Stack">
          <p class="home-features__pane-label">Stack</p>
          <ul class="home-features__list">
            <li v-for="stack in selectedFeature.stacks" :key="stack.id">
              <button
                type="button"
                class="home-features__row home-features__row--compact"
                :class="{ 'home-features__row--active': stack.id === selectedStackId }"
                :aria-pressed="stack.id === selectedStackId"
                @click="selectStack(stack.id)"
              >
                <span
                  class="home-features__product-dot"
                  :style="{ backgroundColor: stack.accent }"
                  aria-hidden="true"
                />
                <span class="home-features__row-title">{{ stack.product }}</span>
              </button>
            </li>
          </ul>
        </nav>

        <div class="home-features__pane home-features__pane--right" aria-label="Viewer">
          <p class="home-features__pane-label">Viewer</p>
          <ScrollArea class="home-features__viewer h-full min-h-0 flex-1">
            <div class="home-features__viewer-inner">
              <p class="text-sm font-semibold text-card-foreground">
                {{ selectedFeature.backTitle }}
              </p>
              <div
                class="home-features__viewer-note mt-4 space-y-2 border-l-2 pl-3"
                :style="{ borderColor: `${selectedStack.accent}66` }"
              >
                <Badge :variant="productBadgeVariant[selectedStack.product]">
                  {{ selectedStack.product }}
                </Badge>
                <p class="text-sm leading-relaxed text-muted-foreground">
                  {{ selectedStack.body }}
                </p>
                <p v-if="selectedStack.hint" class="home-features__hint">
                  {{ selectedStack.hint }}
                </p>
                <div class="home-features__links">
                  <a :href="selectedStack.link" class="text-xs font-medium text-primary hover:underline">
                    {{ selectedStack.linkLabel }} →
                  </a>
                  <a
                    v-if="selectedStack.secondaryLink && selectedStack.secondaryLinkLabel"
                    :href="selectedStack.secondaryLink"
                    class="text-xs font-medium text-primary hover:underline"
                  >
                    {{ selectedStack.secondaryLinkLabel }} →
                  </a>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </Card>
  </section>
</template>

<style scoped>
.home-features {
  margin: 2rem auto 0;
  max-width: 80rem;
  padding: 0 1.5rem;
}

.home-features__shell {
  min-height: 18rem;
}

.home-features__panes {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 18rem;
}

.home-features__pane {
  display: flex;
  min-height: 0;
  flex-direction: column;
  padding: 1rem;
  text-align: left;
}

.home-features__pane--left,
.home-features__pane--middle {
  border-bottom: 1px solid hsl(var(--border));
}

.home-features__pane-label {
  margin: 0 0 0.75rem;
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: hsl(var(--muted-foreground));
}

.home-features__list {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.home-features__row {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0.625rem 0.75rem;
  border: 1px solid transparent;
  border-radius: calc(var(--radius) - 2px);
  background: transparent;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
  transition:
    background-color 0.15s,
    border-color 0.15s;
}

.home-features__row--compact {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.home-features__row:hover:not(.home-features__row--active) {
  background: hsl(var(--muted));
}

.home-features__row--active {
  border-color: hsl(var(--primary));
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.home-features__row--active .home-features__row-detail {
  color: hsl(var(--primary-foreground) / 0.85);
}

.home-features__row-title {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.3;
}

.home-features__row-detail {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  line-height: 1.45;
  color: hsl(var(--muted-foreground));
}

.home-features__product-dot {
  width: 0.5rem;
  height: 0.5rem;
  flex-shrink: 0;
  border-radius: 9999px;
}

.home-features__viewer-inner {
  padding-right: 0.25rem;
}

.home-features__hint {
  margin: 0;
  font-size: 0.6875rem;
  line-height: 1.45;
  color: hsl(var(--muted-foreground));
}

.home-features__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
}

.home-features__scroll :deep(.scroll-area-viewport) {
  max-height: 16rem;
}

@media (min-width: 768px) {
  .home-features__scroll :deep(.scroll-area-viewport) {
    max-height: none;
  }
}

@media (min-width: 768px) {
  .home-features__panes {
    grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.78fr) minmax(0, 1.42fr);
  }

  .home-features__pane--left,
  .home-features__pane--middle {
    border-bottom: none;
    border-right: 1px solid hsl(var(--border));
  }
}

@media (min-width: 640px) {
  .home-features {
    padding: 0 3rem;
  }
}

@media (min-width: 960px) {
  .home-features {
    padding: 0 2.5rem;
  }
}

.tet-shadcn a {
  color: inherit;
}

.tet-shadcn a.text-primary {
  color: hsl(var(--primary));
}
</style>
