import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Helper function to upload an image file to Supabase Storage.
 * Creates bucket 'crazy-cars-images' if it doesn't exist.
 */
export async function uploadImageToSupabase(file: File): Promise<string | null> {
  if (!supabase) {
    console.warn('Supabase credentials not configured in .env.local');
    return null;
  }

  try {
    const bucketName = 'crazy-cars-images';
    const fileExt = file.name.split('.').pop();
    const fileName = `car-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.error('Supabase upload error:', error.message);
      return null;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error('Failed to upload image to Supabase:', err);
    return null;
  }
}
