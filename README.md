# 🐱 CatME!

**Your purrsonalized profile app** — a fun, cat-themed React Native welcome screen.

---

## Description

**CatME!** is a React Native mobile application that greets new users with a playful cat-themed interface. It features:

- A **TextInput** for the user to type their name
- A **Submit button** that triggers an `Alert` welcoming the user by name
- **Smooth entrance animations** with staggered springs and a floating logo loop
- A polished **blue color palette** styled with `StyleSheet.create`

---

## 📦 Tech Stack

| Library | Purpose |
|---|---|
| React Native | Core framework |
| React Animated API | Entrance & button animations |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- iOS Simulator / Android Emulator, or a physical device with Expo Go

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/catme-app.git
cd catme-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app
```bash
npx expo start
```
Then scan the QR code with **Expo Go** on your phone, or press `i` for iOS Simulator / `a` for Android Emulator.
```

## Project Structure

catme-app/
├── assets/
│   └── profile.jpg            # Optional fallback profile image
├── src/
│   └── screens/
│       └── HelloExpoScreen.js # Main welcome screen component
├── README.md                  # Project documentation
└── package.json               # Project dependencies and scripts

```

---

## 🎮 How It Works

1. The app opens with a **staggered spring animation** revealing the header, logo, and form.
2. The cat logo **gently floats** up and down in a loop.
3. The user types their name into the **TextInput**.
4. Pressing **"Create My Profile"** triggers:
   - A button bounce animation
   - An `Alert` saying: *"Welcome to CatME, [Name]! 🐾"
5. If no name is entered, an error alert prompts the user to type a name first.

---

## 🖼 Logo

The logo is a **custom inline SVG** — no external image required. It depicts:
- A cartoon cat face with pointed ears and pink inner-ear detail
- White whiskers on both sides
- A cute pink nose and curved mouth
- Rosy cheek blush
- A small speech bubble reading **"ME!"**

---
