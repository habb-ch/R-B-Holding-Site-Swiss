import { NextRequest, NextResponse } from 'next/server';
import { getSupabase, getAuthenticatedSupabase, getServiceSupabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

// Helper to verify admin session and return token
async function getSessionToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('admin-session')?.value;
    
    if (!sessionToken) {
        return null;
    }

    try {
        const supabase = getSupabase();
        const { data, error } = await supabase.auth.getUser(sessionToken);
        if (!error && data.user) {
            return sessionToken;
        }
        return null;
    } catch {
        return null;
    }
}

// GET - Fetch contact submissions with pagination (admin only)
export async function GET(request: NextRequest) {
    try {
        const sessionToken = await getSessionToken();
        if (!sessionToken) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const offset = (page - 1) * limit;

        const supabase = getAuthenticatedSupabase(sessionToken);

        // Get total count
        const { count, error: countError } = await supabase
            .from('contact_submissions')
            .select('*', { count: 'exact', head: true });

        if (countError) {
            console.error('Error counting submissions:', countError);
            return NextResponse.json(
                { error: 'Failed to count submissions' },
                { status: 500 }
            );
        }

        // Get paginated data
        const { data, error } = await supabase
            .from('contact_submissions')
            .select('*')
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) {
            console.error('Error fetching submissions:', error);
            return NextResponse.json(
                { error: 'Failed to fetch submissions' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            data: data || [],
            pagination: {
                page,
                limit,
                total: count || 0,
                totalPages: Math.ceil((count || 0) / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching submissions:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST - Create new contact submission (public)
export async function POST(request: NextRequest) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Use service role key to bypass RLS for public submissions
        const supabase = getServiceSupabase();
        const { data, error } = await supabase
            .from('contact_submissions')
            .insert([
                {
                    name,
                    email,
                    message,
                    status: 'new',
                },
            ])
            .select()
            .single();

        if (error) {
            console.error('Error creating submission:', error);
            return NextResponse.json(
                { error: 'Failed to submit contact form' },
                { status: 500 }
            );
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('Error creating submission:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT - Update submission status (admin only)
export async function PUT(request: NextRequest) {
    try {
        const sessionToken = await getSessionToken();
        if (!sessionToken) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id, status } = await request.json();

        if (!id || !status) {
            return NextResponse.json(
                { error: 'ID and status are required' },
                { status: 400 }
            );
        }

        const validStatuses = ['new', 'read', 'replied', 'archived'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { error: 'Invalid status' },
                { status: 400 }
            );
        }

        const supabase = getAuthenticatedSupabase(sessionToken);
        const { data, error } = await supabase
            .from('contact_submissions')
            .update({ status, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating submission:', error);
            return NextResponse.json(
                { error: 'Failed to update submission' },
                { status: 500 }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error updating submission:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE - Delete submission (admin only)
export async function DELETE(request: NextRequest) {
    try {
        const sessionToken = await getSessionToken();
        if (!sessionToken) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Submission ID is required' },
                { status: 400 }
            );
        }

        const supabase = getAuthenticatedSupabase(sessionToken);
        const { error } = await supabase
            .from('contact_submissions')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting submission:', error);
            return NextResponse.json(
                { error: 'Failed to delete submission' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting submission:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
