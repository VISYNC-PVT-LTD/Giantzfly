import s from "@/components/story/story.module.css";
import b from "@/components/story/brief.module.css";

export const metadata = {
  title: "Terms & Conditions | Giantzfly Exim LLP",
  description: "Terms governing the use of Giantzfly Exim LLP's website and trade services.",
};

export default function TermsPage() {
  return (
    <main className={`${s.page} ${b.wrap}`}>
      <section className={s.chapter}>
        <div className={b.shell}>
          <div className={b.head}>
            <span className={b.kicker}>Legal</span>
            <h1 className={b.heading}>Terms &amp; Conditions</h1>
          </div>

          <p className={b.lede}>
            By using this website and submitting an enquiry or quotation
            request, you agree that the information provided is accurate and
            that Giantzfly Exim LLP may contact you regarding your request.
          </p>
          <p className={b.lede}>
            Product availability, pricing, MOQ and lead times shared through
            this site are indicative and subject to confirmation in a formal
            quotation. All export orders are governed by the Incoterm, payment
            route and shipment terms agreed in writing before production
            begins.
          </p>
          <p className={b.lede}>
            For questions about these terms, contact us at{" "}
            <a href="mailto:giantzflyexim@gmail.com">
              giantzflyexim@gmail.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
