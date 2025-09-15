'use client';

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { verifyGuideAction } from '@/lib/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, Loader2, ShieldCheck, Star, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function fileToDataUri(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function SubmitButton({text}: {text: string}) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? <Loader2 className="animate-spin mr-2" /> : <ShieldCheck className="mr-2" />}
            {pending ? 'Verifying...' : text}
        </Button>
    );
}

function UserVerificationForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);
        setTimeout(() => {
            setIsVerifying(false);
            setIsSubmitted(true);
            toast({
                title: "Verification Submitted",
                description: "Your documents are under review. We'll notify you shortly.",
            })
        }, 2000);
    };

    if (isSubmitted) {
         return (
             <Alert variant="default" className="border-accent text-accent">
                <CheckCircle className="h-4 w-4 text-accent" />
                <AlertTitle>Submission Successful</AlertTitle>
                <AlertDescription>
                    Your documents are being reviewed by our team.
                </AlertDescription>
            </Alert>
         )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-muted-foreground">Upload your Aadhaar card to get a 'Verified' badge and build trust in the community.</p>
            <div className="space-y-2">
                <Label htmlFor="aadhaar">Aadhaar Card Photo</Label>
                <Input id="aadhaar" type="file" accept="image/*" required className="file:text-foreground"/>
            </div>
            <Button type="submit" disabled={isVerifying} className="w-full">
                {isVerifying ? <Loader2 className="animate-spin mr-2" /> : <ShieldCheck className="mr-2" />}
                {isVerifying ? 'Submitting...' : 'Submit for Verification'}
            </Button>
        </form>
    );
}

function GuideVerificationForm() {
    const initialState = { message: null, status: null, data: null };
    const [state, formAction] = useActionState(verifyGuideAction, initialState);
    
    const [guideIdPhoto, setGuideIdPhoto] = useState<File | null>(null);
    const [aadhaarCardPhoto, setAadhaarCardPhoto] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const currentFormData = new FormData(e.currentTarget);

        if (!guideIdPhoto || !aadhaarCardPhoto) {
            // This is a fallback. Native validation should prevent this.
            return;
        }

        const guideIdPhotoDataUri = await fileToDataUri(guideIdPhoto);
        const aadhaarCardPhotoDataUri = await fileToDataUri(aadhaarCardPhoto);
        
        currentFormData.set('guideIdPhoto', guideIdPhotoDataUri);
        currentFormData.set('aadhaarCardPhoto', aadhaarCardPhotoDataUri);

        formAction(currentFormData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-muted-foreground">Verify your guide credentials to get a 'Guide' badge and connect with tourists.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="guideName">Your Full Name (as on Guide ID)</Label>
                    <Input id="guideName" name="guideName" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="guideIdPhotoFile">Guide ID Photo</Label>
                    <Input id="guideIdPhotoFile" type="file" accept="image/*" required onChange={(e) => setGuideIdPhoto(e.target.files?.[0] || null)} className="file:text-foreground" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="aadhaarName">Full Name (as on Aadhaar Card)</Label>
                    <Input id="aadhaarName" name="aadhaarName" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="aadhaarCardPhotoFile">Aadhaar Card Photo</Label>
                    <Input id="aadhaarCardPhotoFile" type="file" accept="image/*" required onChange={(e) => setAadhaarCardPhoto(e.target.files?.[0] || null)} className="file:text-foreground" />
                </div>
            </div>

            <SubmitButton text="Verify with AI" />

            {state.message && (
                <Alert variant={state.status === 'error' ? 'destructive' : 'default'} className={state.status === 'success' ? (state.data?.isVerified ? 'border-green-500' : 'border-destructive' ) : ''}>
                    {state.status === 'success' ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    <AlertTitle>{state.status === 'success' ? 'Verification Result' : 'Error'}</AlertTitle>
                    <AlertDescription>
                        {state.message}
                        {state.data && state.status === 'success' && (
                            <div className="mt-2 space-y-1 text-sm">
                                <p><strong>Verified:</strong> <span className={state.data.isVerified ? 'text-green-400' : 'text-red-400'}>{state.data.isVerified ? 'Yes' : 'No'}</span></p>
                                <p><strong>Confidence:</strong> {(state.data.matchConfidence * 100).toFixed(1)}%</p>
                                {state.data.reason && <p><strong>Reason:</strong> {state.data.reason}</p>}
                            </div>
                        )}
                    </AlertDescription>
                </Alert>
            )}
        </form>
    );
}

export function VerificationClient() {
    return (
        <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user">
                    <ShieldCheck className="mr-2 h-4 w-4" /> User Verification
                </TabsTrigger>
                <TabsTrigger value="guide">
                    <Star className="mr-2 h-4 w-4" /> Guide Verification
                </TabsTrigger>
            </TabsList>
            <TabsContent value="user">
                <Card>
                    <CardHeader>
                        <CardTitle>Become a Verified User</CardTitle>
                        <CardDescription>Gain a trust badge to enhance your profile's credibility.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <UserVerificationForm />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="guide">
                <Card>
                    <CardHeader>
                        <CardTitle>Become a Verified Guide</CardTitle>
                        <CardDescription>Let our AI verify your credentials and unlock guide features.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <GuideVerificationForm />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
