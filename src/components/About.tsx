import DownloadResumeButton from '@/components/resumeButton/DownloadResumeButton';
import { AboutSection, ToastMessages } from '@/types/dictionary';
import MotionWrapper from '@/components/ui/MotionWrapper';
import Link from 'next/link';

interface IProps {
  about: AboutSection;
  toast: ToastMessages;
}

export default function About({ about, toast }: IProps) {
  const { education, headline, story, text, sectionTitle, certificates } = about;
  const { title, university, degree } = education;
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 dark:bg-black transition-all duration-300 bg-gray-50"
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 id="about-heading" className="sr-only">
          {headline}
        </h2>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <MotionWrapper
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block rounded-lg  dark:bg-gray-50  bg-black text-white dark:text-black px-3 py-1 text-sm ">
              {sectionTitle}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{headline}</h2>
            <p className="text-muted-foreground md:text-lg">{text}</p>
            <p className="text-muted-foreground md:text-lg">{story}</p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <DownloadResumeButton toastErr={toast} />
            </div>
          </MotionWrapper>
          <MotionWrapper
            className="space-y-4 "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold">{title}</h3>
            <div className="rounded-lg border p-4 bg-white dark:text-black">
              <h4 className="font-semibold">{university}</h4>
              <p className="text-sm ">{degree}</p>
            </div>
            <h3 className="text-xl font-bold mt-6">{certificates}</h3>
            <div className="space-y-2">
              <div className="rounded-lg border p-4 bg-white dark:text-black">
                <h4 className="font-semibold">
                  Legacy JavaScript Algorithms and Data Structures Certification
                </h4>
                <p className="text-sm ">
                  <Link
                    target={'_blank'}
                    href={
                      'https://freecodecamp.org/certification/AntonyShaga/javascript-algorithms-and-data-structures'
                    }
                  >
                    FreeCodecamp Developer Certification on May 13 2024
                  </Link>
                </p>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
