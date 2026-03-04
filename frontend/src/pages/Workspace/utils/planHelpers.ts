import type { ScheduleEntry } from "../types";

const COURSE_COLORS: Record<string, string> = {
  "Mathematics":        "#2868A9",
  "Algebra":            "#7B2FC9",
  "Geometry":           "#E0592A",
  "Calculus":           "#C93545",
  "Statistics":         "#4A9BD9",
  "Biology":            "#2E8B57",
  "Chemistry":          "#D4940A",
  "Physics":            "#1E7FE0",
  "Astronomy":          "#4F5EC0",
  "Earth Science":      "#5A9E3C",
  "History":            "#6B4E2A",
  "World History":      "#8C3D8B",
  "Geography":          "#0D7C50",
  "Literature":         "#D46ABF",
  "Writing":            "#A68B2C",
  "Grammar":            "#4652B1",
  "Reading":            "#48B07A",
  "English":            "#1B6E3A",
  "Computer Science":   "#238A72",
  "Programming":        "#3566C0",
  "Art":                "#C2185B",
  "Music":              "#D17B30",
  "Physical Education": "#9B1B4A",
  "Psychology":         "#7045C9",
  "Economics":          "#2CA5A5",
  "Philosophy":         "#8A7D55",
  "Social Studies":     "#1A5C3E",
};

const DAY_SHORT: Record<string, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

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
