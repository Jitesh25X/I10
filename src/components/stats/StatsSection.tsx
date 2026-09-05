import { stats } from '../../data/stats';
import { StatCard } from './StatCard';

export const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto py-12">
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
};
