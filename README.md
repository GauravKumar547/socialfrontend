# Socialize - Social Media Frontend

A modern React-based social media frontend application built with TypeScript, featuring real-time messaging, post sharing, user profiles, and more.

## 🚀 Features

### Core Features
- **User Authentication**: Login, register, and session management
- **Post Management**: Create, read, update, and delete posts with image uploads
- **Real-time Messaging**: Socket.io powered chat system
- **User Profiles**: Complete user profiles with friend management
- **Feed System**: Timeline feed with post interactions
- **File Upload**: Firebase Storage integration for images
- **Responsive Design**: Mobile-friendly interface

### Technical Features
- **TypeScript**: 100% TypeScript implementation with strict typing
- **Modern React**: React 18.3.1 with hooks and context
- **Tailwind CSS**: Utility-first CSS framework for modern styling
- **Real-time Updates**: Socket.io for instant messaging
- **Firebase Integration**: Storage and authentication
- **Material-UI**: Professional UI components
- **Vite**: Fast build tool with HMR
- **ESLint**: Code quality and consistency

## 🛠️ Technology Stack

### Frontend
- **React** 18.3.1 - Modern React with hooks
- **TypeScript** 5.6.3 - Strict typing throughout
- **Tailwind CSS** 3.x - Utility-first CSS framework
- **Vite** 6.0.5 - Fast build tool and dev server
- **Material-UI** 6.1.9 - Professional UI components
- **React Router** 7.0.2 - Client-side routing
- **Socket.io Client** 4.8.1 - Real-time communication

### Backend Integration
- **Axios** 1.7.9 - HTTP client for API calls
- **Firebase** 11.1.0 - Storage and authentication
- **Timeago.js** 4.0.2 - Time formatting

### Development Tools
- **ESLint** 9.17.0 - Code linting and formatting
- **TypeScript Compiler** - Strict type checking
- **Vite Plugin React** - React support for Vite

## 📁 Project Structure

```
socialfrontend/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── layout/         # Layout components
│   │   ├── forms/          # Form components
│   │   ├── feed/           # Feed-related components
│   │   ├── post/           # Post components
│   │   ├── share/          # Share components
│   │   ├── topbar/         # Navigation components
│   │   ├── sidebar/        # Sidebar components
│   │   ├── rightbar/       # Right sidebar components
│   │   ├── online/         # Online users components
│   │   ├── message/        # Messaging components
│   │   ├── conversation/   # Conversation components
│   │   ├── chatOnline/     # Chat online components
│   │   ├── closeFriend/    # Close friends components
│   │   └── settingModal/   # Settings modal components
│   ├── pages/              # Page components
│   │   ├── home/           # Home page
│   │   ├── login/          # Login page
│   │   ├── register/       # Register page
│   │   ├── profile/        # Profile page
│   │   └── messenger/      # Messenger page
│   ├── context/            # React context providers
│   │   ├── AuthContext.tsx # Authentication context
│   │   ├── AuthReducer.ts  # Auth state reducer
│   │   └── AuthAction.ts   # Auth action types
│   ├── types/              # TypeScript type definitions
│   │   ├── index.ts        # Main type definitions
│   │   └── env.d.ts        # Environment type definitions
│   ├── utils/              # Utility functions
│   │   ├── constants.ts    # App constants
│   │   └── helpers.ts      # Helper functions
│   ├── network/            # API and network utilities
│   │   └── network.ts      # HTTP client configuration
│   ├── hooks/              # Custom React hooks
│   ├── services/           # Business logic services
│   ├── lib/                # Third-party library configurations
│   ├── assets/             # Static assets
│   ├── firebase.ts         # Firebase configuration
│   ├── apiCalls.ts         # API call functions
│   ├── main.tsx            # Application entry point
│   └── App.tsx             # Main app component
├── public/                 # Static public assets
├── dist/                   # Build output
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── eslint.config.ts        # ESLint configuration
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** 22.11.0 or higher
- **npm** or **yarn**

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd socialfrontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=your_api_base_url
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 Available Scripts

```bash
# Development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check
```

## 🔒 Environment Variables

The application uses the following environment variables:

- `VITE_API_BASE_URL` - Backend API base URL
- `VITE_FIREBASE_API_KEY` - Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID` - Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID` - Firebase app ID

## 📊 TypeScript Features

### Strict Type Safety
- **No `any` types** - Complete type safety throughout
- **Strict compiler options** - Maximum type checking
- **Interface-driven development** - 200+ type definitions
- **Readonly properties** - Immutable data structures

### Advanced Types
- **Generic types** - Reusable type definitions
- **Union types** - Flexible type combinations
- **Mapped types** - Type transformations
- **Conditional types** - Type logic

### Enterprise Patterns
- **Dependency injection** - Modular architecture
- **Error boundaries** - Graceful error handling
- **Custom hooks** - Reusable logic
- **Type guards** - Runtime type checking

## 🎨 UI/UX Features

### Modern Design
- **Tailwind CSS utilities** - Modern, utility-first styling
- **Material-UI components** - Professional appearance
- **Responsive layout** - Mobile-first approach
- **Custom design system** - Consistent spacing and colors
- **Accessible design** - WCAG compliance

### Interactive Elements
- **Real-time updates** - Socket.io integration
- **Image uploads** - Firebase Storage
- **Form validation** - Client-side validation
- **Loading states** - Better user experience

## 🔐 Security Features

### Authentication
- **JWT tokens** - Secure authentication
- **Session management** - Automatic token refresh
- **Route protection** - Private routes
- **Input validation** - XSS prevention

### Data Protection
- **Type-safe API calls** - Prevent data corruption
- **Environment variables** - Secure configuration
- **Error handling** - Graceful failures
- **Input sanitization** - Security best practices

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Use ESLint configuration
- Write JSDoc comments
- Follow naming conventions
- Test all components

## 📝 Code Quality

### TypeScript Standards
- **Strict mode enabled** - Maximum type safety
- **Interface prefix** - `I` prefix for interfaces
- **Readonly properties** - Immutable data
- **JSDoc comments** - Function documentation

### ESLint Rules
- **React best practices** - Component guidelines
- **TypeScript rules** - Type safety
- **Import organization** - Clean imports
- **Naming conventions** - Consistent naming

## 🚦 Performance

### Build Optimization
- **Code splitting** - Lazy loading
- **Tree shaking** - Remove unused code
- **Bundle analysis** - Size monitoring
- **Compression** - Gzip compression

### Runtime Performance
- **React.memo** - Component memoization
- **useMemo/useCallback** - Hook optimization
- **Lazy loading** - Route-based splitting
- **Image optimization** - Responsive images

## 📚 Documentation

### API Documentation
- **Type definitions** - Complete API types
- **Error handling** - Error interfaces
- **Response formats** - Standardized responses
- **Authentication** - Auth flow documentation

### Component Documentation
- **Props interfaces** - Component contracts
- **Usage examples** - Implementation guides
- **Styling guides** - CSS conventions
- **Testing guides** - Testing strategies

## 🏗️ Architecture

### Component Architecture
- **Functional components** - Modern React patterns
- **Custom hooks** - Reusable logic
- **Context providers** - State management
- **Higher-order components** - Code reuse

### State Management
- **React Context** - Global state
- **Local state** - Component state
- **Reducers** - Complex state logic
- **Immutable updates** - State consistency

## 🔄 Recent Updates

### Version 2.0.0 - Complete TypeScript Migration & Tailwind CSS
- ✅ **100% TypeScript conversion** - All 5 pages and 10 components converted
- ✅ **Tailwind CSS integration** - Complete utility-first styling migration
- ✅ **Dependency modernization** - Latest versions for Node.js 22.11.0
- ✅ **ESLint 9.x migration** - Flat config format
- ✅ **Vite 6.x upgrade** - Latest build tool with optimal performance
- ✅ **React 18.3.1** - Latest React version with modern patterns
- ✅ **Material-UI 6.x** - Latest UI components
- ✅ **Firebase 11.x** - Latest Firebase SDK with type safety
- ✅ **Strict typing** - Zero `any` types throughout codebase
- ✅ **Industry structure** - Professional folder organization
- ✅ **60%+ smaller CSS bundle** - Optimized from 13KB to 5KB
- ✅ **All CSS files eliminated** - Single Tailwind entry point

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Development Team** - Initial work and TypeScript conversion
- **Contributors** - See the [contributors](../../contributors) page

## 🆘 Support

For support, please create an issue in the repository or contact the development team.

## 🎉 Acknowledgments

- React team for the amazing framework
- TypeScript team for type safety
- Material-UI team for beautiful components
- Firebase team for backend services
- Open source community for libraries and tools

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
