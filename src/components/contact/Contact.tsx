import MotionWrapper from '@/components/ui/MotionWrapper';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactSection } from '@/types/dictionary';
import ContactInfoCard from '@/components/contact/ContactInfoCard';

interface IProps {
  contact: ContactSection;
}

export default function Contact({ contact }: IProps) {
  const { contactTitle, sectionTitle, description, form, info, feedback } = contact;

  return (
    <section
      id="contact"
      className="py-24  dark:bg-black transition-all duration-300   bg-gray-50 "
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-lg px-3 py-1 text-sm dark:bg-gray-50  bg-black text-white dark:text-black">
            {sectionTitle}
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{contactTitle}</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">{description}</p>
        </div>
        <div className="grid gap-6 mt-12 md:grid-cols-2">
          <MotionWrapper
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <ContactInfoCard info={info} />
          </MotionWrapper>

          <MotionWrapper
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <ContactForm feedback={feedback} form={form} />
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
