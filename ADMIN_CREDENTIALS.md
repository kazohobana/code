# Admin Login Credentials for Gweru Municipal ERP

## Deployed Site Access

For the deployed Gweru Municipal ERP system, use these credentials:

### Admin Login
- **Username (Email):** `admin@gweru.gov.zw`
- **Password:** `GweruAdmin2025!`
- **Login URL:** `/login`

### Access Instructions

1. Go to your deployed site URL
2. Click on "Staff Login" button on the landing page
3. Or navigate directly to `/login`
4. Enter the credentials above
5. You will have full administrative access to all municipal systems

### Alternative Access Methods

For development/testing:
- **Temp Login URL:** `/api/temp-login` (automatically logs in as admin)

### Account Details

- **Role:** System Administrator
- **Department:** Town Clerk
- **Permissions:** Full access to all modules
- **Status:** Active

### Available Modules

With admin access, you can manage:
- Advanced Financial Management (IPSAS compliant)
- Payroll Management System
- Housing & Property Management
- Customer Relationship Management
- Facility Bookings
- Cemetery Management
- Fleet & Transport
- Town Planning
- Water & Utilities
- System Administration

### Security Notes

- Change the default password after first login in production
- The admin account is created automatically during deployment
- Session management uses PostgreSQL for production scalability
- All sensitive operations are logged for audit purposes

### API Endpoints

For system integration:
- Health Check: `/api/health`
- Status: `/api/status`
- Login: `POST /api/login`
- User Info: `GET /api/auth/user`
- Logout: `GET /api/logout`