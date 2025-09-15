'use server';

import { verifyGuide, VerifyGuideInput, VerifyGuideOutput } from "@/ai/flows/ai-guide-verification";
import { moderateContent, ModerateContentInput, ModerateContentOutput } from "@/ai/flows/ai-moderation-tool";

type VerifyState = {
    message: string | null;
    status: 'success' | 'error' | null;
    data: VerifyGuideOutput | null;
}

export async function verifyGuideAction(prevState: VerifyState, formData: FormData): Promise<VerifyState> {
    try {
        const input: VerifyGuideInput = {
            guideIdPhotoDataUri: formData.get('guideIdPhoto') as string,
            guideName: formData.get('guideName') as string,
            aadhaarCardPhotoDataUri: formData.get('aadhaarCardPhoto') as string,
            aadhaarCardName: formData.get('aadhaarName') as string,
        };

        if (!input.guideIdPhotoDataUri || !input.guideName || !input.aadhaarCardPhotoDataUri || !input.aadhaarCardName) {
            return { message: "All fields are required.", status: "error", data: null };
        }

        const result = await verifyGuide(input);
        return { message: "Verification check complete.", status: "success", data: result };

    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        return { message: `Verification failed: ${errorMessage}`, status: "error", data: null };
    }
}

type ModerateState = {
    message: string | null;
    status: 'success' | 'error' | null;
    data: ModerateContentOutput | null;
}

export async function moderateContentAction(prevState: ModerateState, formData: FormData): Promise<ModerateState> {
     try {
        const input: ModerateContentInput = {
            text: formData.get('text') as string,
        };

        if (!input.text) {
            return { message: "Text content is required.", status: "error", data: null };
        }

        const result = await moderateContent(input);
        return { message: "Moderation check complete.", status: "success", data: result };

    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        return { message: `Moderation failed: ${errorMessage}`, status: "error", data: null };
    }
}
