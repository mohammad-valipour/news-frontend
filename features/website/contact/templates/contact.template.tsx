import ContactHero from "@/features/website/contact/components/contact_hero";
import {CONTACT_DATA} from "@/features/website/contact/data/contact.data";
import ContactInfo from "@/features/website/contact/components/contact_info";
import ContactForm from "@/features/website/contact/components/contact_form";

export default function ContactTemplate() {
    return (
        <main className="container-page space-y-10 py-8 sm:py-12">

            <ContactHero
                eyebrow={CONTACT_DATA.hero.eyebrow}
                title={CONTACT_DATA.hero.title}
                description={CONTACT_DATA.hero.description}
            />

            <section className="grid gap-8 lg:grid-cols-12 lg:items-start">

                <div className="lg:col-span-4">
                    <ContactInfo items={CONTACT_DATA.info}/>
                </div>

                <div className="lg:col-span-8">
                    <ContactForm
                        recipientEmail={CONTACT_DATA.email}
                    />
                </div>

            </section>

        </main>
    );
}
