import type { ScheduleEntry } from "../types";
import TAGS from "../../../json/tags.json";
import WEEKDAYS from "../../../json/weekdays.json";

const COURSE_COLORS: Record<string, string> = Object.fromEntries(
  TAGS.map((t) => [t.name, t.color])
);

const DAY_SHORT: Record<string, string> = Object.fromEntries(
  WEEKDAYS.days.map((d) => [d.full, d.short])
);

/** Pick the color of the most frequent course */
export function getDominantColor(schedule: ScheduleEntry[]): string {
  const freq: Record<string, number> = {};
  for (const entry of schedule) {
    freq[entry.course] = (freq[entry.course] || 0) + 1;
  }
  const topCourse = Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0];
  return topCourse ? (COURSE_COLORS[topCourse] ?? "#6366f1") : "#6366f1";
}

/** Auto-generate a title from the schedule courses */
export function generatePlanTitle(schedule: ScheduleEntry[]): string {
  const uniqueCourses = [...new Set(schedule.map((e) => e.course))];
  if (uniqueCourses.length === 0) return "Empty plan";
  if (uniqueCourses.length === 1)
    return `${uniqueCourses[0]} — weekly plan`;
  if (uniqueCourses.length === 2)
    return `${uniqueCourses[0]} and ${uniqueCourses[1]} — weekly plan`;
  const rest = uniqueCourses.length - 2;
  return `${uniqueCourses[0]}, ${uniqueCourses[1]} and ${rest} more — weekly plan`;
}

/** Auto-generate a description summarizing schedule contents */
export function generatePlanDescription(schedule: ScheduleEntry[]): string {
  const courseMap = new Map<string, string[]>();
  for (const entry of schedule) {
    const days = courseMap.get(entry.course) || [];
    const shortDay = DAY_SHORT[entry.day] || entry.day;
    if (!days.includes(shortDay)) days.push(shortDay);
    courseMap.set(entry.course, days);
  }

  const parts: string[] = [];
  for (const [course, days] of courseMap) {
    parts.push(`${course} (${days.join(", ")})`);
  }

  const totalHours = schedule.reduce((sum, e) => sum + e.duration, 0) / 60;
  const totalFormatted =
    totalHours % 1 === 0 ? totalHours.toString() : totalHours.toFixed(1);

  return `${parts.join(". ")}. Total ${totalFormatted} hrs/week.`;
}
