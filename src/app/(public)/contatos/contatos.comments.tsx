"use client";

import { SlideInSection } from "@/components/shared/animation/slidein";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatarStringDate } from "@/utils/format";
import { Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { FAKE_COMMENTS } from "@/lib/constants";

export default function ContatoComments() {
	const isMobile = useIsMobile();
	const commentsToShow = isMobile ? FAKE_COMMENTS.slice(0, 4) : FAKE_COMMENTS;

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 gap-6">
			{commentsToShow.map((comment, index) => (
				<SlideInSection key={index}>
					<div className="flex items-start gap-4 bg-zinc-900 p-4 rounded-xl cursor-pointer">
						<Image
							src="/images/icognito_user.webp"
							width={50}
							height={50}
							alt={comment.user.name}
							className="w-10 h-10 rounded-full object-cover"
						/>
						<div className="flex-1">
							<div className="flex justify-between items-center">
								<span className="font-semibold">{comment.user.name}</span>
								<span className="text-sm text-zinc-400">{formatarStringDate(comment.date)}</span>
							</div>
							<div className="flex items-center gap-1 text-yellow-400 mb-1">
								{Array.from({ length: Math.floor(comment.rating) }, (_, i) => (
									<Star key={i} size={16} fill="currentColor" />
								))}
							</div>
							<p className="text-zinc-300">{comment.text}</p>
							<div className="flex items-center gap-4 mt-2 text-zinc-400 text-sm">
								<button className="flex items-center gap-1 hover:text-white">
									<ThumbsUp size={16} /> {comment.likes}
								</button>
							</div>
						</div>
					</div>
				</SlideInSection>
			))}
		</div>
	);
}