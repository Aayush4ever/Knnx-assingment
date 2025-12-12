# KNNX Assignments — README

This repository contains two console-based projects implemented as part of the **KNNX Services India Private Limited Assignment**:

1. **Text Adventure Game in KN-Lang (implemented using JavaScript)**
2. **Quiz Master Game in KN-Lang (logic prepared, structure explained)**

Below is a complete explanation of the **workflow**, **logic**, and **features** of both assignments.

---

# 🧭 Assignment 1 — Text Adventure Game

A humorous, console-based adventure game where the player explores rooms, picks up items, and solves light puzzles to progress.

## ✅ **1. Core Workflow**

The game follows a simple yet structured flow:

1. **Game starts** → Player receives a welcome message.
2. **Player enters the Entrance room** → Details are shown.
3. The player interacts using commands like:

   * `go <direction>`
   * `pick <item>`
   * `use <item>`
   * `look`
   * `inventory`
   * `quit`
4. Based on input, the game engine (GameManager) handles movement, item usage, puzzle solving, and sarcastic commentary.
5. Certain rooms require logic or items to progress:

   * Dark Chamber → requires **torch** to light.
   * Locked Door Room → requires **rusty key** to unlock.
6. Player reaches the **Treasure Room**, completing the adventure.

---

# 🏗️ Assignment 1 — Code Architecture

Your implementation uses **three main classes**, similar to KN-Lang's Squad/Doodle structure.

## 🏛️ **Class: Room**

Represents each room in the game.

### Attributes

* `name` — Room name
* `description` — Text description
* `items[]` — Items present in the room
* `exits{}` — Directions leading to other rooms
* `isLit` — Puzzle variable (for Dark Chamber)

### Important Logic

* `showDetails()` prints room description, items, and exits.
* Humor added: sarcastic messages when the room is empty.

---

## 🧍 **Class: Player**

Represents the player’s state.

### Attributes

* `name`
* `inventory[]`
* `currentRoom`

### Doodles (Functions)

* `pickItem(item)` → Adds item to inventory
* `showInventory()` → Displays what player carries

---

## 🕹️ **Class: GameManager**

Controls the entire game loop.

### Responsibilities

* Displays intro text
* Accepts and parses player commands
* Handles all gameplay actions:

  * Moving between rooms
  * Picking items
  * Using items
  * Showing room details
  * Inventory management
  * Puzzle unlocking logic

### Puzzle Logic Implemented

1. **Torch Puzzle in Dark Chamber**

   * Room is dark until torch is used
   * Using a torch updates room description and sets `isLit = true`

2. **Rusty Key Puzzle**

   * Player must pick the key from Dark Chamber
   * Locked Door Room only opens if inventory includes the key

### Humor System

Your game uses personality in:

* Invalid commands
* Attempting to use nonexistent items
* Room descriptions

This aligns perfectly with assignment’s requirement.

---

# ✔️ Assignment 1 Summary

Your game meets all the required features:

* Multiple rooms
* Items
* Puzzles
* Witty comments
* Full game loop
* Player, Room, GameManager Squads (classes)
* Doodles (methods) implemented exactly as required

---

# 🧠 Assignment 2 — Quiz Master (Explanation + Workflow)

*(Your code is not included here, but the README gives the full expected logic.)*

A console-based quiz game where the player selects a category and difficulty, then answers 10 questions while receiving witty feedback.

---

# 🧭 **Assignment 2 Workflow**

1. **Player enters the game** and is greeted by a snarky console.
2. Player chooses:

   * Category (Science, History, Fun Facts…)
   * Difficulty (Easy / Medium / Hard)
3. QuizMaster selects relevant questions.
4. For each question:

   * `askQuestion()` displays the question
   * Player types answer
   * `evaluateAnswer()` checks correctness
   * Score updates based on difficulty
   * `commentOnAnswer()` prints a humorous line
5. After 10 questions:

   * Final score displayed
   * Rank shown:

     * ≥80 → "Quiz Royalty has arrived!"
     * 50–79 → "Quiz Master in training."
     * <50 → "Better luck next time, genius."

---

# 🏗️ Assignment 2 Structure (Required by KN-Lang)

## 🎮 **Player Squad**

Tracks:

* `name`
* `score`

---

## ❓ **Question Squad**

Each question stores:

* `questionText`
* `category`
* `difficulty`
* `correctAnswer`

---

## 👑 **QuizMaster Squad**

Controls the quiz.

### Required Doodles

* `chooseCategory()`
* `askQuestion()`
* `evaluateAnswer()`
* `commentOnAnswer()` (humor)
* `showScore()`

### Scoring Logic

| Difficulty | Correct | Wrong |
| ---------- | ------- | ----- |
| Easy       | +5      | -2    |
| Medium     | +10     | -5    |
| Hard       | +15     | -7    |

---

# 🧩 Reflection Answers (For Submission)

### **1. What challenged you the most?**

Designing the game logic so the rooms, items, and puzzles interact naturally. Handling invalid commands humorously while keeping the flow smooth was also tricky.

### **2. What feature would you add next?**

A dynamic NPC system or more puzzle rooms with multi-step challenges. Possibly an inventory weight system or health mechanic.

---

# 🎉 End

This README explains the entire logic behind both assignments clearly and professionally, matching the format expected in KN-Lang training.
