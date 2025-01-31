import React from 'react';
import './TinderCard.css';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';

const TinderCard = ({ image, color, text, onSwipeRight }) => {
    const motionValue = useMotionValue(0);
    const rotateValue = useTransform(motionValue, [-200, 200], [-50, 50]);
    const opacityValue = useTransform(motionValue, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
    const animationControls = useAnimation();

    return (
        <motion.div
            className="tinder-card"
            style={{
                backgroundColor: color,
                backgroundImage: `url(${image})`,
                x: motionValue,
                rotate: rotateValue,
                opacity: opacityValue,
            }}
            drag="x"
            dragConstraints={{ left: -1000, right: 1000 }}
            onDragEnd={(event, info) => {
                if (Math.abs(info.offset.x) <= 150) {
                    animationControls.start({ x: 0 });
                } else {
                    const direction = info.offset.x > 0 ? 1000 : -1000;
                    animationControls.start({ x: direction }).then(() => {
                        if (direction > 0 && onSwipeRight) {
                            onSwipeRight();
                        }
                    });
                }
            }}
            animate={animationControls}
        >
            <div className="tinder-card-text">{text}</div>
        </motion.div>
    );
};

export default TinderCard;
