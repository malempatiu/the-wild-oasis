# The Wild Oasis

A modern, full-stack luxury cabin rental application built with Next.js. Experience the beauty of the Italian Dolomites through our curated collection of premium cabins, complete with stunning mountain views and world-class amenities.

## 🌟 Features

### For Guests

- **Browse Luxury Cabins**: Explore our curated collection of premium cabins with detailed descriptions, photos, and pricing
- **Advanced Filtering**: Filter cabins by capacity to find the perfect accommodation for your group
- **Seamless Booking**: Intuitive reservation system with date selection and guest management
- **User Authentication**: Secure login/signup with NextAuth integration
- **Profile Management**: Update personal information and view booking history
- **Reservation Management**: View, edit, and cancel existing bookings

### For Administrators

- **Cabin Management**: Add, update, and manage cabin listings
- **Booking Oversight**: Monitor and manage all reservations
- **Guest Management**: Handle guest information and preferences

## 🛠️ Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework

### Backend & Database

- **Supabase** - PostgreSQL database with real-time capabilities
- **NextAuth.js** - Authentication and session management

### Additional Libraries

- **Heroicons** - Beautiful, consistent icon set
- **date-fns** - Modern JavaScript date utility library
- **React Day Picker** - Flexible date picker component

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account and project

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd the-wild-oasis-client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with your Supabase and NextAuth configuration:

   ```env
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000

   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run prod` - Build and start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
the-wild-oasis-client/
├── app/                          # Next.js App Router
│   ├── _components/              # Reusable React components
│   ├── _context/                 # React Context providers
│   ├── _lib/                     # Utility functions and configurations
│   ├── _styles/                  # Global styles
│   ├── about/                    # About page
│   ├── account/                  # User account pages
│   ├── api/                      # API routes
│   ├── cabins/                   # Cabin-related pages
│   ├── login/                    # Authentication page
│   └── page.tsx                  # Home page
├── public/                       # Static assets
├── middleware.ts                 # Next.js middleware
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## 🔧 Key Components

### Core Components

- **CabinList**: Displays grid of available cabins
- **ReservationForm**: Handles booking creation and editing
- **DateSelector**: Interactive calendar for date selection
- **Header/Navigation**: Site-wide navigation and user menu

### Context & State

- **ReservationContext**: Manages reservation state across components

### Utilities

- **data-service.ts**: Supabase database operations
- **auth.ts**: Authentication utilities
- **actions.ts**: Server actions for form handling

## 🎨 Design System

The application uses a custom design system with:

- **Primary Colors**: Deep blues and whites for a luxurious feel
- **Accent Colors**: Warm oranges for call-to-action elements
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing scale using Tailwind's spacing system

## 🔐 Authentication

Built with NextAuth.js supporting:

- Email/password authentication
- Session management
- Protected routes and API endpoints
- User profile management

## 📊 Data Models

### Cabin

```typescript
{
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
}
```

### Booking

```typescript
{
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  guestId: number;
  cabinId: number;
  observations?: string;
}
```

## 🚀 Deployment

The application is optimized for deployment on Vercel, Netlify, or any platform supporting Next.js applications.

### Build Optimization

- Static generation for cabin listings (ISR)
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- CSS optimization with Tailwind CSS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 📞 Support

For support or questions, please contact the development team.

---

_Experience luxury in the heart of the Italian Dolomites with The Wild Oasis._
