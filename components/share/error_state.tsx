import {AlertCircle} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function Error_state({
                                       message,
                                       onRetry,
                                   }: {
    message: string;
    onRetry?: () => void;
}) {
    return (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-5">
            <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 size-5 shrink-0 text-destructive"/>
                <div>
                    <p className="font-semibold text-foreground">دریافت اطلاعات با خطا مواجه شد</p>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">{message}</p>
                    {onRetry && (
                        <Button type="button" variant="outline" size="sm" className="mt-3" onClick={onRetry}>
                            تلاش دوباره
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
