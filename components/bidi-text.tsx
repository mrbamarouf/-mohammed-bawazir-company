import { Fragment } from "react";
const arabicScript = /\p{Script=Arabic}/u;

/** Isolate Latin names, years, quantities and units inside Arabic prose. */
export function BidiText({ text }: { text: string }) {
  if (!arabicScript.test(text)) return <bdi dir="auto" lang={/[A-Za-z]/.test(text) ? "en" : undefined}>{text}</bdi>;
  const pattern =
    /م[²³]|\([A-Za-z0-9][A-Za-z0-9\s.,:/+%×&'’_–—-]*\)|\+?[A-Za-z0-9]+(?:[ .,/:%×+&’'_–—-]+[A-Za-z0-9]+)*%?/g;
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    parts.push(text.slice(cursor, match.index));
    parts.push(
      <bdi key={match.index} dir="ltr" lang={arabicScript.test(match[0]) ? "ar" : "en"}>
        {match[0]}
      </bdi>,
    );
    cursor = match.index! + match[0].length;
  }
  parts.push(text.slice(cursor));
  return (
    <bdi lang="ar" dir="rtl">
      {parts.map((part, index) => (
        <Fragment key={index}>{part}</Fragment>
      ))}
    </bdi>
  );
}
