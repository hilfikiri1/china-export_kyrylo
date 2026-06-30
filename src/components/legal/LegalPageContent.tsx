const legalPlaceholders: Record<string, string> = {
  pl: "Treść tej strony wymaga profesjonalnej weryfikacji prawnej i zostanie uzupełniona po potwierdzeniu danych podmiotu prawnego.",
  uk: "Зміст цієї сторінки потребує професійної правової перевірки та буде доповнений після підтвердження даних юридичної особи.",
  ru: "Содержание этой страницы требует профессиональной правовой проверки и будет дополнено после подтверждения данных юридического лица.",
  de: "Der Inhalt dieser Seite bedarf einer professionellen rechtlichen Prüfung und wird nach Bestätigung der Unternehmensdaten ergänzt.",
  zh: "本页面内容须经专业法律审核，并在确认法律主体信息后补充完整。",
};

type LegalPageContentProps = {
  title: string;
  locale: string;
};

export function LegalPageContent({ title, locale }: LegalPageContentProps) {
  const text = legalPlaceholders[locale] ?? legalPlaceholders.pl;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <div className="mt-8 text-white/70">
        <p>{text}</p>
      </div>
    </article>
  );
}
