import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiArrowLeft } from 'react-icons/hi';

export default function PolicyPage({ type }) {
  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const brandName = "AARA Media Mission";
  const domainName = "aaramediamission.com";
  const contactEmail = "info@aaramediamission.com";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-cream min-h-screen text-charcoal flex flex-col font-sans relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-gold-light/5 blur-[120px] pointer-events-none" />

      {/* Header Bar */}
      <header className="border-b border-charcoal/5 bg-white/70 backdrop-blur-md sticky top-0 z-30 py-5 select-none">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <a href="#/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 flex items-center justify-center border border-gold rounded-full transition-transform duration-500 group-hover:rotate-180">
              <span className="font-serif text-sm font-semibold text-charcoal tracking-tighter">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base font-bold tracking-widest text-charcoal leading-none">AARA</span>
              <span className="text-[7px] tracking-[0.25em] text-gold uppercase font-medium mt-0.5">MEDIA MISSION</span>
            </div>
          </a>

          <a
            href="#/"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-charcoal-light/80 hover:text-gold transition-colors duration-300 group border border-charcoal/15 px-3.5 py-1.5 rounded bg-white shadow-sm"
          >
            <HiArrowLeft className="transform group-hover:-translate-x-0.5 transition-transform" />
            Back to Home
          </a>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-16 md:py-24 relative z-10 w-full">
        {type === 'privacy' && (
          <article className="prose prose-neutral max-w-none">
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal font-bold tracking-tight mb-4 border-b border-charcoal/10 pb-4">
              Privacy Policy
            </h1>
            <p className="text-xs text-charcoal-light/60 font-mono tracking-widest uppercase mb-10">
              Effective Date: July 9, 2026 // Last Updated: July 9, 2026
            </p>

            <div className="flex flex-col gap-8 text-sm md:text-base text-charcoal-light/95 leading-relaxed font-sans">
              <p>
                At <strong>{brandName}</strong> (“we,” “our,” “us”), your privacy is very important to us. This Privacy Policy explains how we collect, store, use, or share (process), and safeguard your information when you visit our website <a href={`https://${domainName}`} className="text-gold underline hover:text-gold-dark">{domainName}</a> (“Website”).
              </p>

              <hr className="border-charcoal/10" />

              <div>
                <h2 className="font-serif text-xl md:text-2xl text-charcoal font-bold tracking-tight mb-3">
                  Information We Collect
                </h2>
                <ul className="list-disc pl-5 flex flex-col gap-2">
                  <li>
                    <strong>Personal Information:</strong> Name, email address, phone number, and billing/shipping address (only if you explicitly provide it).
                  </li>
                  <li>
                    <strong>Automatically Collected Information:</strong> IP address, browser type, device information, cookies, and analytics data.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-xl md:text-2xl text-charcoal font-bold tracking-tight mb-3">
                  How We Use Your Information
                </h2>
                <ul className="list-disc pl-5 flex flex-col gap-2">
                  <li>To provide, personalize, and improve our cinema production services.</li>
                  <li>To improve website functionality and user experience.</li>
                  <li>To personalize your experience on our pre-production workspaces.</li>
                  <li>To send updates, promotions, or newsletters (if you subscribe).</li>
                  <li>For legal compliance and security purposes.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-xl md:text-2xl text-charcoal font-bold tracking-tight mb-3">
                  Log Data
                </h2>
                <p>
                  We want to inform you that whenever you visit our services, we collect information that your browser sends to us, which is Log Data. This Log Data may include information such as your computer’s Internet Protocol (“IP”) address, browser version, pages of our services that you visit, the time and date of your visit, the time spent on those pages, and other relevant statistics.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl md:text-2xl text-charcoal font-bold tracking-tight mb-3">
                  Data Protection
                </h2>
                <p>
                  We use industry-standard security measures (SSL encryption, secure databases) to protect your data. However, please be aware that no method of transmission over the Internet, or method of electronic storage, is 100% secure.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl md:text-2xl text-charcoal font-bold tracking-tight mb-3">
                  Storage and Transfer of Information
                </h2>
                <div className="flex flex-col gap-3">
                  <p>
                    Information collected by us may be stored and processed in India or any other country in which we or our nominees maintain facilities. By using our Website, you expressly consent to any such transfer and storage of information. However, we will endeavor to take reasonable measures to maintain an adequate level of data protection.
                  </p>
                  <p>
                    We make no representation or warranty with respect to any duty to permanently store any information you may provide or that we otherwise collect about you.
                  </p>
                  <p>
                    In the event that we undergo re-organization, are sold to, or merged with a third party, or sell all or substantially all of our assets, any information we hold about you may be transferred to that re-organized entity or third party in compliance with applicable law.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-xl md:text-2xl text-charcoal font-bold tracking-tight mb-3">
                  Sharing of Information
                </h2>
                <p>
                  We do not sell, rent, or trade your personal information. We may share data with trusted service providers (e.g., payment processors, analytics tools) only as needed to execute our projects or serve our clients.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl md:text-2xl text-charcoal font-bold tracking-tight mb-3">
                  Your Rights
                </h2>
                <p className="mb-2">Depending on your location, you may have the right to:</p>
                <ul className="list-disc pl-5 flex flex-col gap-2">
                  <li>Access, update, or delete your personal data.</li>
                  <li>Opt-out of marketing emails or updates.</li>
                  <li>Request a copy of the data we hold about you.</li>
                </ul>
              </div>

              <div className="border-t border-charcoal/10 pt-6 mt-4">
                <h2 className="font-serif text-xl md:text-2xl text-charcoal font-bold tracking-tight mb-3">
                  Contact Us
                </h2>
                <p>
                  If you have any questions or suggestions regarding this Privacy Policy, feel free to contact us at:{" "}
                  <a href={`mailto:${contactEmail}`} className="text-gold font-bold hover:underline">
                    {contactEmail}
                  </a>
                </p>
              </div>
            </div>
          </article>
        )}

        {type === 'terms' && (
          <article className="prose prose-neutral max-w-none">
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal font-bold tracking-tight mb-4 border-b border-charcoal/10 pb-4">
              Terms & Conditions
            </h1>
            <p className="text-xs text-charcoal-light/60 font-mono tracking-widest uppercase mb-10">
              Effective Date: July 9, 2026 // Last Updated: July 9, 2026
            </p>

            <div className="flex flex-col gap-8 text-sm md:text-base text-charcoal-light/95 leading-relaxed font-sans">
              <p>
                Welcome to <strong>{brandName}</strong>. By accessing and using this website, you agree to comply with and be bound by the following Terms & Conditions.
              </p>

              <hr className="border-charcoal/10" />

              <div>
                <h2 className="font-serif text-xl md:text-2xl text-charcoal font-bold tracking-tight mb-3">
                  Use of Website
                </h2>
                <ul className="list-disc pl-5 flex flex-col gap-2">
                  <li>You must be at least 18 years old to request production consultation sessions.</li>
                  <li>You agree not to misuse our website, interactive tools, or any content thereof, or engage in unlawful activities.</li>
                  <li>
                    You must not use our Website to copy, store, host, transmit, send, use, publish, or distribute any material which consists of (or is linked to) any spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit, or other malicious computer software.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-xl md:text-2xl text-charcoal font-bold tracking-tight mb-3">
                  Copyright & Intellectual Property Notice
                </h2>
                <p className="mb-3">
                  All content included on this website (text, layout code, animations, designs, clapperboard systems, viewfinder elements, and logos) is owned by <strong>{brandName}</strong> unless stated otherwise.
                </p>
                <p>
                  You may not download, share, copy, distribute, or reproduce content without our explicit prior written permission.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl md:text-2xl text-charcoal font-bold tracking-tight mb-3">
                  User Inquiries & Accounts
                </h2>
                <ul className="list-disc pl-5 flex flex-col gap-2">
                  <li>If you submit a project details consult, you agree to provide accurate and truthful contact information.</li>
                  <li>You are responsible for any communication sent through your email account details.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-xl md:text-2xl text-charcoal font-bold tracking-tight mb-3">
                  Limitation of Liability
                </h2>
                <p>
                  We are not responsible for any direct, indirect, or incidental damages caused by the use of this website, the reliance on its interactive drafts, or the inability to access its services.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl md:text-2xl text-charcoal font-bold tracking-tight mb-3">
                  External Links
                </h2>
                <p>
                  Our site may contain links to third-party streaming services, distribution partners, or social media channels. We are not responsible for their content, accuracy, or privacy practices.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl md:text-2xl text-charcoal font-bold tracking-tight mb-3">
                  Changes to Terms
                </h2>
                <p>
                  We may update these Terms & Conditions at any time. Continued use of the website following any changes signifies your acceptance of the revised Terms.
                </p>
              </div>

              <div className="border-t border-charcoal/10 pt-6 mt-4">
                <h2 className="font-serif text-xl md:text-2xl text-charcoal font-bold tracking-tight mb-3">
                  Governing Law and Jurisdiction
                </h2>
                <p>
                  These Terms & Conditions shall be governed and interpreted in accordance with the laws of India. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in <strong>Chennai, India</strong>.
                </p>
              </div>
            </div>
          </article>
        )}

        {type === 'cookies' && (
          <article className="prose prose-neutral max-w-none">
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal font-bold tracking-tight mb-4 border-b border-charcoal/10 pb-4">
              Cookie & Disclaimer Policy
            </h1>
            <p className="text-xs text-charcoal-light/60 font-mono tracking-widest uppercase mb-10">
              Effective Date: July 9, 2026 // Last Updated: July 9, 2026
            </p>

            <div className="flex flex-col gap-8 text-sm md:text-base text-charcoal-light/95 leading-relaxed font-sans">
              <div>
                <h2 className="font-serif text-2xl text-charcoal font-bold tracking-tight mb-3">
                  1. Cookie Policy
                </h2>
                <p className="mb-4">
                  Cookies are small files stored on your device that help improve your browsing experience, save project inputs, and remember preferences.
                </p>
                <div className="flex flex-col gap-3">
                  <p><strong>Essential Cookies:</strong> Needed for basic site operations and loading responsive navigation states.</p>
                  <p><strong>Analytics Cookies:</strong> Help us measure visit metrics and optimize page loading times.</p>
                  <p><strong>Functional Cookies:</strong> Allow our interactive timeline block drag features and color wheels to track details efficiently.</p>
                  <p className="mt-2 text-xs text-charcoal-light/70">
                    * You can control, block, or disable cookies through your browser settings. Please note that certain interactive features may not function properly if cookies are fully disabled.
                  </p>
                </div>
              </div>

              <hr className="border-charcoal/10" />

              <div>
                <h2 className="font-serif text-2xl text-charcoal font-bold tracking-tight mb-3">
                  2. Disclaimer Policy
                </h2>
                <ul className="list-disc pl-5 flex flex-col gap-3">
                  <li>
                    <strong>Information & Promotion:</strong> All content, media assets, timelines, and blueprint drafts provided on this website are for informational and promotional purposes only.
                  </li>
                  <li>
                    <strong>No Casting/Employment Guarantees:</strong> Submitting inquiries or drafts does not guarantee casting, script review, project funding, or job opportunities unless officially confirmed in writing by a representative of {brandName}.
                  </li>
                  <li>
                    <strong>Third-Party Liability:</strong> External links to streaming partners, film festivals, and distribution channels are outside our responsibility.
                  </li>
                </ul>
              </div>

              <hr className="border-charcoal/10" />

              <div>
                <h2 className="font-serif text-xl md:text-2xl text-charcoal font-bold tracking-tight mb-3">
                  Changes to this Policy
                </h2>
                <p>
                  We may update our Cookie & Disclaimer Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any modifications by posting the revised Policy on this page. These changes are effective immediately upon posting.
                </p>
              </div>

              <div className="border-t border-charcoal/10 pt-6 mt-4">
                <h2 className="font-serif text-xl md:text-2xl text-charcoal font-bold tracking-tight mb-3">
                  Contact Us
                </h2>
                <p>
                  If you have questions or suggestions about our Cookie & Disclaimer Policy, do not hesitate to contact us at:{" "}
                  <a href={`mailto:${contactEmail}`} className="text-gold font-bold hover:underline">
                    {contactEmail}
                  </a>
                </p>
              </div>
            </div>
          </article>
        )}
      </main>

      {/* Simple Policy Footer */}
      <footer className="border-t border-charcoal/5 bg-white/40 py-8 select-none">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-charcoal-light/50 tracking-wider uppercase">
          <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#/privacy" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#/terms" className="hover:text-gold transition-colors">Terms</a>
            <a href="#/cookie-policy" className="hover:text-gold transition-colors">Cookies</a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
