"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLMotionProps, motion } from "motion/react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border font-mono text-sm leading-none tracking-[0.08em] whitespace-nowrap uppercase outline-none select-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: {
                solid: "border-primary bg-primary text-primary-foreground hover:bg-primary/85",
                outline: "border-primary bg-transparent text-primary hover:bg-muted",
                ghost: "border-transparent bg-transparent text-foreground hover:bg-muted",
                link: "border-transparent bg-transparent px-0 text-foreground underline-offset-4 hover:underline",
            },
            size: {
                default: "h-11 px-6",
                sm: "h-9 px-4",
                icon: "size-11",
            },
        },
        defaultVariants: { variant: "solid", size: "default" },
    },
);

const feel = {
    whileHover: { y: -2 },
    whileTap: { y: 0, scale: 0.96 },
    transition: { type: "spring" as const, stiffness: 500, damping: 28, mass: 0.6 },
};

type Variants = VariantProps<typeof buttonVariants>;

function ButtonLink({ className, variant, size, ...props }: HTMLMotionProps<"a"> & Variants) {
    return (
        <motion.a
            data-slot="button"
            className={cn(buttonVariants({ variant, size }), className)}
            {...feel}
            {...props}
        />
    );
}

function Button({ className, variant, size, ...props }: ButtonPrimitive.Props & Variants) {
    return (
        <ButtonPrimitive
            data-slot="button"
            render={<motion.button {...feel} />}
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        />
    );
}

export { Button, ButtonLink, buttonVariants };
