import MainContainer from "@c/MainContainer";
import WelcomeSection from "@c/WelcomeSection";
import WolfTrackLayer from "@c/WolfTrackLayer";
import HowToPlay from "@c/HowToPlay";
import AturanGame from "@c/InfoGame";
import RolesList from "@c/RolesList";
import KickedNotify from "@c/KickedNotify";


export default function Home() {


    return (
        <>
            <KickedNotify />
            <WolfTrackLayer/>
            <MainContainer>
                <WelcomeSection/>
                <HowToPlay />
                <AturanGame />
                <RolesList />
            </MainContainer>
        </>
    );
}
