'use client';

import { useEffect, useRef, useState } from "react";

export function SlideInSection({ className, children }: { className?: string, children: React.ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{ threshold: 0.2 } // 20% do elemento precisa aparecer
		);

		if (node) {
			observer.observe(node);
		}

		return () => {
			observer.unobserve(node);
		};
	}, []);

	return (
		<section
			ref={ref}
			className={`${className} transition-all duration-700 ease-out transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
		>
			{children}
		</section>
	);
}
