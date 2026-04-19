type StatusBadgeProps = {
  status: string;
  variant?: 'appointment' | 'agent';
};

const appointmentClasses: Record<string, string> = {
  scheduled: 'bg-blue-100 text-blue-800 border border-blue-200',
  completed: 'bg-green-100 text-green-800 border border-green-200',
  cancelled: 'bg-red-100 text-red-800 border border-red-200',
};

const agentClasses: Record<string, string> = {
  active: 'bg-green-100 text-green-800 border border-green-200',
  recovering: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  resting: 'bg-gray-100 text-gray-800 border border-gray-200',
};

export default function StatusBadge({ status, variant = 'appointment' }: StatusBadgeProps) {
  const normalized = status.toLowerCase();
  const map = variant === 'agent' ? agentClasses : appointmentClasses;
  const className =
    map[normalized] ?? 'bg-gray-100 text-gray-800 border border-gray-200';

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${className}`}
    >
      {status}
    </span>
  );
}
