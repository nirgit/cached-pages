# SSR technique on the Client with cache for perf optimisation

This branch is about an optimisation of the client, moving between screens that tries to take advantage of caching the screens (HTML markup) before switching to a different screen, and when showing up again, using React hydration.
