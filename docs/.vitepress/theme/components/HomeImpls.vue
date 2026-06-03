<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { ArrowUpRight } from '@lucide/vue'
import Badge from './ui/Badge.vue'
import Card from './ui/Card.vue'
import RustIcon from './icons/RustIcon.vue'
import { cn } from '../lib/utils'

type RepoId = 'ublx' | 'nefaxer' | 'zahirscan'

const CYCLE_MS = 3000

const active = ref<RepoId>('ublx')
const showVersion = ref(false)

function topicBadges(topics: string[]) {
  return topics.map((label, index) => ({
    label,
    variant: (index === 0 ? 'default' : index === 1 ? 'secondary' : 'outline') as
      | 'default'
      | 'secondary'
      | 'outline',
  }))
}

const repos: Array<{
  id: RepoId
  name: string
  description: string
  href: string
  githubBadges: Array<{ src: string; alt: string }>
  icon: typeof RustIcon
  iconClass: string
  iconBoxClass: string
  badges: Array<{ label: string; variant: 'default' | 'secondary' | 'outline' }>
}> = [
  {
    id: 'ublx',
    name: 'UBLX',
    description: 'Terminal catalog — browse, enrich on demand, export.',
    href: 'https://github.com/Latka-Industries/UBLX',
    githubBadges: [
      { src: 'https://img.shields.io/crates/v/ublx.svg', alt: 'UBLX on crates.io' },
      { src: 'https://img.shields.io/docsrs/ublx', alt: 'UBLX on docs.rs' },
      { src: 'https://github.com/Latka-Industries/UBLX/workflows/Build/badge.svg', alt: 'UBLX build status' },
    ],
    icon: RustIcon,
    iconClass: 'size-5 text-[#7C3AED]',
    iconBoxClass: 'border-[#7C3AED]/20 bg-[#7C3AED]/10',
    badges: topicBadges([
      'tui',
      'metadata',
      'file-viewer',
      'visualization',
      'analysis',
      'database',
    ]),
  },
  {
    id: 'nefaxer',
    name: 'nefaxer',
    description: 'Parallel directory indexer with SQLite snapshots and diffs.',
    href: 'https://github.com/Latka-Industries/nefaxer',
    githubBadges: [
      { src: 'https://img.shields.io/crates/v/nefaxer.svg', alt: 'nefaxer on crates.io' },
      { src: 'https://img.shields.io/docsrs/nefaxer', alt: 'nefaxer on docs.rs' },
      { src: 'https://github.com/Latka-Industries/nefaxer/workflows/Build/badge.svg', alt: 'nefaxer build status' },
    ],
    icon: RustIcon,
    iconClass: 'size-5 text-[#0EA5E9]',
    iconBoxClass: 'border-[#0EA5E9]/20 bg-[#0EA5E9]/10',
    badges: topicBadges([
      'indexing',
      'sqlite',
      'diff',
      'change-detection',
      'directory',
      'files',
    ]),
  },
  {
    id: 'zahirscan',
    name: 'zahirscan',
    description: 'Template mining and metadata extraction across file formats.',
    href: 'https://github.com/Latka-Industries/zahirscan',
    githubBadges: [
      { src: 'https://img.shields.io/crates/v/zahirscan.svg', alt: 'zahirscan on crates.io' },
      { src: 'https://img.shields.io/docsrs/zahirscan', alt: 'zahirscan on docs.rs' },
      { src: 'https://github.com/Latka-Industries/zahirscan/workflows/Build/badge.svg', alt: 'zahirscan build status' },
    ],
    icon: RustIcon,
    iconClass: 'size-5 text-[#DEA584]',
    iconBoxClass: 'border-[#DEA584]/20 bg-[#DEA584]/10',
    badges: topicBadges([
      'cli',
      'metadata-extraction',
      'media-analysis',
      'compression',
      'parser',
      'text-processing',
    ]),
  },
]

let cycleTimer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  cycleTimer = setInterval(() => {
    showVersion.value = !showVersion.value
  }, CYCLE_MS)
})

onUnmounted(() => {
  if (cycleTimer) clearInterval(cycleTimer)
})
</script>

<template>
  <section class="home-impls tet-shadcn" aria-label="Repositories">
    <p class="mb-3 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
      Repositories
    </p>

    <div class="home-impls__grid">
      <a
        v-for="repo in repos"
        :key="repo.id"
        :href="repo.href"
        target="_blank"
        rel="noopener"
        class="group block text-left no-underline outline-none"
        @mouseenter="active = repo.id"
        @focus="active = repo.id"
      >
        <Card
          :class="
            cn(
              'relative p-5 transition-all duration-200',
              'hover:border-primary/40 hover:shadow-md',
              active === repo.id && 'border-primary/50 shadow-md ring-1 ring-ring/20',
            )
          "
        >
          <div
            class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            :class="active === repo.id && 'opacity-100'"
          >
            <div
              class="absolute -right-8 -top-8 size-24 rounded-full bg-primary/5 blur-2xl"
            />
          </div>

          <div class="relative flex items-start justify-between gap-3">
            <div
              :class="
                cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-lg border',
                  repo.iconBoxClass,
                )
              "
            >
              <component :is="repo.icon" :class="repo.iconClass" aria-hidden="true" />
            </div>
            <ArrowUpRight
              class="size-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
              aria-hidden="true"
            />
          </div>

          <h3 class="relative mt-3 text-base font-semibold leading-none tracking-tight text-card-foreground">
            {{ repo.name }}
          </h3>

          <div class="repo-cycle relative mt-3 min-h-[11rem]">
            <div
              class="repo-cycle__panel transition-all duration-500 ease-in-out"
              :class="showVersion ? 'repo-cycle__panel--out' : 'repo-cycle__panel--in'"
              :aria-hidden="showVersion"
            >
              <p class="text-sm leading-snug text-muted-foreground">
                {{ repo.description }}
              </p>
              <div class="repo-topics mt-3 flex flex-wrap gap-x-1.5 gap-y-1">
                <Badge
                  v-for="badge in repo.badges"
                  :key="badge.label"
                  :variant="badge.variant"
                  class="repo-topic-badge"
                >
                  {{ badge.label }}
                </Badge>
              </div>
            </div>

            <div
              class="repo-cycle__panel transition-all duration-500 ease-in-out"
              :class="showVersion ? 'repo-cycle__panel--in' : 'repo-cycle__panel--out'"
              :aria-hidden="!showVersion"
            >
              <div class="repo-github-badges flex flex-col items-start gap-2 pt-2">
                <img
                  v-for="badge in repo.githubBadges"
                  :key="badge.src"
                  class="repo-github-badge"
                  :src="badge.src"
                  :alt="badge.alt"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </Card>
      </a>
    </div>
  </section>
</template>

<style scoped>
.home-impls {
  margin: 2rem auto 0;
  max-width: 80rem;
  padding: 0 1.5rem 2.5rem;
  width: 100%;
}

.home-impls__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .home-impls {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  .home-impls__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
}

@media (min-width: 960px) {
  .home-impls {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
}

@media (min-width: 1024px) {
  .home-impls__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
  }
}

.tet-shadcn a {
  color: inherit;
}

.repo-github-badge {
  display: block;
  height: 1.25rem;
  width: auto;
}

.repo-cycle__panel {
  position: absolute;
  inset: 0;
  overflow: visible;
}

.repo-topic-badge {
  max-width: 100%;
  padding-top: 0;
  padding-bottom: 0;
  font-size: 0.75rem;
  line-height: 1.125rem;
}

.repo-cycle__panel--in {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.repo-cycle__panel--out {
  opacity: 0;
  transform: translateY(6px);
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .repo-cycle__panel {
    transition: none;
  }

  .repo-cycle__panel--out {
    display: none;
  }
}
</style>
