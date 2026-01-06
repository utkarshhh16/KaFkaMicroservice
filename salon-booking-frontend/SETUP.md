# Quick Start Guide

## Installation Steps

### 1. Extract the zip file
```bash
unzip salon-booking-frontend.zip
cd salon-booking-frontend
```

### 2. Install dependencies
```bash
npm install
```

This will install all required packages:
- React 18.3.1
- TypeScript 5.2.2
- Vite 5.0.8
- Tailwind CSS 3.4.1
- Zustand 4.4.2
- Axios 1.6.2
- React Router DOM 6.20.0

### 3. Configure environment (optional)
Create `.env` file or use `.env.example`:
```bash
cp .env.example .env
```

Edit `.env` if your backend runs on a different port:
```
VITE_API_BASE_URL=http://localhost:8080
VITE_API_GATEWAY_URL=http://localhost:8765
```

### 4. Start development server
```bash
npm run dev
```

The frontend will open automatically at **http://localhost:5173**

## Backend Connection

Make sure your Java microservices backend is running:
- **API Gateway**: http://localhost:8080 (or configured port)

The frontend will automatically connect to the gateway for all API calls.

## Testing the App

1. **Register as Customer**: `/register` → Select "Customer"
2. **Browse Salons**: `/salons` 
3. **View Dashboard**: `/customer/dashboard`
4. **Register as Salon Owner**: `/register` → Select "Salon Owner"
5. **Manage Salon**: `/salon/dashboard`

## Production Build

```bash
npm run build
npm run preview
```

The optimized build will be in the `dist/` folder, ready for deployment.

## Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Connect your GitHub repo
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Docker
```bash
docker build -t salon-frontend .
docker run -p 3000:5173 salon-frontend
```

## Project Structure

```
salon-booking-frontend/
├── src/
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── services/         # API client
│   ├── store/            # Zustand stores
│   ├── types/            # TypeScript types
│   ├── styles/           # Global CSS
│   ├── App.tsx           # Main component
│   └── main.tsx          # Entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── package.json
└── README.md
```

## Key Features Ready to Use

✅ Complete authentication system (Login/Register)
✅ Customer booking management
✅ Salon owner dashboard
✅ Admin panel with statistics
✅ Service management
✅ Responsive design
✅ Dark mode ready
✅ Type-safe components
✅ API integration ready

## Next Steps

1. Update the backend API URL if needed
2. Test registration and login flows
3. Connect to your Java microservices
4. Customize branding and colors in Tailwind config
5. Deploy to production

---

**You're all set! Start building your salon booking platform 🚀**
