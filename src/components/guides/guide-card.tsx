import { Guide } from '@/lib/mock-data';
import { Card, CardContent, CardHeader } from '../ui/card';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export function GuideCard({ guide }: { guide: Guide }) {
    return (
        <Card className="overflow-hidden shadow-lg shadow-black/20 bg-card">
            <CardHeader className="flex flex-col items-center gap-4 p-6">
                <div className="relative h-24 w-24">
                    <Image
                        src={guide.avatarUrl}
                        alt={guide.name}
                        fill
                        className="rounded-full object-cover border-2 border-accent"
                    />
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-headline font-bold">{guide.name}</h3>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground mt-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-bold text-foreground">{guide.rating.toFixed(1)}</span>
                        <span>({guide.reviewCount} reviews)</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6 pt-0 text-center">
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {guide.specialties.map(spec => (
                        <Badge key={spec} variant="secondary">{spec}</Badge>
                    ))}
                </div>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{guide.bio}</p>
                <Button className="w-full">View Profile & Reviews</Button>
            </CardContent>
        </Card>
    )
}
