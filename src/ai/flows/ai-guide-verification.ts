'use server';

/**
 * @fileOverview An AI-powered guide verification flow.
 *
 * - verifyGuide - A function that verifies a guide's identity by comparing their ID photo and name with their Aadhaar card.
 * - VerifyGuideInput - The input type for the verifyGuide function.
 * - VerifyGuideOutput - The return type for the verifyGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyGuideInputSchema = z.object({
  guideIdPhotoDataUri: z
    .string()
    .describe(
      "A photo of the guide's ID, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  guideName: z.string().describe("The guide's name."),
  aadhaarCardPhotoDataUri: z
    .string()
    .describe(
      'A photo of the Aadhaar card, as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
  aadhaarCardName: z.string().describe("The name on the Aadhaar card."),
});
export type VerifyGuideInput = z.infer<typeof VerifyGuideInputSchema>;

const VerifyGuideOutputSchema = z.object({
  isVerified: z
    .boolean()
    .describe('Whether the guide is verified or not.'),
  matchConfidence: z
    .number()
    .describe(
      'A confidence score (0-1) indicating how well the guide ID photo and name match the Aadhaar card photo and name.'
    ),
  reason: z
    .string()
    .optional()
    .describe('The reason for verification failure, if any.'),
});
export type VerifyGuideOutput = z.infer<typeof VerifyGuideOutputSchema>;

export async function verifyGuide(input: VerifyGuideInput): Promise<VerifyGuideOutput> {
  return verifyGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'verifyGuidePrompt',
  input: {schema: VerifyGuideInputSchema},
  output: {schema: VerifyGuideOutputSchema},
  prompt: `You are an AI agent specializing in verifying the identity of tourist guides.

You are given a photo of the guide's ID and their name, as well as a photo of their Aadhaar card and the name on the card.

Your task is to determine if the guide's ID matches the Aadhaar card, considering both the photo and the name.

Respond with a JSON object containing the following fields:
- isVerified: true if the guide is verified, false otherwise.
- matchConfidence: A confidence score between 0 and 1 indicating how well the images and names match. 1 means a perfect match, 0 means no match.
- reason: If isVerified is false, provide a brief reason for the failure.

Guide Name: {{{guideName}}}
Guide ID Photo: {{media url=guideIdPhotoDataUri}}

Aadhaar Card Name: {{{aadhaarCardName}}}
Aadhaar Card Photo: {{media url=aadhaarCardPhotoDataUri}}`,
});

const verifyGuideFlow = ai.defineFlow(
  {
    name: 'verifyGuideFlow',
    inputSchema: VerifyGuideInputSchema,
    outputSchema: VerifyGuideOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
