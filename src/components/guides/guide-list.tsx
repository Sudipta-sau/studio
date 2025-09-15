import { Guide } from "@/lib/mock-data"
import { GuideCard } from "./guide-card"

export function GuideList({ guides }: { guides: Guide[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map(guide => (
                <GuideCard key={guide.id} guide={guide} />
            ))}
        </div>
    )
}
