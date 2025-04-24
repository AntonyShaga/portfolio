"use client";

import Link from "next/link";
import SocialLinks from "@/components/ui/SocialLinks";
import Nav from "@/components/Header/Nav";
import {useDictionary} from "@/app/i18n/DictionaryContext";

const Footer = () => {
    const dict = useDictionary();
    return (
        <footer className="  py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="flex items-center space-x-4">
                       <SocialLinks/>
                        <Link
                            href="mailto:alexander@example.com"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {/*  <Mail className="h-5 w-5" />
                            <span className="sr-only">Email</span>*/}
                        </Link>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
                       <Nav/>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} {dict.footer.copyright}
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;
