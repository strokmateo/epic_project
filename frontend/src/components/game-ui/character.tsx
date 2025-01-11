import { useRef, useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export default function Character({
    imageSrc,
    scale = 1,
    className,
}: {
    imageSrc: string;
    scale?: number;
    className?: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const img = new Image();
        img.src = imageSrc;

        console.log("Image source:", img.src); // Debug log for image source

        const handleLoad = () => {
            console.log("Image loaded:", img.src); // Debug log for successful load

            // Calculate scaled dimensions
            const scaledWidth = img.width * scale;
            const scaledHeight = img.height * scale;

            // Update canvas dimensions dynamically
            setDimensions({ width: scaledWidth, height: scaledHeight });
            setImageLoaded(true); // Indicate the image is ready to draw

            console.log("Scaled dimensions:", scaledWidth, scaledHeight);
        };

        img.onload = handleLoad;

        img.onerror = () => {
            console.error("Failed to load image:", img.src);
        };

        // Cleanup function
        return () => {
            img.onload = null;
        };
    }, []);

    useEffect(() => {
        // Draw the image only after it's loaded
        if (!imageLoaded) return;

        const canvas = canvasRef.current;
        if (!canvas) {
            console.error("Canvas element not found");
            return;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error("Failed to get 2D context");
            return;
        }

        console.log("Drawing image to canvas..."); // Debug log before drawing

        // Clear the canvas
        ctx.clearRect(0, 0, dimensions.width, dimensions.height);

        // Draw the scaled image
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
            console.log("Image successfully drawn to canvas");
        };
    }, [imageLoaded]);

    return (
        <canvas
            ref={canvasRef}
            width={dimensions.width || 300}
            height={dimensions.height || 300}
            className={cn(className)}
        />
    );
}
