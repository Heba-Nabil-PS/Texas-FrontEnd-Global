import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface LocaleSwitcherProps {
  className?: string;
  locale: string;
  locales: { isoCode: string; languageName: string }[];
  cb?: () => void;
}

export function LocaleSwitcher(props: LocaleSwitcherProps) {
  const { className, locale, locales, cb } = props;

  const pathname = usePathname();
  const router = useRouter();

  const otherLanguage = locales?.find((item) => item.isoCode !== locale);

  const handleLocaleSwitch = () => {
    router.replace(pathname, {
      locale: otherLanguage?.isoCode,
    });
    cb?.();
  };

  return (
    <button
      className={cn(
        "flex items-center gap-2 font-texas text-lg font-extrabold uppercase text-primary transition-colors hover:text-third",

        className,
      )}
      onClick={handleLocaleSwitch}
    >
      {otherLanguage?.languageName}
    </button>
  );
}
