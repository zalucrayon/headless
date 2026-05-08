'use client';
import CountUp from "react-countup";
 
import Slider, { SliderItem } from "@/element/common/Slider";
import ShowGoToTop  from "./scrolltotop";
import { motion } from "framer-motion";
import Link from "next/link";
import VideoModal from "./videoModal";  
import { CircularProgressBar } from "react-percentage-bar";
// import "react-percentage-bar/dist/index.css";
import ImageModal from "./imageModal";
 
const MotionDiv = motion.div;
const MotionSpan = motion.span;
const MotionA = motion.a;
const MotionH1 = motion.h1;
const MotionH2 = motion.h2;
const MotionH3 = motion.h3;
const MotionH4 = motion.h4;
const MotionH5 = motion.h5;
const MotionH6 = motion.h6;
const MotionP = motion.p;
const MotionLink = motion(Link); 

export {
    CountUp,
    CircularProgressBar,
    
    MotionDiv,
    MotionSpan,
    MotionA,
    MotionH1,
    MotionH2,
    MotionH3,
    MotionH4,
    MotionH5,
    MotionH6,
    MotionP,
    MotionLink,
    
    Slider,
    SliderItem,
    VideoModal,
    ImageModal,
    ShowGoToTop,  
};


