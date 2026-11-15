import { profile } from '@/content/portfolio';
import { emailHref, resumeHref } from '@/lib/contact';
import { ActionLink, Arrow, Eyebrow } from './primitives';
export function Contact() {
  return <section id="contact" className="contact-section section rule"><div><Eyebrow>03 / Keep in touch</Eyebrow><h2>Let’s make<br /><em>something useful.</em></h2><p>A good conversation is a good place to start.</p></div><div className="contact-actions">{profile.email && <ActionLink href={emailHref(profile.email)}>Say hello</ActionLink>}<ActionLink href={profile.github} secondary={Boolean(profile.email)}>Find me on GitHub</ActionLink>{profile.resume && <a className="text-link" href={resumeHref(profile.resume)}>View resume <Arrow /></a>}<span className="contact-note">Thanks for stopping by the studio.</span></div></section>;
}
