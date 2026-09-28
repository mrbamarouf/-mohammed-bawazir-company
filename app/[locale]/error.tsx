"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="wrap error-page">
      <h1>
        A connection interrupted.
        <br />
        تعذر تحميل الصفحة.
      </h1>
      <p>Please try again. يرجى المحاولة مجددًا.</p>
      <button className="button dark" onClick={reset}>
        Try again / أعد المحاولة
      </button>
    </section>
  );
}
