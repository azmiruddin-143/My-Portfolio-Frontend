// app/revalidate-actions.ts
'use server'; 

import { revalidatePath } from 'next/cache';

export async function revalidateProjectPage(projectId: string) {

    revalidatePath(`/projects/${projectId}`, 'page');
    revalidatePath('/projects', 'page'); 
}