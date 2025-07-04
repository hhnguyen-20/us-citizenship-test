# US Citizenship Test Preparation App

A comprehensive web application designed to help individuals prepare for the US Citizenship Test. This interactive tool provides practice questions across all required test categories with a modern, user-friendly interface.

## 🎯 Features

### Test Categories
- **Civics Test** - 100 official civics questions covering American government, history, and geography
- **Information Test** - Personal information questions commonly asked during the interview
- **Yes/No Questions** - Important yes/no questions with explanations for key terms
- **Reading & Writing Test** - Practice reading sentences aloud and writing them correctly
- **Meaning Test** - Vocabulary practice for understanding key terms used in the test
- **Mock Test** - Comprehensive practice test combining questions from all categories

### Key Features
- **Interactive Practice** - Navigate through questions with Previous/Next buttons
- **Jump to Question** - Quickly navigate to any specific question number
- **Text-to-Speech** - Hear questions and answers read aloud for pronunciation practice
- **Answer Reveal** - Show correct answers to check your knowledge
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Fixed Navigation** - Easy-to-access navigation buttons that stay at the bottom of the screen
- **Question Shuffling** - Randomize question order for better practice

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hhnguyen-20/us-citizenship-test.git
cd us-citizenship-test
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 How to Use

### Individual Test Sections
1. **Civics Practice** - Study the 100 official civics questions
2. **Information Practice** - Practice answering personal information questions
3. **Yes/No Practice** - Learn important yes/no questions with term explanations
4. **Reading & Writing** - Practice reading sentences and writing them correctly
5. **Meaning Practice** - Learn the meaning of key vocabulary terms

### Mock Test
- Takes 10 questions from Civics
- Takes 10 questions from Information  
- Takes 15 questions from Yes/No
- Takes 1 question from Reading & Writing
- Questions are randomized for realistic test simulation

### Navigation
- **Previous/Next** - Navigate between questions
- **Go Button** - Jump to any specific question number
- **Read Aloud** - Hear questions and answers spoken
- **Show Answer** - Reveal correct answers for learning

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) - React framework for production
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Deployment**: [Vercel](https://vercel.com/) - Easy deployment and hosting

## 📁 Project Structure

```
us-citizenship-test/
├── app/                    # Next.js app directory
├── components/             # Reusable React components
├── data/                   # JSON files containing test questions
│   ├── CivicsTest.json
│   ├── InformationTest.json
│   ├── YesNoTest.json
│   ├── ReadingAndWritingTest.json
│   └── MeaningTest.json
├── pages/                  # Individual test page components
├── styles/                 # Global styles
└── utils/                  # Utility functions
```

## 🎨 UI/UX Features

- **Modern Design** - Clean, professional interface
- **Mobile Responsive** - Optimized for all screen sizes
- **Accessibility** - Keyboard navigation and screen reader support
- **Fixed Navigation** - Easy access to controls at bottom of screen
- **Visual Feedback** - Clear button states and transitions

## 📝 Data Structure

Each test category uses a consistent JSON structure:

```json
{
  "id": 1,
  "question": "What is the supreme law of the land?",
  "answer": "The Constitution"
}
```

For Reading & Writing tests:
```json
{
  "id": 1,
  "reading": "Who was the first President?",
  "writing": "Washington was the first President."
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Official USCIS test questions and materials
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first styling approach
- All contributors who help improve this tool

**Good luck with your US Citizenship Test preparation! 🇺🇸**
