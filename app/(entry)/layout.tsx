// Keep shared stylesheet order identical in both root layouts.
import "../globals.css";
import "../mobile.css";
import "../typography.css";
export default function EntryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
