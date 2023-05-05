import { useState, useEffect } from "react";
import {motion} from "framer-motion"
export default function RoundButton({className,text,color}) {
    return (
        <motion.div whileHover={{scale: 1.1}}  className={className}>
            <h1 style={{color:color}}>{text}</h1>
        </motion.div>
    )
}