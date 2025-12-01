import type { Task, Habit, PomodoroSession } from "@shared/schema";

export interface ExportData {
  version: string;
  exportedAt: string;
  tasks: Task[];
  habits: Habit[];
  pomodoroSessions: PomodoroSession[];
}

export function exportData(tasks: Task[], habits: Habit[], pomodoroSessions: PomodoroSession[]): string {
  const data: ExportData = {
    version: "1.0.0",
    exportedAt: new Date().toISOString(),
    tasks,
    habits,
    pomodoroSessions,
  };
  return JSON.stringify(data, null, 2);
}

export function downloadExport(data: string, filename: string = "focusflow-backup.json") {
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function parseExportData(json: string): ExportData {
  try {
    const data = JSON.parse(json) as ExportData;
    if (!data.version || !data.exportedAt) {
      throw new Error("Invalid export format");
    }
    return data;
  } catch (error) {
    throw new Error("Failed to parse export file");
  }
}
