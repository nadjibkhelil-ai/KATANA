# 🚀 Git & GitHub Setup Guide for KATANA BURGER

## Step 1: Install Git

Git is not installed on your system. You have two options:

### Option A: Using winget (Windows Package Manager)
Open PowerShell and run:
```powershell
winget install --id Git.Git -e --source winget
```
Then **restart your computer** or at least close and reopen your terminal.

### Option B: Download from website
1. Go to https://git-scm.com/download/win
2. Click "Click here to download"
3. Run the installer
4. Keep all default settings, click Next → Install → Finish
5. **Restart VS Code** (close and reopen)

---

## Step 2: Verify Git Installation
Open a new terminal and run:
```powershell
git --version
```
You should see something like: `git version 2.xx.x`

---

## Step 3: Create a GitHub Repository
1. Go to https://github.com/new
2. Sign in (or create a free account)
3. Repository name: `katana-burger`
4. Description: `KATANA BURGER - Restaurant website`
5. Choose **Public**
6. Click **Create repository**
7. **Copy the URL** — it will look like: `https://github.com/YOUR_USERNAME/katana-burger.git`

---

## Step 4: Push Your Code to GitHub
Open a terminal in VS Code (Ctrl + `) and run these commands **one by one**:

```powershell
# Navigate to the KATANA folder
cd KATANA

# Initialize Git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit"

# Connect to your GitHub repo (replace YOUR_USERNAME with your actual GitHub username!)
git remote add origin https://github.com/YOUR_USERNAME/katana-burger.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Step 5: If Git Asks for Login
- Use your **GitHub username** and **personal access token** (not your password)
- To create a token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token → check `repo` → copy the token

---

## Step 6: Deploy to Vercel
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click **Add New Project**
4. Select `katana-burger` repository
5. Click **Deploy**
6. Your site will be live at: `https://katana-burger.vercel.app`

---

## Quick Reference Commands

```powershell
# Check Git status
git status

# Add new changes
git add .
git commit -m "Your message here"
git push

# Pull latest changes
git pull