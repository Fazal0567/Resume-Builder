import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      <Sun
        className="h-[1.2rem] w-[1.2rem] transition-all"
        style={{ display: isDark ? "none" : "block" }}
      />
      <Moon
        className="h-[1.2rem] w-[1.2rem] transition-all"
        style={{ display: isDark ? "block" : "none" }}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
