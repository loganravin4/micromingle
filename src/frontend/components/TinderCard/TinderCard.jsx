import React from 'react';
import './TinderCard.css';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';

const TinderCard = ({image, color}) => {
    const motionValue = useMotionValue(0); // move the card
    const rotateValue = useTransform(motionValue, [-200, 200], [-50, 50]); // rotate effect

    const opacityValue = useTransform(motionValue, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]); // gradually change opacity to 0 when dragged left or right / at center opacity
    const animationControls = useAnimation();

    return (
        <motion.div 
            className='card' 
            style={{
                backgroundColor: color, 
                backgroundImage: `url(${image})`, 
                x: motionValue, 
                rotate: rotateValue, 
                opacity: opacityValue}} 
            drag="x" 
            dragConstraints={{left: -1000, right: 1000}}
            onDragEnd={(event, info) => {
                if (Math.abs(info.point.x) <= 150) {
                    animationControls.start({x: 0});
                }
                else {
                    animationControls.start({x: info.point.x < 0 ? -200 : 200});
                }
            }}
            animate={animationControls}
        />
    );
};

export default TinderCard;