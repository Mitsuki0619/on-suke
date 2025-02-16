import { fetchAllCategories } from "@/features/settings/actions/fetchAllCategories";
import { CategoryMasterSettingsForm } from "@/features/settings/components/CategoryMasterSettingsForm/CategoryMasterSettingsForm";
import { Grid2X2 } from "lucide-react";

export async function CategoryMasterSettingsPage() {
  const categories = await fetchAllCategories();

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Grid2X2 className="h-6 w-6 text-orange-500" />
        <h1 className="text-2xl font-bold text-orange-950">カテゴリ設定</h1>
      </div>
      <div>
        <CategoryMasterSettingsForm categories={categories} />
      </div>
    </div>
  );
}
