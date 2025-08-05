# Gweru Municipal ERP - Deployment Guide

## Deployment Fixes Applied

The following critical deployment issues have been resolved:

### 1. Health Check Endpoints ✅

Added multiple health check endpoints for deployment verification:

- **`/api/health`** - Primary health check endpoint returning JSON status
- **`/api/status`** - Additional status endpoint with uptime information  
- **`/ping`** - Simple ping endpoint for basic connectivity checks
- **`/health`** - Alternative health endpoint (development serves frontend, production serves JSON)

**Example Health Check Response:**
```json
{
  "status": "healthy",
  "service": "gweru-municipal-erp",
  "timestamp": "2025-08-03T20:16:43.824Z",
  "version": "1.0.0"
}
```

### 2. Seeding Process Fixed ✅

**Problem:** The seeding process was exiting the main application process with `process.exit(0)`.

**Solution Applied:**
- Modified `server/index.ts` to run seeding in background using `setImmediate()`
- Seeding no longer blocks application startup
- Added proper error handling that logs warnings but doesn't crash the app
- Seeding only exits when run as a standalone script, not when imported

### 3. Production Session Store ✅

**Problem:** Application was using MemoryStore which doesn't scale in production.

**Solution Applied:**
- Updated `server/tempAuth.ts` to use PostgreSQL session store in production
- Automatically detects production environment and switches to proper session store
- Uses `connect-pg-simple` with the database connection from `DATABASE_URL`
- Falls back to MemoryStore only in development
- Optimized cookie configuration for deployment compatibility (disabled secure flag for Replit)
- Added explicit session save callbacks for reliable authentication state

**Session Store Configuration:**
```typescript
// Production: PostgreSQL session store
const pgStore = connectPg(session);
sessionStore = new pgStore({
  conString: process.env.DATABASE_URL,
  createTableIfMissing: true,
  ttl: 7 * 24 * 60 * 60, // 7 days
  tableName: "sessions",
});

// Development: MemoryStore (default)
```

## Deployment Configuration

### Required Environment Variables

Set these environment variables for production deployment:

```bash
NODE_ENV=production
DATABASE_URL=postgresql://username:password@host:port/database
SESSION_SECRET=your-secure-session-secret-here
PORT=5000
```

### Health Check Endpoints for Deployment Platforms

Different deployment platforms can use these endpoints:

| Platform | Recommended Endpoint | Method | Expected Response |
|----------|---------------------|--------|-------------------|
| Replit Deployments | `/api/health` | GET | `{"status":"healthy"}` |
| Heroku | `/api/health` | GET | `{"status":"healthy"}` |
| Railway | `/ping` | GET | `pong` |
| Vercel | `/api/status` | GET | `{"status":"ok"}` |
| Generic | `/api/health` | HEAD | Status 200 |

### Build Process

The application is configured for automatic deployment:

1. **Dependencies**: All packages are properly installed
2. **Database**: PostgreSQL schema is applied automatically
3. **Session Store**: Switches to PostgreSQL in production
4. **Health Checks**: Multiple endpoints available for platform verification
5. **Error Handling**: Graceful error handling prevents crashes during startup

### Verification Steps

After deployment, verify these endpoints work:

```bash
# Primary health check
curl https://your-app-domain.com/api/health

# Status with uptime
curl https://your-app-domain.com/api/status

# Simple connectivity
curl https://your-app-domain.com/ping
```

Expected responses should show `status: "healthy"` or `"pong"` respectively.

## Database Session Table

The PostgreSQL session store will automatically create a `sessions` table:

```sql
CREATE TABLE sessions (
  sid varchar PRIMARY KEY,
  sess json NOT NULL,
  expire timestamp(6) NOT NULL
);
```

This table is managed automatically and requires no manual intervention.

## Admin Access

**For production deployment access:**

- **Username:** `admin@gweru.gov.zw`  
- **Password:** `GweruAdmin2025!`

**Login Methods:**
1. **Staff Login Form**: Click "Staff Login" on landing page or visit `/login`
2. **Quick Access**: Visit `/api/temp-login` for instant admin access (development/testing)

**Authentication Fixes Applied:**
- Fixed login form API call method ordering for proper authentication
- Added query cache invalidation and immediate refetch for auth state updates
- Implemented explicit session save with error handling for deployment reliability
- Added logout endpoint for proper session cleanup
- Optimized cookie settings for deployment platform compatibility (disabled secure flag)
- Added sameSite cookie attribute for better browser compatibility

## Troubleshooting

If deployment fails:

1. **Health Check Failures**: Verify `/api/health` returns 200 status
2. **Database Issues**: Check `DATABASE_URL` environment variable
3. **Session Errors**: Ensure PostgreSQL connection is working
4. **Build Failures**: Check all dependencies are properly installed

All fixes ensure the Gweru Municipal ERP system deploys successfully on Replit and other cloud platforms.