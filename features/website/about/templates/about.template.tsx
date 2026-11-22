import {ABOUT_DATA} from "@/features/website/about/data/about.data";
import AboutHero from "@/features/website/about/components/about_hero";
import AboutMission from "@/features/website/about/components/about_mission";
import AboutValues from "@/features/website/about/components/about_values";
import AboutCTA from "@/features/website/about/components/about_cta";

export default function AboutTemplate() {
    const { hero, mission, values, cta } = ABOUT_DATA;

    return (
        <main className="container-page space-y-8 py-8 sm:py-12">

            <AboutHero
                eyebrow={hero.eyebrow}
                title={hero.title}
                description={hero.description}
            />

            <AboutMission
                title={mission.title}
                description={mission.description}
                secondaryDescription={mission.secondaryDescription}
            />

            <AboutValues values={values} />

            <AboutCTA
                title={cta.title}
                description={cta.description}
                buttonText={cta.buttonText}
                buttonUrl={cta.buttonUrl}
            />

        </main>
    );
}
