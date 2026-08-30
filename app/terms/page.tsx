import LegalDoc from "@/components/ui/LegalDoc";
import { termsPage } from "@/lib/content";

export default function TermsPage() {
  return (
    <LegalDoc
      hero={termsPage.hero}
      updated={termsPage.updated}
      sections={termsPage.sections}
    />
  );
}
