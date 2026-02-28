# Supabase Setup Instructions

## 1. Create Supabase Project

Go to [supabase.com](https://supabase.com) and create a new project.

## 2. Get Credentials

After creating the project, go to **Settings > API** and copy:

- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 3. Update `.env.local`

Update the `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 4. Create Database Tables

Run the SQL from `supabase-setup.sql` in Supabase SQL Editor:

1. Go to **Database > SQL Editor** in Supabase Dashboard
2. Copy the contents of `supabase-setup.sql` file
3. Paste and click **Run**

This will create:

- `teams` table - For team member management
- `contact_submissions` table - For contact form submissions
- Row Level Security policies
- Required indexes

## 5. Create Admin User

Go to **Authentication > Users** in Supabase dashboard:

1. Click **Add User** > **Create New User**
2. Enter credentials:
   - **Email**: `admin@rbrajhholding.ch`
   - **Password**: `RBHolding2024!`
3. Click **Create User**
4. **Important**: Click the three dots (⋮) next to the user and select **Confirm Email**
   - OR go to **Authentication > Settings** and disable "Confirm email"

## 6. Test the Setup

1. Run `npm run dev`
2. Visit `http://localhost:3000/admin`
3. Login with admin credentials
4. You should see the admin dashboard with:
   - **Contact Submissions** tab - View and manage contact form messages
   - **Team Management** tab - Add/edit/delete team members

## Features

### Contact Form Submissions

- Public visitors can submit contact forms
- Submissions are stored in Supabase
- Admin can view all submissions with pagination
- Status tracking: New → Read → Replied → Archived
- Quick reply via email link

### Team Management

- Add team members with name, role, and photo URL
- Control display order
- Edit and delete team members
- Displayed on the main website under "Our Team" section

## Admin Credentials

Default credentials for this setup:

- **Email**: `admin@rbrajhholding.ch`
- **Password**: `RBHolding2024!`

⚠️ **Important**: Change these credentials after first login for production!

## Security Notes

- Row Level Security (RLS) is enabled on all tables
- Only authenticated users can manage data
- Public users can only:
  - Read team members (displayed on website)
  - Submit contact forms
- Session tokens are stored in HTTP-only cookies
- All admin operations require valid session
