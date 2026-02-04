# ArteModular AI Development Guide

> Essential knowledge for AI agents working with ArteModular's landing page and backend.

## Project Overview

ArteModular is a professional carpentry landing page with a Vue.js frontend and Express.js backend, featuring:
- Modern landing page components
- Email contact system with Firebase integration
- 3D modeling showcase and interactive galleries
- Admin panel for testimonials management

## Architecture

### Frontend (Vue.js + Vite)
- `/src/components/` - Vue components following atomic design
- `/src/config/` - Centralized configuration (URLs, endpoints)
- `/src/router/` - Vue Router configuration
- `/src/stores/` - State management (auth, user data)

### Backend (Express.js)
- `/backend/services/` - Core business logic (email, testimonials)
- `/backend/controllers/` - Request handlers
- `/backend/config/` - Server configuration
- `/backend/routes/` - API endpoint definitions

## Key Development Workflows

### Local Development Setup
```bash
# Frontend (Port 9001)
npm run dev:full          # Development with Tailwind watch
npm run tailwind:watch   # CSS only

# Backend (Port 3001)
cd backend && npm run dev
```

### Email Testing
Test email configuration:
```bash
curl http://localhost:3001/api/test-email
```

### Testimonials Flow
1. Users submit testimonials through frontend form
2. Data stored in Firebase Realtime Database
3. Admin approves/rejects via admin panel
4. Approved testimonials display on landing page

## Project-Specific Patterns

### Configuration Management
- Environment variables: `.env.local` (development) and Vercel (production)
- Centralized config: `src/config/index.js` and `backend/config/index.js`
- Feature flags and environment-specific settings consolidated

### Component Design
1. Section components (`*Section.vue`) define page structure
2. Card components (`*Card.vue`) handle item display
3. Form components manage user input with validation
4. Icons stored in `src/components/icons/` for consistency

### Firebase Integration
- Authentication: Google Sign-in for admin access
- Database: Realtime Database for testimonials
- Config: `src/config/firebase.js` for frontend, `backend/config/firebase.js` for API

### Error Handling
- Frontend: Global error boundary in App.vue
- Backend: Centralized error middleware
- Rate limiting: 5 emails per IP every 15 minutes

## Integration Points

### API Endpoints
- `POST /api/contact` - Submit contact forms
- `GET /api/health` - Server health check
- `GET /api/test-email` - Email configuration test
- Full testimonials CRUD endpoints for admin

### External Services
- Firebase Authentication
- Firebase Realtime Database
- SMTP email service (configured in backend)
- Image hosting for galleries

## Common Tasks

### Adding New Components
1. Create component in `/src/components/`
2. Register in parent section component
3. Update routing if needed
4. Test responsive behavior

### Modifying Email Templates
1. Edit templates in `backend/services/emailService.js`
2. Test with development SMTP settings
3. Verify HTML/plain text versions
4. Check spam score

### Managing Images
1. Optimize images before adding to `/public/images/`
2. Update gallery data in `/public/data/gallery.json`
3. Follow established naming conventions
4. Test lazy loading behavior