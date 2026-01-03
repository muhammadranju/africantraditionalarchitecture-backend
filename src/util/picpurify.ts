import fetch from 'node-fetch';
import fs from 'fs';
import FormData from 'form-data';

const PICPURIFY_API = process.env.PICPURIFY_API || 'YOUR_API_KEY_HERE';

export const moderateImage = async (imagePath: string) => {
  try {
    const form = new FormData();
    const stats = fs.statSync(imagePath);
    const file = fs.createReadStream(imagePath);

    form.append('file_image', file, { knownLength: stats.size });
    form.append('API_KEY', PICPURIFY_API);
    form.append('task', 'porn_moderation,drug_moderation,gore_moderation');
    form.append('origin_id', 'moderation_check');
    form.append('reference_id', 'moderation_check');

    const response = await fetch('https://www.picpurify.com/analyse/1.1', {
      method: 'POST',
      body: form,
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error('PicPurify Error:', error.message);
    throw new Error('Image moderation failed');
  }
};
