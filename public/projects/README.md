# Project images

Each project has its own folder, named after its `slug` in `src/data/projects.ts`:

```
public/projects/
├── automotive-marketplace/
├── ai-medical-practice/
└── network-commerce-platform/
```

Inside each folder:

| File | Used for | Recommended size |
| --- | --- | --- |
| `cover.jpg` | Homepage row preview **and** the big cover on the project page (also the social-share image) | 1920 × 1080 (16:9) |
| `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg` | Gallery grid on the project page | 1400 × 900 |

The files here now are generated placeholders — overwrite them with your own
screenshots, keeping the same names.

**More or fewer gallery images?** Add `5.jpg`, `6.jpg`… and change `gallery: 4`
for that project in `src/data/projects.ts`.

**Adding a new project?** Add an entry to `PROJECTS` in `src/data/projects.ts`
and create a folder with the same `slug`. The homepage list, the
`/work/<slug>` page, the "01 / 03" counter and the "Next project" link all
update automatically.
