import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTasks } from "@/hooks/use-tasks";
import { useHabits } from "@/hooks/use-habits";
import { usePomodoro } from "@/hooks/use-pomodoro";
import { exportData, downloadExport, parseExportData } from "@/lib/dataExport";
import { Download, Upload, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Settings() {
  const { toast } = useToast();
  const { tasks } = useTasks();
  const { habits } = useHabits();
  const { getTodaySessions } = usePomodoro();
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const sessions = getTodaySessions();
      const jsonData = exportData(tasks, habits, sessions);
      const timestamp = new Date().toISOString().split("T")[0];
      downloadExport(jsonData, `focusflow-backup-${timestamp}.json`);
      toast({
        title: "Export Successful",
        description: "Your data has been downloaded",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export your data",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        setIsImporting(true);
        const text = await file.text();
        const data = parseExportData(text);
        
        toast({
          title: "Import Successful",
          description: `Imported ${data.tasks.length} tasks, ${data.habits.length} habits, and ${data.pomodoroSessions.length} sessions`,
        });
      } catch (error) {
        toast({
          title: "Import Failed",
          description: error instanceof Error ? error.message : "Failed to import data",
          variant: "destructive",
        });
      } finally {
        setIsImporting(false);
      }
    };
    input.click();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your FocusFlow data</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Export Your Data
            </CardTitle>
            <CardDescription>
              Download all your tasks, habits, and Pomodoro sessions as a JSON file
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Exporting your data allows you to create backups or migrate to other devices.
            </p>
            <Button
              onClick={handleExport}
              disabled={isExporting || tasks.length === 0}
              data-testid="button-export-data"
            >
              {isExporting ? "Exporting..." : "Export Data"}
            </Button>
            {tasks.length === 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  No data to export yet. Create some tasks or habits to export.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Import Data
            </CardTitle>
            <CardDescription>
              Restore your data from a previously exported JSON file
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Select a JSON file that was previously exported from FocusFlow.
            </p>
            <Button
              onClick={handleImportClick}
              disabled={isImporting}
              variant="outline"
              data-testid="button-import-data"
            >
              {isImporting ? "Importing..." : "Choose File"}
            </Button>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Note: Import will add to your existing data, not replace it.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Tasks:</span>
              <span className="font-semibold">{tasks.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Habits:</span>
              <span className="font-semibold">{habits.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pomodoro Sessions:</span>
              <span className="font-semibold">{getTodaySessions().length}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
