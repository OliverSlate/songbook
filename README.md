# Songbook

**A local-first organizer for musicians who need every release, song, and lyric sheet in order before they hit record.**

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&labelColor=20232a)
![TypeScript](https://img.shields.io/badge/TypeScript-Vite-3178C6?logo=typescript&logoColor=white&labelColor=20232a)
![Status](https://img.shields.io/badge/status-in%20development-yellow)

---

## Why?

Recording sessions and music work often falls apart with no clear structure - lyrics in your phone's notes app, or in a random notebook, ideas scattered through different files, group chats, notebooks (sounds familiar?).
**Songbook** aims to fix that problem and increase productivity by keeping every part of the recording process structured in views - albums, songs, and their respective tasks are kept in a hierarchical, easily readable structure so the only thing you have to worry about is recording.

---

## Features

**Releases & Songs**
Albums and songs are organized in a browsable hierarchy - click a release to see its title, release date, and full tracklist; click a song to view its title, key, tempo, and section list.

**Section-level editing**
Every song section (verse, chorus, whatever) is individually editable - take notes, or save lyrics for future reference.

**Task tracking**
Tasks can be generic or linked to specific songs - break down the full recording process into small, manageable tasks to think more about recording and less about "what am i supposed to do now".

**Local-first persistence**
All data is saved to `localStorage` and persists across sessions - no account registration needed.

**Import & Export**
Dump your entire library (albums, songs, tasks) to a single JSON file for backup. Importing data from another device with JSON. This allows for syncing data across devices with no need for creating an account with your email and personal data.

---

## Getting Started

You can visit the [website](https://customsongbook.vercel.app)<br/>
Or if you want to work locally with git:

```bash
# clone the repo
git clone https://github.com/OliverSlate/songbook.git
cd songbook

# install any missing dependencies
npm install

# run the app!
npm run dev
o
```

---

## Roadmap

- [ ] Import/Export
- [ ] "Notes" view
- [ ] "Audio" view for uploading and organizing voice notes
- [ ] Easier section reordering

[^note]: under the oath of AI hatred, i swear with every cell of my body no ai was used in this.
