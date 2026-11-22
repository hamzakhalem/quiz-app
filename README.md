<div align="center">

<img src="assets/logo.png" width="90" alt="WZR Quiz logo">

# WZR Quiz

<p dir="rtl"><b>اختبر معلوماتك… وضحك شوية.</b></p>

**A light-hearted Arabic trivia app for Android and iOS, built with React Native.**

![React Native](https://img.shields.io/badge/React%20Native-0.74-61dafb?logo=react&logoColor=white)
![SQLite](https://img.shields.io/badge/storage-SQLite-003b57?logo=sqlite&logoColor=white)
![Platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS-3ddc84)

</div>

## What it is

WZR Quiz asks short trivia questions in Arabic, with a strong Algerian flavour: local football, history, geography and pop culture. Every question has one right answer and a few deliberately funny wrong ones. After each answer a reaction image pops up, then you move on.

## Features

- **6 categories:** رياضة (sports), سياسة (politics), فنون (arts), تاريخ (history), علوم (science), جغرافيا (geography). 31 questions in total.
- **Answer to advance:** a wrong answer keeps you on the same question until you get it right.
- **Reaction images** for right and wrong answers, picked at random.
- **Progress saved on the device** with SQLite: leave a category and you continue from the same question next time.
- **Score screen** at the end of each category.
- **Dark theme** throughout.

## Tech stack

| Part | Library |
|---|---|
| App | React Native 0.74, React 18 |
| Navigation | React Navigation (native stack) |
| Storage | react-native-sqlite-storage |
| Icons | react-native-vector-icons (Ionicons) |

## Run it locally

You need Node.js 18 or newer and a working React Native setup for Android and/or iOS ([environment setup guide](https://reactnative.dev/docs/set-up-your-environment)).

```sh
git clone https://github.com/hamzakhalem/quiz-app.git
cd quiz-app
npm install
```

On macOS, install the iOS pods once:

```sh
bundle install
cd ios && bundle exec pod install && cd ..
```

Then start Metro and run the app:

```sh
npm start
npm run android   # or: npm run ios
```

## Project structure

```text
App.js                     navigation: Home → Category → Result
src/
├── screens/
│   ├── HomeScreen.js      category grid
│   ├── CategoryScreen.js  questions, answer check, reaction image, progress
│   └── ResultScreen.js    final score
├── components/
│   ├── CategoryCard.js
│   └── Question.js
└── data/
    ├── quizzes.js         all questions
    └── database.js        SQLite progress table
assets/                    logo and reaction images
```

## Add your own questions

Questions live in [`src/data/quizzes.js`](src/data/quizzes.js). Add an entry to a category's `questions` array:

```js
{
  question: 'ما هي عاصمة الجزائر؟',
  options: ['وهران', 'الجزائر', 'قسنطينة', 'عنابة'],
  answer: 'الجزائر',   // must match one of the options exactly
  number: 7,
},
```

To add a whole new category, add a new object with its own `category` name and `questions` list. It shows up on the home screen automatically.

## Author

Made by [Hamza Khalem](https://hamzakhalem.pages.dev). I also make tech videos in Algerian Darija as [WZR Tech](https://www.tiktok.com/@wzrtech).
