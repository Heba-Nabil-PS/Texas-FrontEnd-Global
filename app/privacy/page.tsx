import LegalDoc from "@/components/ui/LegalDoc";
import { privacyPage } from "@/lib/content";

export default function PrivacyPage() {
  return (
    <LegalDoc
      hero={privacyPage.hero}
      updated={privacyPage.updated}
      sections={privacyPage.sections}
    />
  );
}
