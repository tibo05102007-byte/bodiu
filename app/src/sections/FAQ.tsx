import { useState, useEffect, useRef } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Из каких материалов изготавливаются ваши дверные ручки?',
    answer:
      'Мы используем только премиальные материалы: массивную латунь, бронзу, нержавеющую сталь аэрокосмического класса и высококачественные алюминиевые сплавы. Каждый материал тщательно подбирается за его долговечность, эстетическую привлекательность и способность удерживать тонкие отделки. Наша латунь и бронза со временем приобретают красивую патину, а варианты из нержавеющей стали обеспечивают максимальную коррозионную стойкость.',
  },
  {
    question: 'Как выбрать правильную отделку для моего пространства?',
    answer:
      'Рассмотрите общую дизайнерскую эстетику и существующую фурнитуру. Матовый черный хорошо смотрится в современных и индустриальных пространствах, в то время как латунь или бронза с эффектом античной отделки дополняют традиционные и переходные интерьеры. Сатинированный никель предлагает универсальный нейтральный оттенок, который сочетается с большинством цветовых схем. Наши дизайнеры-консультанты всегда готовы помочь вам выбрать идеальную отделку для вашего проекта.',
  },
  {
    question: 'Предлагаете ли вы индивидуальные дизайны или модификации?',
    answer:
      'Да, мы предлагаем услуги индивидуального дизайна для проектов, требующих уникальных спецификаций. Наша команда может модифицировать существующие модели или создать совершенно новые ручки на основе ваших требований. Индивидуальные проекты обычно требуют 6-8 недель для производства. Свяжитесь с нашей командой продаж, чтобы обсудить ваши конкретные потребности и получить расчет.',
  },
  {
    question: 'Какова ваша политика гарантии?',
    answer:
      'Все наши дверные ручки поставляются с пожизненной гарантией против производственных дефектов. Это покрывает структурную целостность ручки и отделку при нормальных условиях эксплуатации. Если у вас возникнут какие-либо проблемы, просто свяжитесь с нашей службой поддержки с данными вашего заказа и фотографиями проблемы. Мы отремонтируем или заменим изделие без дополнительной оплаты.',
  },
  {
    question: 'Сколько времени занимает доставка?',
    answer:
      'Стандартная доставка по континентальной части США занимает 5-7 рабочих дней. Экспресс-доставка (2-3 рабочих дня) доступна за дополнительную плату. Международная доставка варьируется в зависимости от местоположения, но обычно занимает 7-14 рабочих дней. Все заказы на сумму более $100 имеют право на бесплатную стандартную доставку.',
  },
  {
    question: 'Могу ли я вернуть или обменять товар, если не удовлетворен?',
    answer:
      'Конечно. Мы предлагаем 30-дневную политику возврата без хлопот на все неиспользованные товары в оригинальной упаковке. Просто инициируйте возврат через свой аккаунт или свяжитесь с нашей службой поддержки. Получив и проверив товар, мы обработаем ваш возврат в течение 5-7 рабочих дней.',
  },
  {
    question: 'Предоставляете ли вы услуги установки?',
    answer:
      'Хотя мы напрямую не предоставляем услуги установки, мы сотрудничаем с сетью сертифицированных установщиков в крупных metropolitan районах. Мы можем связать вас с профессионалом в вашем районе, или вы можете воспользоваться нашими подробными руководствами и видеоинструкциями по установке. Большинство наших ручек разработаны для простой установки стандартными инструментами.',
  },
];

const FAQ = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.faq-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-list',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="faq-heading">
            <span className="text-sm font-medium text-door-accent uppercase tracking-wider mb-4 block">
              Вопросы и ответы
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-door-black tracking-tight mb-6">
              Часто задаваемые{' '}
              <span className="relative inline-block">
                вопросы
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 160 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 6C50 2 110 2 158 6"
                    stroke="#d4af37"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-lg text-door-medium leading-relaxed mb-8">
              Найдите ответы на часто задаваемые вопросы о наших продуктах,
              доставке, гарантии и многом другом.
            </p>

            {/* Contact Card */}
            <div className="p-6 bg-door-light rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-door-accent/10 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-door-accent" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-door-black">
                    Остались вопросы?
                  </h3>
                  <p className="text-sm text-door-medium">
                    Мы здесь, чтобы помочь
                  </p>
                </div>
              </div>
              <button className="w-full py-3 bg-door-black text-white font-medium rounded-xl hover:bg-door-dark transition-colors duration-300">
                Связаться с поддержкой
              </button>
            </div>
          </div>

          {/* FAQ List */}
          <div className="faq-list space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className={`faq-item border rounded-2xl overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? 'border-door-accent bg-door-light/50'
                    : 'border-door-border bg-white hover:border-door-medium'
                }`}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-display font-semibold text-door-black pr-4">
                    {item.question}
                  </span>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === index
                        ? 'bg-door-accent text-white rotate-180'
                        : 'bg-door-light text-door-dark'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-cinematic ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-door-medium leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
