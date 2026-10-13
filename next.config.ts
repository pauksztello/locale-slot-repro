import type { NextConfig } from "next";

// Same router-related flags as the real app. `experimental.varyParams` is on by default.
export default {
  cacheComponents: true,
  partialPrefetching: true,
} satisfies NextConfig;
