import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function LineFriendButton() {
  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      asChild
    >
      <a
        href="https://line.me/R/ti/p/@380qwtes" // LINEの友達追加リンクを設定してください
        target="_blank"
        rel="noopener noreferrer"
      >
        LINEで友達追加
        <ExternalLink className="w-4 h-4 ml-1" />
      </a>
    </Button>
  );
}
