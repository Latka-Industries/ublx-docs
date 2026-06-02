<script setup lang="ts">
import { ref } from 'vue'
import { ArrowUpRight } from '@lucide/vue'
import Badge from './ui/Badge.vue'
import Card from './ui/Card.vue'
import RustIcon from './icons/RustIcon.vue'
import { cn } from '../lib/utils'

const active = ref<'ublx' | 'nefaxer' | 'zahirscan'>('ublx')

const repos = [
  {
    id: 'ublx' as const,
    name: 'UBLX',
    description: 'Terminal catalog — browse, enrich on demand, export.',
    href: 'https://github.com/Latka-Industries/UBLX',
    icon: RustIcon,
    iconClass: 'size-5 text-[#7C3AED]',
    iconBoxClass: 'border-[#7C3AED]/20 bg-[#7C3AED]/10',
    badges: [
      { label: 'crate', variant: 'secondary' as const },
      { label: 'TUI', variant: 'default' as const },
      { label: 'CLI', variant: 'outline' as const },
    ],
  },
  {
    id: 'nefaxer' as const,
    name: 'nefaxer',
    description: 'Parallel directory indexer with SQLite snapshots and diffs.',
    href: 'https://github.com/Latka-Industries/nefaxer',
    icon: RustIcon,
    iconClass: 'size-5 text-[#0EA5E9]',
    iconBoxClass: 'border-[#0EA5E9]/20 bg-[#0EA5E9]/10',
    badges: [
      { label: 'crate', variant: 'secondary' as const },
      { label: 'CLI', variant: 'default' as const },
      { label: 'library', variant: 'outline' as const },
    ],
  },
  {
    id: 'zahirscan' as const,
    name: 'zahirscan',
    description: 'Template mining and metadata extraction across file formats.',
    href: 'https://github.com/Latka-Industries/zahirscan',
    icon: RustIcon,
    iconClass: 'size-5 text-[#DEA584]',
    iconBoxClass: 'border-[#DEA584]/20 bg-[#DEA584]/10',
    badges: [
      { label: 'crate', variant: 'secondary' as const },
      { label: 'CLI', variant: 'default' as const },
      { label: 'templates', variant: 'outline' as const },
    ],
  },
]
</script>

<template>
  <section class="tet-shadcn mx-auto w-full max-w-5xl px-6 pb-10" aria-label="Repositories">
    <p class="mb-3 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
      Repositories
    </p>

    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
              'relative overflow-hidden p-5 transition-all duration-200',
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

          <div class="relative mt-4 space-y-1">
            <h3 class="text-base font-semibold leading-none tracking-tight text-card-foreground">
              {{ repo.name }}
            </h3>
            <p class="text-sm leading-snug text-muted-foreground">
              {{ repo.description }}
            </p>
          </div>

          <div class="relative mt-4 flex flex-wrap gap-1.5">
            <Badge v-for="badge in repo.badges" :key="badge.label" :variant="badge.variant">
              {{ badge.label }}
            </Badge>
          </div>
        </Card>
      </a>
    </div>
  </section>
</template>

<style scoped>
.tet-shadcn a {
  color: inherit;
}
</style>
