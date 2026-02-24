import React from 'react';

interface ApolloLogoProps {
    className?: string;
}

const ApolloLogo: React.FC<ApolloLogoProps> = ({ className }) => {
    return (
        <svg
            viewBox="0 0 200 60"
            className={className}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="apolloLogoTitle"
        >
            <title id="apolloLogoTitle">Apollo Logo</title>

            {/* APOLLO Text - Constructed from geometric paths for consistency across devices */}
            {/* A */}
            <path d="M25 40 L35 15 L45 40 M28 32 L42 32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {/* P */}
            <path d="M50 40 L50 15 L60 15 C66 15 66 27 60 27 L50 27" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {/* O */}
            <circle cx="85" cy="27.5" r="12.5" stroke="currentColor" strokeWidth="4" fill="none" />
            {/* L */}
            <path d="M105 15 L105 40 L117 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {/* L */}
            <path d="M125 15 L125 40 L137 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {/* O */}
            <circle cx="155" cy="27.5" r="12.5" stroke="currentColor" strokeWidth="4" fill="none" />

            {/* Sun/Crown Rays above the first O */}
            {/* Center Ray */}
            <line x1="85" y1="8" x2="85" y2="-2" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            {/* Left Ray */}
            <line x1="72" y1="11" x2="65" y2="4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            {/* Right Ray */}
            <line x1="98" y1="11" x2="105" y2="4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />

            {/* Underline */}
            <line x1="20" y1="52" x2="180" y2="52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
};

export default ApolloLogo;
