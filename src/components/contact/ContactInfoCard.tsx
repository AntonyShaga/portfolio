import Telegram from '@/icons/Telegram';
import WhatsApp from '@/icons/WhatsApp';
import SocialLinks from '@/components/ui/SocialLinks';
import { ContactInfo } from '@/types/dictionary';

interface IProps {
  info: ContactInfo;
}
export default function ContactInfoCard({ info }: IProps) {
  const {
    locationInfo,
    titleInfo,
    phoneInfo,
    socialsInfo,
    subtitleInfo,
    emailInfo,
    messengersInfo,
  } = info;
  return (
    <div className={'rounded-lg border shadow-sm border-gray-100 dark:border-gray-800'}>
      <div className={'flex flex-col space-y-1.5 p-6'}>
        <h3 className={'text-2xl font-semibold leading-none tracking-tight'}>{titleInfo}</h3>
        <p className={'text-sm text-muted-foreground'}>{subtitleInfo}</p>
      </div>
      <div className={'p-6 pt-0 space-y-8'}>
        <div className="flex items-center">
          <a
            href="mailto:antonyshaga@gmail.com"
            className="text-muted-foreground hover:text-foreground"
          >
            {emailInfo}
          </a>
        </div>
        <div className="flex items-center">
          <a href="tel:+12049516061" className="text-muted-foreground hover:text-foreground">
            {phoneInfo}
          </a>
        </div>
        <div className="flex flex-col space-y-4">
          <h4 className="font-medium">{messengersInfo}</h4>
          <div className="flex items-center space-x-2">
            <a
              href={'https://t.me/AntonyShaga'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={'Telegram'}
            >
              <Telegram
                aria-label={'Telegram'}
                className="text-gray-500 hover:text-neutral-800 w-6 h-6 dark:hover:text-white transition-colors duration-300"
              />
              <span className="sr-only">Telegram</span>
            </a>
            <a
              href={'https://wa.me/12049516061'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <WhatsApp
                aria-label="WhatsApp"
                className="text-gray-500 hover:text-neutral-800 w-6 h-6 dark:hover:text-white transition-colors duration-300"
              />
              <span className="sr-only">WhatsApp</span>
            </a>
          </div>
        </div>
        <div className={'flex items-center'}>
          <span className="text-muted-foreground">{locationInfo}</span>
        </div>
        <div className={'pt-2'}>
          <h3 className={'font-medium mb-2'}>{socialsInfo}</h3>
          <div className={'flex space-x-4'}>
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
}
