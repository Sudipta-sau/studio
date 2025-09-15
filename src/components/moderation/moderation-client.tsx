'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { moderateContentAction } from '@/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full mt-4">
            {pending ? <Loader className="animate-spin mr-2" /> : <ShieldAlert className="mr-2" />}
            {pending ? 'Analyzing...' : 'Check Content'}
        </Button>
    );
}

export function ModerationClient() {
    const initialState = { message: null, status: null, data: null };
    const [state, formAction] = useFormState(moderateContentAction, initialState);

    return (
        <Card>
            <CardHeader>
                <CardTitle>AI Content Moderation</CardTitle>
                <CardDescription>
                    Paste text into the box below to check for spam or inappropriate content using our AI moderation tool.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction}>
                    <Textarea
                        name="text"
                        placeholder="Enter content to moderate..."
                        rows={8}
                        required
                    />
                    <SubmitButton />
                </form>

                {state.message && (
                    <Alert variant={state.status === 'error' ? 'destructive' : 'default'} className={`mt-4 ${state.data?.isFlagged ? 'border-destructive' : 'border-green-500'}`}>
                        {state.status === 'success' ? (state.data?.isFlagged ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />) : <XCircle className="h-4 w-4" />}
                        <AlertTitle>{state.status === 'success' ? 'Analysis Complete' : 'Error'}</AlertTitle>
                        <AlertDescription>
                            {state.message}
                            {state.data && state.status === 'success' && (
                                <div className="mt-2 text-sm">
                                    <p><strong>Flagged:</strong> {state.data.isFlagged ? 'Yes' : 'No'}</p>
                                    {state.data.isFlagged && <p><strong>Reason:</strong> {state.data.reason}</p>}
                                </div>
                            )}
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}
