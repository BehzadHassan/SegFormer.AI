# 🏎️ SegFormer.AI — Precision Urban Semantic Segmentation

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Now-6366f1?style=for-the-badge)](https://segformerai.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Google%20Colab-f9ab00?style=for-the-badge&logo=googlecolab)](https://colab.research.google.com/drive/1laDHS9Mo_9MvWf9oZXEqS6SVPiCn7HjD?usp=sharing)
[![Model](https://img.shields.io/badge/Model-SegFormer--B5-ff4b4b?style=for-the-badge)](https://huggingface.shields.io/nvidia/segformer-b5-finetuned-cityscapes-1024-1024)

**SegFormer.AI** is a premium, production-grade web application designed for real-time semantic segmentation of urban road scenes. Built with a state-of-the-art **SegFormer-B5 Transformer** architecture and a high-performance **FastAPI** backend, it provides pixel-perfect classification of Cityscapes dataset categories.

---

## ✨ Key Features

- **🚀 Real-time Inference**: Ultra-low latency processing powered by NVIDIA SegFormer-B5.
- **🎨 Premium UI/UX**: A modern, responsive dashboard with glassmorphism aesthetics and fluid Framer Motion animations.
- **🔍 Inspection Mode**: Interactive high-resolution zoom modal for detailed mask analysis.
- **📊 Analytics Dashboard**: Real-time breakdown of detected object classes (e.g., Road, Building, Vegetation, Pedestrian) with percentage distribution.
- **📥 One-Click Export**: Instant download for both classification masks and semantic overlays.
- **🔗 Dynamic Backend Bridging**: Seamlessly connect the frontend to remote GPU inference nodes via Ngrok.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.app)

### Backend (Inference Node)
- **Engine**: [FastAPI](https://fastapi.tiangolo.com/)
- **Model**: [SegFormer-B5](https://huggingface.co/nvidia/segformer-b5-finetuned-cityscapes-1024-1024) (Transformer-based)
- **Environment**: Google Colab / Linux with CUDA Support
- **Exposure**: [Ngrok](https://ngrok.com/)

---

## 🛰️ Connecting the Backend

Since the heavy lifting (GPU inference) is handled on a remote node (Google Colab), you need to bridge the frontend to the backend using Ngrok.

### 1. Start the Inference Node
1.  Open the [SegFormer Backend Notebook](https://colab.research.google.com/drive/1laDHS9Mo_9MvWf9oZXEqS6SVPiCn7HjD?usp=sharing) in Google Colab.
2.  Set your `NGROK_AUTHTOKEN` in the secrets/environment variables.
3.  Run all cells (`Ctrl + F9`).
4.  Copy the generated **Ngrok Public URL** (e.g., `https://xxxx-xx-xx-xx.ngrok-free.app`).

### 2. Link to Frontend
1.  Navigate to the [SegFormer.AI Playground](https://segformerai.vercel.app/demo).
2.  Locate the **Backend Node** configuration field.
3.  Paste your Ngrok URL and hit enter.
4.  The system will now route all segmentation requests to your live Colab GPU node.

---

## 💻 Local Development

If you wish to run the frontend locally:

### Prerequisites
- Node.js 18.x or higher
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/BehzadHassan/SegFormer.AI.git

# Navigate to the frontend directory
cd SegFormer.AI

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## 📖 Architecture Overview

The project uses a proxy architecture to handle communication between the Vercel-deployed frontend and the Colab-hosted backend:

1.  **Client-Side**: The user uploads an image and provides a dynamic API URL.
2.  **Next.js API Route**: The `/api/segment` route acts as a secure proxy, injecting necessary headers (like `ngrok-skip-browser-warning`) to ensure smooth communication with Ngrok.
3.  **FastAPI Backend**: Receives the image, processes it through the SegFormer-B5 model using PyTorch, and returns base64-encoded masks and analytics.

---

## 🤝 Credits & Acknowledgements

- **Model**: Developed by NVIDIA, fine-tuned on the [Cityscapes Dataset](https://www.cityscapes-dataset.com/).
- **Inspiration**: Designed for developers and researchers to visualize Transformer-based segmentation in a professional web environment.

---
Developed with ❤️ by [Behzad Hassan](https://github.com/BehzadHassan)
