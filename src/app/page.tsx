import MainContainer from "@c/MainContainer";
import WelcomeSection from "@c/WelcomeSection";
import WolfTrackLayer from "@c/WolfTrackLayer";


export default function Home() {


    return (
        <>
            <WolfTrackLayer/>
            <MainContainer>
                <WelcomeSection/>
                <section className="min-h-screen minMaxWidth">

                </section>
            </MainContainer>
        </>
    );
}
