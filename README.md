# 📝 TodoApp

A simple local todo manager built using **React** and **Electron**, styled with **Bootstrap**.  
Todos are stored using `localStorage`, and the app can run as a desktop app without installation.

---

## 🛠 How to Build the App

#### 1. Clone the Repository
```bash
git clone https://github.com/pravi-97/TODO.git
cd TODO
```
#### 2. Install Dependencies
```bash
npm run build
```
#### 3. Build the React App
```bash
npm run build
```
This will build the React frontend into the dist folder.
#### 4. Run the Electron App
```bash
npm run electron
```
To run React + Electron in development mode simultaneously:
```bash
npm run electron-dev
```

## ⚙️ Launch on Windows Startup
You can add a .bat script to launch the app automatically when Windows starts.

#### 1. Create a .bat file (e.g., start-todo.bat) with the following content:
```bash
@echo off
cd /d "C:\path\to\your\project"
npx electron .
```
Replace **C:\path\to\your\project** with the actual absolute path to your project folder.
Add it to Startup:

* Press **Win+R**, type shell:startup, and press Enter.
* Copy start-todo.bat into that folder.

Now, the app will launch every time Windows starts.

## 📦 Optional: Build an EXE
```bash
npx electron-builder
```
