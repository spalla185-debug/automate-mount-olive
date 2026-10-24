# AI Automation for Service Businesses

_Started 2026-08-19 11:16 UTC_

---

## User

Build a full landing page for our AI automation business, single-page scroll, desktop and mobile responsive. Two co-founders, high school seniors, NJ-based, targeting small businesses in real estate, law, and contracting. I attached a 'Classical' Design System so I'd like to see a blend of both the EXPLICITLY listed colors and fonts below, but ALSO a mix of the fonts and colors in the Design System too.

COLORS:
- Background: #faf9f5 (light canvas)
- Primary text / dark elements: #141413
- Secondary backgrounds: #e8e6dc, #b0aea5
- Primary accent (buttons, key highlights, one loud color driving the design): #d97757
- Secondary accents (use sparingly, don't compete with the primary): #6a9bcc, #788c5d

TYPOGRAPHY:
- Headings: Poppins
- Body text: Lora

LAYOUT/SKELETON: rounded cards, restrained editorial type hierarchy, pill-shaped buttons, persistent-underline link style, credible SaaS feel like amplemarket.com or 7shifts.com, not a generic AI-startup template. No rocket icons or B2B SaaS clichés anywhere.

Sections in order: hero, how it works, what we automate, pricing, proof, meet the team, FAQ, contact.

HERO: "Automation for real estate, law, and contracting businesses that handles the admin work you don't have time for." CTA button: "Start the 48-hour build." No pricing visible in the hero.

HOW IT WORKS (3 steps):
1. Free consultation — 30 minutes, in person or call, we find the 2-3 tasks eating the most time.
2. Personalized build — 48 hours. Two people building in parallel.
3. Go live, zero friction — the system runs itself, we handle monitoring and tweaks.

WHAT WE AUTOMATE: Real estate, law, contracting. Include line: "Already using a scheduling app that works? We're probably not for you."

PRICING — two models, shown as clearly separate paths:
Model A (n8n workflow): Starter/Growth/Pro tiers ($499-599 setup, $299-399/mo), 14-day free trial with card on file, 50% off first billed month, full price from month two, one-step cancel.
Model B (direct CRM integration): custom one-time pricing, no monthly fee, contact for a quote.

PROOF: named pilot client testimonial section (placeholder for now), plus a line: "Recommended by the Mayor's office to the Mount Olive Chamber of Commerce."

TEAM: Sven Morais and Sashi Palla, full names, both high school seniors, no photos, short factual bios.

FAQ: three objections — "we already have something in place," "this seems expensive," "is our data safe" (answer: n8n Cloud, AES-256, SOC 2 Type 2).

CONTACT: placeholder booking/contact form section.

Voice: confident, direct, local, no corporate fluff. Business name is a placeholder, use "[BUSINESS NAME]" everywhere.

## Assistant

_[tool: list_files]_

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: dc_write]_

_[tool: ready_for_verification]_

Built the full single-page landing site (hero → contact) blending your explicit palette/fonts (Poppins/Lora, terracotta accent, warm neutrals) with Classical's editorial DNA (hairline rules, Cormorant Garamond accents on numerals/quotes, restrained tag/card language) — pill buttons, persistent-underline links, rounded cards, fluid responsive layout throughout. Added 3 functional tweaks: which pricing tier is "Most Popular," trial-offer visibility, and FAQ single/multi-open behavior. All copy uses [BUSINESS NAME] and placeholder client/contact details as requested.

## User

REPLACE THE EXISTING TEXT WITH EXPLICITLY AND EXACTLY THE TEXT BELOW, DO NOT ADD OR REMOVE ANYTHING ELSE: [BUSINESS NAME]
How it works · What we automate · Pricing · Proof · Team · FAQ
[Start the 48-hour build]

NJ-based · Real Estate · Law · Contracting

Automation for real estate, law, and contracting businesses
that handles the admin work you don't have time for.

Two Mount Olive, NJ natives building systems that quietly handle the
follow-ups, scheduling, reminders, and intake you'd rather not think
about. No dashboards to babysit.

[Start the 48-hour build]  [See how it works]
Free 30-minute consult · Built in 48 hours · One-click cancel

---

HOW IT WORKS
From first call to a running system in 48 hours.

01 Free consultation
30 minutes, call or in person. We find the 2-3 tasks eating the
most time in your business.

02 Personalized build
48 hours, two people building in parallel, built around how your
business actually runs.

03 Go live, zero friction
The system runs itself. We handle monitoring and tweaks.

---

WHAT WE AUTOMATE
Built for how real estate, law, and contracting businesses actually run.

Real Estate
Lead response and follow-up sequences
Showing and appointment scheduling
Listing status updates to clients
Document and e-sign chasing

Law
Intake form triage and routing
Client status update emails
Consultation scheduling
Document collection reminders

Contracting
Quote and estimate follow-ups
Job scheduling and crew notifications
Invoice reminders
Review requests after job completion

---

PRICING
Pick the tier that fits how your business runs.

Starter
$199/mo
$349 one-time setup
1 automated workflow
Connects to your calendar + inbox
Monthly monitoring, 1 revision
Email support
[Start the 48-hour build]

Growth — Most Popular
$349/mo
$549 one-time setup
Up to 3 automated workflows
CRM + calendar + inbox integration
Monthly monitoring, 2 revisions
Priority email + text support
[Start the 48-hour build]

Pro
$549/mo
$999 one-time setup
Unlimited workflows within scope
Full-stack integration (CRM, calendar, invoicing, docs)
Weekly monitoring, unlimited tweaks
Direct line to both founders
[Start the 48-hour build]

Custom
Custom pricing
For workflows built directly inside a CRM you already run.
Scoped and quoted individually.
[Contact for a quote]

Every plan includes a 14-day free trial, first month 50% off.
Cancel anytime, one click.

---

PROOF
"Booking used to eat an hour every morning — now it's a five-minute
check once a week."
[Client Name], [Client Business]
Pilot client · testimonial coming soon

Recommended by the Mayor's Office to the Mount Olive Chamber of Commerce

---

MEET THE TEAM
Two seniors. One 48-hour promise.
High school seniors based in Mount Olive, building real automation
for real businesses, not a class project.

SM  Sven Morais, Co-Founder, Automation Lead
Builds the workflow logic behind every system, from the first n8n
node to final QA before go-live.

SP  Sashi Palla, Co-Founder, Client Lead
Runs consultations, onboarding, and client relationships, making
sure every build fits how the business actually works before going live.

---

FAQ
We already have something in place.
This seems expensive.
Is our data safe?

---

CONTACT
Book your free consultation.
30 minutes, no obligation.

hello@[businessname].com
(973) 555-0100
Mount Olive, New Jersey

Name / Email / Business type / What's eating your time?
[Request a consultation]
Booking calendar coming soon. We reply within one business day.

## Assistant

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

Text replacement applied exactly as specified (hero copy, steps, pricing tiers/copy, team bios, proof quote). Note: the DS-adherence warning is pre-existing from the original build's approach (custom tokens matching your explicit brand spec rather than the Classical bundle) — flagging it but not changing since this turn was text-only per your instruction.

## User

Update that proof / quote part with this, and actually put the business name as 'Automate Mount Olive,' or A.M.O for short. Put this was said by Tara Lauterbach Realtor Agent AND VP of Chamber of Commerce: Working with Automate Mt Olive helps me stay engaged with my clients, show that I care, and maintain a professional, personal touch.          In real estate, urgent matters can easily take priority, and the little things sometimes fall through the cracks. 

Thanks to Automate Mt Olive, I can stay on top of those meaningful client connections without adding more to my plate. I can 'Set It and Let the System Do the Work!' And also while ur here, change the Two Seniors, so Sven morais is Cofounder and COO, I'm Cofounder and CTO, so change that description Im the tech guy ALONG with helping set up both consultations and onboarding, sven OPERATEs so he operates / communications with clients and keeping eberything together and checking my work. So make sure that gets switched.

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

I made the changes:

- **Business name:** "Automate Mount Olive" now replaces [BUSINESS NAME] in the header and footer. The footer reads "© 2026 Automate Mount Olive (A.M.O)."
- **Proof:** Tara's quote is in, split into two paragraphs. It's credited to "Tara Lauterbach, Realtor · VP, Mount Olive Chamber of Commerce." I removed the "testimonial coming soon" tag since the quote is real now.
- **Team:**
  - **Sven Morais, Co-Founder & COO:** runs operations and client communication, keeps every project on track, and checks every build before it goes live.
  - **Sashi Palla, Co-Founder & CTO:** builds the system behind every project, from the first step to final testing, and helps run consultations and onboarding.

The email is still the placeholder hello@[businessname].com. Send me the real address and I'll put it in.

## User

In the proof section tighten it to be 'Automate Mt. Olive', and remove some awkward spaces the font and spacing doesn't really look clean it looks like kind of awkard so clean that up. And remove the text that says 'Already using a schedling app that works?" 'We're probably not for you.' Because we already address that in the bottom in FAQ so no need to be redundant AND self-sabotaging.

## Assistant

_[tool: grep]_

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

I cleaned up the proof section and removed the "Already using a scheduling app that works?" line from What We Automate.

- **Name:** the quote now says "Automate Mt. Olive" in both places.
- **Font:** the quote is now in Lora instead of the decorative serif, at a calmer size and narrower line width so it reads more evenly.
- **Spacing:** I removed the large floating quote mark that left a gap above the text. The quote marks now sit inside the sentence.
- **Credit:** Tara's name and title are now two plain lines next to a short orange rule, instead of a name followed by an outlined bubble.

## User

I think we should connect the request a consultation to a google sheet right? I'll make one and link it here route it so that when you click 'Request a consultation,' it gets logged in the excel sheet so we can actually store it , AND actually something that works beautifully / in a circle is if we use the Exact SAME tech that we're trying to sell in the WEBSITE itself, meaning that I can make a n8n workflow so that as soon as you click request a consultation it'll send an email with some quick info and details RIGHT to their email, along with a calendly link to schedule a time. Do you think thsi is the best way to reduce friction?

## Assistant

Yes, and using your own product on your own site is a strong pitch. One change I'd make: **send the form to one n8n workflow and let n8n do everything else.** Don't have the site write to Google Sheets directly.

**The flow:**
1. The form sends to an n8n webhook URL.
2. n8n adds a row to the Google Sheet (name, email, business type, what's eating their time, timestamp).
3. n8n emails the lead right away: a short personal note plus your Calendly link.
4. n8n also texts or emails you and Sven so you can follow up the same day.

**To cut friction further:** don't make them go to their inbox to book. After they click "Request a consultation," show the Calendly booking calendar right on the page in the thank-you spot. The email becomes a backup for people who leave without booking, not the only way to book. If someone doesn't book within 24 hours, n8n can send a follow-up email. That's the kind of follow-up automation you'd be selling clients anyway.

**Things to set up on the n8n side:**
- Turn on CORS on the webhook and allow your site's domain. Otherwise the browser will block the form from sending.
- Have the webhook send back a success response quickly, so the page can show the confirmation.
- Add a hidden spam-trap field, and have n8n drop any submission that fills it in.

**What I'd build on the page:** name the form fields properly, send them to your webhook, add sending, success and error states, add the spam-trap field, and show the Calendly calendar after a successful submit.

Send me your **n8n webhook URL** and **Calendly link** and I'll wire it up.

## User

Put the phone numbers as '973-288-4189,' and '973-798-1650'

## Assistant

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

I put both numbers in the contact section, 973-288-4189 and 973-798-1650, in place of the placeholder number.

The numbers aren't labeled yet. Want me to add a name next to each so visitors know who they're calling?

## User

Put Sashi: for the first number, and then Sven: for the second number. Sashi is 4189 Sven is 1650

## Assistant

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

The contact section now reads "Sashi: 973-288-4189" and "Sven: 973-798-1650".

## User

I think the landing page could be revamped instaed of just text text text could you make the headline much shorter and instead have a bit more 'fun' somewhere like in the animations or colors? like It has to be formal so obviously nothing over the top no like insane GSAP animations or stuff like that since it has to be accessible, but have a bit more fun with it so it's not ALL just boring lengthy texts.

## Assistant

_[tool: read_file]_

_[tool: dc_write]_

_[tool: ready_for_verification]_

I made the redesign as **Landing Page v2**, so the original is still there to compare.

- **Headline:** cut down to "Admin work, *handled.*" The word "handled." is in an orange italic serif, and an underline draws in under it when the page loads.
- **Hero:** a live activity card sits next to the headline. Every few seconds a new example automation slides in at the top, like "Showing confirmed for Saturday." The card is labeled "Example activity" so it doesn't read as real client data.
- **Task strip:** a dark band under the hero slowly scrolls through the tasks you automate.
- **How it works:** each step card has a colored bar across the top that fills in one after another as you scroll to it.
- **What we automate:** the three text lists are now tabs (Real Estate / Law / Contracting). Each tab shows a short "When → We → Result" example plus a few extra tasks.
- **Smaller touches:** sections fade in as you scroll, cards lift slightly on hover, the FAQ uses rounded cards with a round +, and the phone numbers can be tapped to call. One orange italic phrase per heading carries the color.

Everything still reads as formal. If a visitor's device is set to reduce motion, all of the animation turns off. In the settings panel you can also switch off the live activity card.

Two things to check:
- The activity card and the scrolling strip can't be edited by clicking on them in the editor. Ask me to change their wording.
- The email is still the placeholder hello@[businessname].com.

## User

Found issues — fixing…

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

On narrower screens, the pale orange circle behind the hero's activity card spilled over the dark scrolling task strip and covered some of its words. I made the circle smaller and moved it closer to the card, and the dark strip now always sits on top. I haven't re-checked it at narrow widths since the fix.

## User

Not even within a minute say 'seconds' because as SOON as that mf n8n hits the output that shi is almost INSANT. And say for the 'When' part in Real Estate say 'A new lead comes in from Zillow or your CRM.'

## Assistant

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

Both changes are in on the Real Estate tab: "When" now says "A new lead comes in from Zillow or your CRM," and "We" now says "A personal text and email go out in seconds."

## User

I really love this design for the frontend the 'Running right now' thing while you work how repeated is it? Like maybe add 2 or 3 more signficantly strong examples to that so it has a TEENY bit more time before the cycle loops again ykwim

## Assistant

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

I added 4 new examples to the "Running right now" card, so it now has 12 instead of 8. A new one slides in every 2.8 seconds, so the full cycle now takes about 34 seconds before it repeats, up from about 22.

- **Law:** Missed call texted back instantly
- **Real Estate:** Open house sign-ins added to CRM
- **Contracting:** Overdue invoice reminder sent
- **Law:** Retainer signed, client onboarded

I added two Law examples because Law had the fewest. Each industry now has four.

## User

Also can I get ALL of the text that is currently in the website right now? Like ALL Of it. Put it in a .txt file

## Assistant

_[tool: write_file]_

_[tool: present_fs_item_for_download]_

Here's all the site text, section by section, in Website Copy.txt. It also covers text that only shows up sometimes: all 12 "Running right now" examples, all three tabs, the FAQ answers, the form fields and the message after someone submits.

## User

Can you make the 'Recommended by the Mayor' Office to the Mount Olive Chamber of Commerce' a bit bigger like try and emphasize that proof section the most cuz Ik businesses will NOT give a shit without that already document proof / credibility

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

The Mayor's Office recommendation is now the main headline of the proof section, at the top instead of the small bubble at the bottom.

- **Headline:** "Recommended by the Mayor's Office" in large type, about the size of the hero headline. "to the Mount Olive Chamber of Commerce." follows in the orange italic.
- **Label:** a small orange "Officially recommended" tag sits above it.
- **Quote:** Tara's quote comes underneath, separated by a thin line, so it backs up the recommendation instead of competing with it.

The "Officially recommended" tag is wording I added. Remove it or reword it if that's not how the recommendation was given.

The website copy file I gave you still describes the old layout. I can update it if you want. I can also put a short "Recommended by the Mayor's Office" line in the hero so visitors see it before they scroll.

## User

Populate the website with this text instead, leave placeholders for right now we'll get those in soon:

## Assistant

_[tool: read_file]_

_[tool: copy_files]_

_[tool: run_script]_

_[tool: ready_for_verification]_

The v5 copy is now on the site as **Landing Page v3**; v2 is untouched.

- **Buttons:** the header and hero now say "Book a free consult," and the three plan cards say "Start free trial."
- **Order:** Real Estate · Contracting · Law in the hero tag, the tabs and the form's business-type menu.
- **Proof:** now leads with "Live for a local realtor." and what you built for Tara. The short line from her quote is shown large, with the full quote below it. The Mayor's office line now uses your softer wording: "Introduced to the Mount Olive Chamber of Commerce through the Mayor's office."
- **FAQ:** the new "Why should we trust you?" question is first, and the other answers are updated.
- **Pricing:** the full trial and billing terms are in, and the Growth tag now says "Recommended."
- **Disclaimers:** the "independent, student-run" line is under the team cards, and the full disclaimer is in the footer.
- **Contact:** the Calendly link is below the form, and the thank-you message is updated.

Each **[[DOUBLE BRACKET]]** item shows on the page as a dashed orange box so it's hard to miss before launch. There are three: Tara's number in Proof, and the email and shared phone line in Contact.

The two phone numbers are no longer on the page, because your copy replaces them with the shared-line placeholder.

