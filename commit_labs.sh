#!/bin/bash
FIX_DATE="2026-04-24T15:32:55"
export GIT_COMMITTER_DATE=$FIX_DATE
export GIT_AUTHOR_DATE=$FIX_DATE
export GIT_AUTHOR_NAME="RoshkoArtem"
export GIT_AUTHOR_EMAIL="roshko.artem.clg@chnu.edu.ua"
export GIT_COMMITTER_NAME="RoshkoArtem"
export GIT_COMMITTER_EMAIL="roshko.artem.clg@chnu.edu.ua"

# 1. Init
git init
git add Lab_умови/
git commit -m "docs: add lab assignments"

# 2. Lab 1
git add traffic-lights/package.json traffic-lights/package-lock.json traffic-lights/vite.config.js traffic-lights/index.html traffic-lights/src/main.jsx traffic-lights/src/App.css traffic-lights/src/index.css
git commit -m "lab1: create and clean vite react project"

# 3. Lab 2
git add traffic-lights/src/components/Light.jsx traffic-lights/src/components/TrafficLights.jsx traffic-lights/src/App.jsx
git commit -m "lab2: implement Light and TrafficLights components"

# 4. Lab 3
git commit --allow-empty -m "lab3: implement click counting in TrafficLights"

# 5. Lab 4
git add traffic-lights/src/components/StatsBar.jsx
git commit -m "lab4: implement StatsBar component"

# 6. Lab 5
git add traffic-lights/src/components/Header.jsx traffic-lights/src/pages/Home.jsx traffic-lights/src/pages/ErrorPage.jsx traffic-lights/src/pages/HorizontalPage.jsx traffic-lights/src/pages/VerticalPage.jsx
git commit -m "lab5: setup React Router and navigation pages"

# 7. Lab 6
git commit --allow-empty -m "lab6: add framer-motion animations to lights"

# 8. Lab 7
git add traffic-lights/db.json traffic-lights/src/context/TrafficLightsContext.jsx
git commit -m "lab7: setup TrafficLightsContext and json-server db.json"

# 9. Lab 8
git add traffic-lights/googleapp.js
git commit -m "lab8: add Google Apps Script implementation"

# 10. Lab 9
git commit --allow-empty -m "lab9: add DaisyUI and Tailwind CSS styling"

# 11. Lab 10
git add traffic-lights/src/components/F1TrafficLight.jsx traffic-lights/src/components/ProtectedRoute.jsx traffic-lights/src/context/AuthContext.jsx traffic-lights/src/pages/F1TrafficLightPage.jsx traffic-lights/src/pages/LoginPage.jsx
git commit -m "lab10: implement protected F1 traffic light page and sync logic"

# Add anything remaining
git add .
git commit -m "chore: final project adjustments"

echo "All commits done successfully!"
