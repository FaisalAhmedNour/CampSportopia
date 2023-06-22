import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import ClassesSection from "../ClassesSection/ClassesSection";
import ClientsSays from "../ClientsSays/ClientsSays";
import GallerySection from "../GallerySection/GallerySection";
import InstructorsSection from "../InstructorsSection/InstructorsSection";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>CampSportopia | Home</title>
            </Helmet>
            <Banner></Banner>
            <ClassesSection></ClassesSection>
            <InstructorsSection></InstructorsSection>
            <ClientsSays></ClientsSays>
            <GallerySection></GallerySection>
        </div>
    );
};

export default Home;