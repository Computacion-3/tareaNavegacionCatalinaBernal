import { RoutineItemViewModel } from '../viewmodels/routine.viewmodel';

const BADGE_STYLES: Record<string, string> = {
  fuerza: 'border-violet-600 text-violet-600',
  hipertrofia: 'border-pink-500 text-pink-500',
  resistencia: 'border-teal-500 text-teal-500',
};

const DEFAULT_BADGE_STYLE = 'border-primary text-primary';

interface RoutineCardProps {
  routine: RoutineItemViewModel;
}

export function RoutineCard({ routine }: RoutineCardProps) {
  const badgeClass =
    BADGE_STYLES[routine.badgeText?.trim().toLowerCase() ?? ''] ?? DEFAULT_BADGE_STYLE;

  return (
    <article className="bg-base-100 rounded-xl shadow-sm p-5 flex flex-col gap-3">
      <h3 className="text-lg font-semibold">{routine.title}</h3>
      <p className="text-base-content/70">{routine.descriptionText}</p>
      {routine.badgeText && (
        <span className={`self-start border rounded-md px-3 py-0.5 text-sm ${badgeClass}`}>
          {routine.badgeText}
        </span>
      )}
    </article>
  );
}
