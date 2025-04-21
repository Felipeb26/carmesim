"use client"

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AutoCarousel({ images, time = 4000}: { images: string[], time?: number }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, time);
        return () => clearInterval(interval);
    }, [images.length, time]);

    if (!images || images.length === 0) {
        return (
            <div className="w-[300px] aspect-square flex items-center justify-center">
                <span className="text-gray-400 text-xs">Sem imagem</span>
            </div>
        );
    }

    return (
        <div className="relative w-full aspect-square">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <Image
                        src={image}
                        alt={'Carousel image'}
                        width={240}
                        height={240}
                        className="w-full aspect-square rounded-sm"
                        priority={index === 0}
                    />
                </div>
            ))}
        </div>
    );
};
