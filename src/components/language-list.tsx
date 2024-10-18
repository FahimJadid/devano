import { Badge } from "./ui/badge";

export const splitLang = (languages: string) => {
    return languages.split(",").map((lang) => lang.trim());
}

export const LanguageList = ({ languages }: { languages: string[] }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {languages.map((lang) => (
        <Badge className="w-fit" key={lang}>
          {lang}
        </Badge>
      ))}
    </div>
  );
};
