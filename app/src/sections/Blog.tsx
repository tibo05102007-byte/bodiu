import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const posts = [
    {
        id: 1,
        title: 'Minimalism in Modern Door Hardware',
        category: 'Trends',
        date: 'Oct 24, 2024',
        image: '/images/modern-minimalist.jpg',
        excerpt: 'How reducing complexity elevates spatial experience.',
        isFeature: true
    },
    {
        id: 2,
        title: 'The Art of Brass Patina',
        category: 'Materials',
        date: 'Nov 02, 2024',
        image: '/images/brass-handle.jpg',
        excerpt: 'Why living finishes are making a comeback in luxury interiors.',
        isFeature: false
    },
    {
        id: 3,
        title: 'Smart Locks vs Traditional Purity',
        category: 'Technology',
        date: 'Nov 15, 2024',
        image: '/images/smart-handle.jpg',
        excerpt: 'Finding the balance between convenience and aesthetics.',
        isFeature: false
    }
];

const Blog = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [hoveredPost, setHoveredPost] = useState<number | null>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
            }
        });

        tl.fromTo('.blog-feature',
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }
        )
            .fromTo('.blog-list-item',
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
                '-=0.8'
            );

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="blog" className="relative w-full py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <span className="text-sm font-medium text-door-accent uppercase tracking-wider mb-2 block">Journal</span>
                        <h2 className="font-display text-4xl sm:text-5xl font-bold text-door-black">Design <span className="text-door-medium serif italic">Notes</span></h2>
                    </div>
                    <a href="/blog" className="hidden sm:flex items-center gap-2 font-medium hover:text-door-accent transition-colors">
                        View all stories <ArrowUpRight className="w-4 h-4" />
                    </a>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 h-auto lg:h-[600px]">
                    {/* Feature Post */}
                    <div className="lg:col-span-7 h-full">
                        {posts.filter(p => p.isFeature).map(post => (
                            <div
                                key={post.id}
                                className={`blog-feature relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer transition-opacity duration-300 ${hoveredPost && hoveredPost !== post.id ? 'opacity-40' : 'opacity-100'}`}
                                onMouseEnter={() => setHoveredPost(post.id)}
                                onMouseLeave={() => setHoveredPost(null)}
                            >
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

                                <div className="absolute bottom-0 left-0 p-8 sm:p-12 w-full">
                                    <div className="flex items-center gap-4 mb-4 text-white/80 text-sm">
                                        <span className="uppercase tracking-wider">{post.category}</span>
                                        <span>•</span>
                                        <span>{post.date}</span>
                                    </div>
                                    <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 leading-tight group-hover:underline decoration-1 underline-offset-4">{post.title}</h3>
                                    <p className="text-white/80 max-w-lg mb-6 line-clamp-2">{post.excerpt}</p>

                                    <span className="inline-flex items-center gap-2 text-white font-medium">Read Article <ArrowUpRight className="w-4 h-4" /></span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Secondary List */}
                    <div className="lg:col-span-5 flex flex-col gap-6 h-full">
                        {posts.filter(p => !p.isFeature).map(post => (
                            <div
                                key={post.id}
                                className={`blog-list-item flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-door-light hover:bg-white border border-transparent hover:border-gray-100 shadow-sm hover:shadow-card transition-all duration-300 cursor-pointer h-1/2 justify-center ${hoveredPost && hoveredPost !== post.id ? 'opacity-40' : 'opacity-100'}`}
                                onMouseEnter={() => setHoveredPost(post.id)}
                                onMouseLeave={() => setHoveredPost(null)}
                            >
                                <div className="w-full sm:w-1/3 aspect-video sm:aspect-square rounded-xl overflow-hidden shrink-0">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-2 text-xs font-medium text-door-medium uppercase tracking-wider">
                                        <span>{post.category}</span>
                                        <span>•</span>
                                        <span>{post.date}</span>
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-door-black mb-2 leading-tight group-hover:text-door-accent transition-colors">{post.title}</h3>
                                    <p className="text-sm text-door-dark/70 line-clamp-2">{post.excerpt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blog;
