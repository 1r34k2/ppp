import { useState, useEffect, useRef } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styles from "@/styles/Card.module.css" 
import RoundButton from "./RoundButton"
import { useTransform,useMotionValue, stagger, motion, AnimatePresence, delay } from "framer-motion";
import Image from "next/image";
import {gsap} from "gsap";
export default function Card() {
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [count, setCount] = useState(0);
    const [drag, setDrag] = useState(false);
    const images = [
        {
            id:1,
            src:"/irek.jpg"
        },
        {
            id:2,
            src:"/irek1.jpg"
        }
    ]
    const [visible, setVisible] = useState(true);
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    const handleClick = () => {
        if(count + 1 > images.length - 1){
            setCount(0);
        }
        else{
            setCount(count + 1);
        }
        
    }
    const [toOrigin, setToOrigin] = useState(true);
    return(
        <div className={styles.fullCard}>
        <AnimatePresence>
            {visible && <motion.div initial={{ opacity: 0, scale: 0.75 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }} className={styles.card} drag = {true} style={{
                rotate,
                x
            }} dragSnapToOrigin={toOrigin} onTap={!drag && handleClick} whileDrag={{ cursor: "grabbing"}} onDragStart={(e) => {setStartX(e.x) 
                setStartY(e.y)
                setDrag(true)}} onDragEnd={
                (e) => {
                    if(e.x - startX >= 200){
                        setToOrigin(false)
                        console.log("right")
                        setVisible(false)
                    }
                    else if(e.x - startX <= -200){
                        setToOrigin(false)
                        console.log("left")
                        setVisible(false)
                    }
                    else if(e.y - startY < -200){
                        setToOrigin(false)
                        console.log("top")
                        setVisible(false)
                    }
                    setDrag(false)
                }
            } >
                <Image className={styles.image} width={200} height="500" src={images[count].src}/>
            </motion.div>}
        </AnimatePresence>
            <div className={styles.buttons}>
                <RoundButton className={styles.button}  text="✔" color="green"/>
                <RoundButton className={styles.button}  text="✖" color= "red"/>
                </div> 
        </div> 
    )
}