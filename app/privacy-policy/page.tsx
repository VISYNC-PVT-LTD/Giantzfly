import s from "@/components/story/story.module.css";
import b from "@/components/story/brief.module.css";

export const metadata = {
  title: "Privacy Policy | Giantzfly Exim LLP",
  description: "How Giantzfly Exim LLP collects, uses and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className={`${s.page} ${b.wrap}`}>
      <section className={s.chapter}>
        <div className={b.shell}>
          <div className={b.head}>
            <span className={b.kicker}>Legal</span>
            <h1 className={b.heading}>Privacy Policy</h1>
          </div>

          <p className={b.lede}>
            Giantzfly Exim LLP collects the information you submit through our
            enquiry, quotation and trade-update forms — including your name,
            company, contact details, and product requirements — solely to
            respond to your business enquiry and provide the services you
            request.
          </p>
          <p className={b.lede}>
            We do not sell or share your information with third parties
            outside of what is required to fulfil an export order (such as
            logistics, customs and compliance partners). You may request
            deletion of your information at any time by contacting us at{" "}
            <a href="mailto:giantzflyexim@gmail.com">
              giantzflyexim@gmail.com
            </a>
            .
          </p>
          <p className={b.lede}>
            This policy may be updated periodically. Continued use of our site
            after changes constitutes acceptance of the revised policy.
          </p>
        </div>
      </section>
    </main>
  );
}
