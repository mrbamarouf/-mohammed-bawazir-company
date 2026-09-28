"use client";
import { useState } from "react";
import { company } from "@/lib/company";
import type { Locale } from "@/lib/types";
import { Arrow } from "./ui";
export function Enquiry({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const [ready, setReady] = useState(false);
  const [mail, setMail] = useState("");
  return (
    <form
      className="enquiry"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const subject = `MBT enquiry: ${data.get("topic")}`;
        const body = `Name: ${data.get("name")}\nCompany: ${data.get("company")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`;
        const url = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setMail(url);
        setReady(true);
        window.location.href = url;
      }}
    >
      <h2>{ar ? "لنبدأ الحوار." : "Start a conversation."}</h2>
      <div className="form-grid">
        <label>
          {ar ? "الاسم الكامل" : "Full name"}
          <input name="name" autoComplete="name" required maxLength={100} />
        </label>
        <label>
          {ar ? "اسم الشركة" : "Company"}
          <input name="company" autoComplete="organization" maxLength={160} />
        </label>
        <label>
          {ar ? "البريد الإلكتروني" : "Email address"}
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={150}
          />
        </label>
        <label>
          {ar ? "موضوع الاستفسار" : "I’m interested in"}
          <select name="topic">
            <option value="Partnership">
              {ar ? "الشراكات التجارية" : "Brand partnership"}
            </option>
            <option value="Distribution">
              {ar ? "خدمات التوزيع" : "Distribution"}
            </option>
            <option value="General">
              {ar ? "استفسار عام" : "General enquiry"}
            </option>
            <option value="Careers">{ar ? "الوظائف" : "Careers"}</option>
          </select>
        </label>
        <label className="full-field">
          {ar ? "كيف يمكننا مساعدتك؟" : "How can we help?"}
          <textarea
            name="message"
            rows={4}
            required
            minLength={10}
            maxLength={4000}
          />
        </label>
      </div>
      <p className="form-note">
        {ar
          ? "يفتح هذا النموذج تطبيق البريد لديك مع رسالة جاهزة إلى MBT. لا تُرسل الرسالة تلقائيًا ولا تُخزّن بياناتك على هذا الموقع."
          : "This form opens your email application with a message addressed to MBT. It does not send automatically or store your details on this website."}
      </p>
      <button className="button dark" type="submit">
        {ar ? "إعداد رسالة البريد" : "Prepare email enquiry"}
        <Arrow />
      </button>
      {ready && (
        <div className="form-status" role="status">
          <p>
            {ar
              ? "رسالتك جاهزة. أكمل إرسالها من تطبيق البريد الإلكتروني."
              : "Your enquiry is ready. Complete sending it in your email application."}
          </p>
          <a href={mail}>
            {ar ? "افتح رسالة البريد مجددًا" : "Open the email draft again"}
          </a>
        </div>
      )}
    </form>
  );
}
