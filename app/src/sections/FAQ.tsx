import { useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const faqs = [
  {
    question: 'Как ухаживать за покрытием?',
    answer: 'Наши покрытия созданы для долгой службы. Для латуни без лака со временем появляется естественная патина. Чтобы сохранить блеск, используйте качественную полироль для металла. Для лакированных и гальванических покрытий достаточно протирать их мягкой влажной тканью.'
  },
  {
    question: 'Подходят ли ручки к стандартным дверям?',
    answer: 'Да, все наши ручки совместимы со стандартными дверными подготовками. Мы предоставляем крепеж как для обычных межкомнатных защелок, так и для магнитных замков.'
  },
  {
    question: 'Каковы сроки доставки?',
    answer: 'Товары в наличии отправляются в течение 24 часов. Доставка по Алматы занимает 1-2 дня, в другие регионы Казахстана — от 3 до 7 дней.'
  },
  {
    question: 'Есть ли специальные условия для дизайнеров?',
    answer: 'Конечно. Мы сотрудничаем с архитекторами, дизайнерами и застройщиками, предлагая специальные цены и образцы. Свяжитесь с нами для открытия партнерского аккаунта.'
  },
  {
    question: 'Входит ли крепеж в комплект?',
    answer: 'Каждый комплект ручек поставляется со всем необходимым для монтажа: саморезы, стяжки, квадратный стержень и шестигранник. Инструкция по установке также прилагается.'
  }
];

const FAQItem = ({ item, isOpen, onClick }: { item: typeof faqs[0], isOpen: boolean, onClick: () => void }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(contentRef.current, { height: 'auto', duration: 0.6, ease: 'elastic.out(1, 0.75)' });
      gsap.to(contentRef.current, { opacity: 1, duration: 0.3, delay: 0.1 });
    } else {
      gsap.to(contentRef.current, { height: 0, duration: 0.4, ease: 'power3.out' });
      gsap.to(contentRef.current, { opacity: 0, duration: 0.2 });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onClick}
        className="w-full py-8 flex items-center justify-between text-left group"
      >
        <span className="text-xl font-display font-medium text-door-black group-hover:text-door-accent transition-colors">{item.question}</span>
        <span className={`relative flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 transition-colors duration-300 group-hover:border-door-accent group-hover:bg-door-accent group-hover:text-white ${isOpen ? 'bg-door-black text-white border-door-black' : 'text-door-dark'}`}>
          <Plus className={`w-4 h-4 transition-transform duration-500 ${isOpen ? 'rotate-45' : 'rotate-0'}`} />
        </span>
      </button>
      <div
        ref={contentRef}
        className="h-0 overflow-hidden opacity-0"
      >
        <div className="pb-8 text-door-medium leading-relaxed max-w-2xl">
          {item.answer}
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative w-full py-32 bg-door-light overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4">
            <span className="text-sm font-medium text-door-accent uppercase tracking-wider mb-4 block">Помощь</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-door-black mb-6">Частые <br />Вопросы</h2>
            <p className="text-door-medium mb-8">Не нашли то, что искали? Свяжитесь с нашей службой поддержки для консультации.</p>

            <a
              href="https://wa.me/77074209510"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-white border border-gray-200 rounded-full font-medium text-door-black hover:bg-door-black hover:text-white transition-all shadow-sm"
            >
              Связаться с нами
            </a>
          </div>

          <div className="lg:col-span-8">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                item={faq}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
