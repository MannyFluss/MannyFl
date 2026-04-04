# MannyFl Website — Build Handoff

Drop this file into a new Claude Code session in the `/Users/mannyfluss/MannyFl` directory and say: **"Build the prototype described in this file."**

---

## What You're Building

A personal portfolio website for Manny Fluss — `mannyfluss.github.io/MannyFl`.

It's a **vertical scroll timeline (2019–2026)** with **four embedded interactive game toys** along the way. Plain white, document-like structure for now. Manny will do the visual pass later — just make sure every div has clean semantic class names for that future pass.

---

## Step 0: Wipe These Files First

Delete (but keep folders: `Icons/`, `Images/`, `newImages/`, `Space_Mono/`):
```
index.html, styles.css, background.js, boids.js, carousel.js,
interactiveSlides.js, mainMannyGame.js, temp.txt,
image1.jpg, image2.jpg, image3.jpg, MyProject.zip
```

---

## File Structure to Create

```
MannyFl/
├── index.html
├── styles.css
├── js/
│   ├── timeline.js
│   ├── gameActivation.js
│   └── games/
│       ├── towerDefense.js
│       ├── shuffleCity.js
│       ├── mannyGame3D.js
│       └── partyMgmt.js
```

---

## Visual Rules

- `body { background: #fff; }` — plain white, no animated background
- Font: Space Mono from `Space_Mono/SpaceMono-Regular.ttf`
- Every div gets a semantic class name (`.timeline-spine`, `.year-node`, `.game-node`, `.game-node--tower-defense`, etc.)
- No styling decisions — just structure

---

## index.html Layout

```html
<header class="site-header">
  <!-- Manny Fluss + social icons -->
  <!-- GitHub: https://github.com/MannyFluss -->
  <!-- YouTube: https://www.youtube.com/@mny2954/featured -->
  <!-- LinkedIn: https://www.linkedin.com/in/manny-fluss-853416228/ -->
  <!-- Itch.io: https://mannyonitch.itch.io/ -->
  <!-- Icon files in Icons/ folder as SVGs -->
</header>

<main class="timeline">
  <div class="timeline-spine">

    <div class="year-node" data-year="2019"><span>2019</span></div>
    <div class="year-node" data-year="2020"><span>2020</span></div>
    <div class="year-node" data-year="2021"><span>2021</span></div>

    <div class="year-node" data-year="2022"><span>2022</span></div>
    <div class="game-node game-node--tower-defense" id="game-tower-defense"></div>
    <div class="game-node game-node--shuffle-city" id="game-shuffle-city"></div>

    <div class="year-node" data-year="2023"><span>2023</span></div>
    <div class="game-node game-node--manny3d" id="game-manny3d"></div>

    <div class="year-node" data-year="2024"><span>2024</span></div>
    <div class="game-node game-node--party-mgmt" id="game-party-mgmt"></div>

    <div class="year-node" data-year="2025"><span>2025</span></div>
    <div class="year-node" data-year="2026"><span>2026</span></div>

  </div>
</main>
```

Scripts to load:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
<script src="js/gameActivation.js"></script>
<script src="js/games/towerDefense.js"></script>
<script src="js/games/shuffleCity.js"></script>
<script src="js/games/mannyGame3D.js"></script>
<script src="js/games/partyMgmt.js"></script>
<script src="js/timeline.js"></script>
```

---

## gameActivation.js — Shared Scroll-Lock System

Every game node has this behavior:
- Default: dimmed `.game-overlay` div on top with "tap to play" text
- First tap/click INSIDE: hide overlay, set `touch-action: none` on canvas, add `.game-active` class
- Deactivate: click/tap outside OR press Escape
- Only one game active at a time
- iframes: wrap in transparent pointer-events div that catches first click then removes itself
- `// TODO: panic gesture (rapid up/down swipe)`

---

## Game 1: Tower Defense

- `<iframe src="https://mannyfluss.github.io/TowerDefense/">` inside the game node
- No changes to the game itself
- gameActivation scroll-lock wrapper
- Label: "Tower Defense, 2022" — link: `https://mannyonitch.itch.io/multiplayertowerdefense`

---

## Game 2: Shuffle City — p5.js canvas

**Pure drag-and-place toy. No score, no interactions, no meteors.**

- 3×3 tile grid
- One "spawn tile" to the side — drag buildings from it onto grid
- Drag building from grid to move it
- Drop on occupied tile or off-grid: snap back to origin
- New building appears on spawn tile after you take one
- Loops forever

Building sprites — fetch from GitHub raw:
```
https://raw.githubusercontent.com/MannyFluss/CityGame-120/main/assets/buildings/small-apartment.png
https://raw.githubusercontent.com/MannyFluss/CityGame-120/main/assets/buildings/hotel.png
https://raw.githubusercontent.com/MannyFluss/CityGame-120/main/assets/buildings/casino.png
https://raw.githubusercontent.com/MannyFluss/CityGame-120/main/assets/buildings/factory.png
https://raw.githubusercontent.com/MannyFluss/CityGame-120/main/assets/buildings/windmill.png
https://raw.githubusercontent.com/MannyFluss/CityGame-120/main/assets/buildings/repair-crew.png
```
(Verify actual filenames at `https://github.com/MannyFluss/CityGame-120/tree/main/assets/buildings`)

Controls: mouse drag + touch drag

---

## Game 3: MannyGame3D — p5.js WEBGL

**Gaze-possession toy. Two characters wander. Look at one long enough and you possess them.**

Scene:
- Dark floor plane, simple scene
- Two characters as simple low-poly geometry (no .obj imports — approximate capybara + alpaca with basic 3D shapes, PSX/blocky aesthetic)
- Characters wander using simple wander steering (no WASD)

Possession mechanic:
- Tap/click on a character → gaze ring starts filling (0.75s, cubic ease)
- Click away before filled → ring resets
- Ring fills → possess:
  - Camera smoothly tweens to character's position/orientation
  - That character STOPS moving (frozen while possessed)
  - Other character keeps wandering
- While possessed: drag/swipe to orbit-look around from that character's POV
- Click the other character to start possessing them instead
- Loops forever

Original Godot repo for reference only: `https://github.com/MannyFluss/3D-Game`

---

## Game 4: Party Management — Static Card

Plain HTML card:
- Title: "Party Management"
- Description: "A fantasy puzzle game where you manage a party of adventurers through tactical grid challenges. 19 puzzle trials, 6 unique party members."
- `<!-- TRAILER: drop video embed here -->`
- "Play on Steam" button → `https://store.steampowered.com/app/3229150/Party_Management/`

---

## Verification Checklist

- [ ] index.html opens in browser with no server
- [ ] Timeline scrolls, year nodes 2019–2026 all visible
- [ ] Each game node shows "tap to play" overlay
- [ ] Tap activates, scroll locks
- [ ] Click outside / Escape deactivates
- [ ] Tower Defense iframe loads
- [ ] Shuffle City: drag buildings from spawn tile to grid
- [ ] MannyGame3D: characters wander, gaze ring fills, camera possession works, possessed character stops
- [ ] Party Management: Steam link works
- [ ] Mobile layout works (test in devtools)
