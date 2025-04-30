import SocialLinks from "@/components/ui/SocialLinks";
import {NavigationLabels} from "@/types/dictionary";
import Nav from "@/components/header/Nav";

interface IProps {
    footer:{
        copyright: string;
    }
    nav:NavigationLabels
}

export default async function Footer ({ footer, nav }: IProps) {

    return (
        <footer className=" transition-all duration-300  py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="flex items-center space-x-4">
                       <SocialLinks/>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
                        <Nav nav={nav} ariaLabel={"Footer navigation"}/>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()}{footer.copyright}
                    </div>
                </div>
            </div>
        </footer>
    )
};


