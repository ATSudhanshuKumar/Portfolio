import { experience } from '../data/profile';

const roles = experience.flatMap((job) => job.roles);

// Total time since the earliest role started, counted like LinkedIn
// (inclusive months: Feb → Oct = 9). Shows months until a full year,
// then whole years, so the number never overstates experience.
export const experienceStat = () => {
    if (roles.length === 0) return { value: '0', label: 'Months of experience' };
    const [y, m] = roles
        .map((r) => r.start)
        .sort()[0]
        .split('-')
        .map(Number);
    const now = new Date();
    const months = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m) + 1;
    if (months < 12) return { value: String(months), label: months === 1 ? 'Month of experience' : 'Months of experience' };
    const years = Math.floor(months / 12);
    return { value: `${years}+`, label: years === 1 ? 'Year of experience' : 'Years of experience' };
};

export const rolesStat = () => ({ value: String(roles.length), label: roles.length === 1 ? 'Role held' : 'Roles held' });
