import MotionWrapper from "@/components/ui/MotionWrapper";
import SocialLinks from "@/components/ui/SocialLinks";
import {ContactForm} from "@/components/contact/ContactForm";
import {ContactSection} from "@/types/dictionary";

interface IProps {
    contact:ContactSection
}

export default function Contact ({contact}:IProps) {
    const {contactTitle,sectionTitle,description,form,info,feedback} = contact
    const {locationInfo,titleInfo,phoneInfo,socialsInfo,subtitleInfo,emailInfo} = info
    const {titleForm,subtitleForm} =form
    return (
        <section  id="contact" className="py-24  dark:bg-black transition-all duration-300   bg-gray-50 ">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="inline-block rounded-lg px-3 py-1 text-sm dark:bg-gray-50  bg-black text-white dark:text-black">
                        {sectionTitle}
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{contactTitle}</h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-lg">
                        {description}
                    </p>
                </div>
                <div className="grid gap-6 mt-12 md:grid-cols-2">
                    <MotionWrapper
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9 }}
                    >
                        <div className={"rounded-lg border shadow-sm border-gray-100 dark:border-gray-800"}>
                            <div className={"flex flex-col space-y-1.5 p-6"}>
                                <h3 className={"text-2xl font-semibold leading-none tracking-tight"}>{titleInfo}</h3>
                                <p className={"text-sm text-muted-foreground"}>
                                    {subtitleInfo}
                                </p>
                            </div>
                            <div className={"p-6 pt-0 space-y-8"}>
                                <div className="flex items-center">
                                    <a href="mailto:alexander@example.com" className="text-muted-foreground hover:text-foreground">
                                        {emailInfo}
                                    </a>
                                </div>
                                <div className="flex items-center">
                                    <a href="tel:+79123456789" className="text-muted-foreground hover:text-foreground">
                                        {phoneInfo}
                                    </a>
                                </div>
                                <div className={"flex items-center"}>
                                    <span className="text-muted-foreground">{locationInfo}</span>
                                </div>
                                <div className={"pt-6"}>
                                    <h3 className={"font-medium mb-2"}>{socialsInfo}</h3>
                                    <div className={"flex space-x-4"}>
                                        <SocialLinks/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MotionWrapper>

                    <MotionWrapper
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={"rounded-lg border shadow-sm border-gray-100 dark:border-gray-800 flex flex-col justify-between h-full"}>
                            <div className={"flex flex-col space-y-1.5 p-6"}>
                                <h3 className={"text-2xl font-semibold leading-none tracking-tight"}>{titleForm}</h3>
                                <p className={"text-sm text-muted-foreground"}>
                                    {subtitleForm}
                                </p>
                            </div>
                            <div className={"p-6 pt-0 h-full space-y-4"}>
                                <ContactForm feedback={feedback} form={form} />
                            </div>
                        </div>
                    </MotionWrapper>
                </div>

            </div>
        </section>
    )
}
