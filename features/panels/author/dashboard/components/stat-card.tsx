import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  note: string;
  icon: LucideIcon;
  iconClass: string;
}

export default function StatCard({ title, value, note, icon: Icon, iconClass }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-900">
            {new Intl.NumberFormat("fa-IR").format(value)}
          </p>
          <p className="mt-2 text-xs text-slate-400">{note}</p>
        </div>
        <span className={`flex size-11 items-center justify-center rounded-xl ${iconClass}`}>
          <Icon className="size-5" />
        </span>
      </div>
    </div>
  );
}
