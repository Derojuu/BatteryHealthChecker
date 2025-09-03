# Battery Health Checker 🔋

A modern web application built with Next.js that helps you check your Windows laptop's battery health by analyzing PowerCfg battery reports.

## 📖 Overview

The Battery Health Checker is a user-friendly web application that calculates your laptop battery's health percentage by parsing Windows PowerCfg battery reports. It provides an intuitive interface to upload your battery report and instantly see your battery's current health status.

## ✨ Features

- **Simple Upload Interface**: Easy-to-use file upload for battery reports
- **Accurate Health Calculation**: Calculates battery health percentage based on design capacity vs full charge capacity
- **Modern UI**: Clean, responsive design built with Tailwind CSS and shadcn/ui components
- **Error Handling**: Comprehensive error messages for invalid files or parsing issues
- **Windows Integration**: Works seamlessly with Windows PowerCfg battery reports

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Windows operating system (for generating battery reports)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Derojuu/BatteryHealthChecker.git
cd battery-health-checker
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Build

```bash
npm run build
npm start
```

## 🔧 How to Use

### Step 1: Generate Battery Report
Run this command in Windows PowerShell or Command Prompt:
```cmd
powercfg /batteryreport /output "C:\battery-report.html"
```

### Step 2: Upload and Analyze
1. Open the Battery Health Checker web application
2. Click "Choose File" and select the generated `battery-report.html` file
3. Click "Calculate Health" to get your battery health percentage
4. View your battery health percentage and any relevant warnings

### Understanding Results
- **90-100%**: Excellent battery health
- **80-89%**: Good battery health
- **70-79%**: Fair battery health
- **Below 70%**: Consider battery replacement

## 🛠 Tech Stack

- **Framework**: Next.js 15.3.1 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives with shadcn/ui
- **Icons**: Lucide React
- **Font**: Geist Sans & Geist Mono

## 📁 Project Structure

```
battery-health-checker/
├── app/                    # Next.js App Router directory
│   ├── page.tsx           # Main battery checker component
│   ├── layout.tsx         # Root layout with fonts and metadata
│   └── globals.css        # Global styles and Tailwind imports
├── components/ui/         # Reusable UI components
│   ├── button.tsx         # Custom button component
│   ├── card.tsx          # Card layout components
│   ├── input.tsx         # File input component
│   ├── label.tsx         # Form label component
│   └── separator.tsx     # Visual separator component
├── lib/
│   └── utils.ts          # Utility functions (cn helper)
├── public/               # Static assets
└── package.json         # Project dependencies and scripts
```

## 🧩 Key Components

### Main Battery Checker (`app/page.tsx`)
- File upload handling
- Battery report parsing logic
- Health percentage calculation
- Error handling and user feedback

### UI Components (`components/ui/`)
- Modular, reusable components built with Radix UI
- Consistent styling with Tailwind CSS
- Accessible and responsive design

## 🔍 How It Works

1. **File Upload**: Users upload their PowerCfg battery report HTML file
2. **Text Parsing**: The application extracts "DESIGN CAPACITY" and "FULL CHARGE CAPACITY" values
3. **Health Calculation**: Battery health = (Full Charge Capacity / Design Capacity) × 100
4. **Result Display**: Shows the calculated percentage with appropriate styling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Troubleshooting

### Common Issues

- **"Capacity values not found"**: Ensure you're uploading a valid PowerCfg battery report
- **"Failed to read or parse"**: Check that the file isn't corrupted and is in HTML format
- **No file selected**: Make sure to select a file before clicking "Calculate Health"

### Getting Help

If you encounter issues:
1. Check that your battery report was generated correctly
2. Ensure the file is the complete HTML report from PowerCfg
3. Try regenerating the battery report and uploading again

## 🌟 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
