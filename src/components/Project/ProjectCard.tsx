'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { cn } from "@/lib/utils"

type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  className?: string;
};

export default function ProjectCard({ title, description, tags, image, link,className }: ProjectCardProps) {
  return (
    <div className='w-full gradient-container h-screen'>
        
    </div>
  )
}
