<script setup>
import { cn } from "@/lib/utils";
import { Primitive } from "radix-vue";

const props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false, default: "a" },
  class: { type: null, required: false },
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn('transition-colors hover:text-foreground', props.class)"
  >
    <slot />
  </Primitive>
</template>
