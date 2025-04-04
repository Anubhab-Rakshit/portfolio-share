"use client"

import { useRef, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useSpring } from "@react-spring/three"
import * as THREE from "three"

export function use3DAnimation(initialDelay = 0) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Animation for scale and rotation
  const { scale, rotation } = useSpring({
    scale: clicked ? 1.2 : hovered ? 1.1 : 1,
    rotation: hovered ? [0, THREE.MathUtils.degToRad(45), 0] : [0, 0, 0],
    config: { mass: 1, tension: 170, friction: 26 },
  })

  // Floating animation
  useFrame((state) => {
    if (!meshRef.current || !isVisible) return

    const t = state.clock.getElapsedTime()
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.1
  })

  // Delayed appearance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, initialDelay)

    return () => clearTimeout(timer)
  }, [initialDelay])

  return {
    meshRef,
    hovered,
    clicked,
    isVisible,
    scale,
    rotation,
    setHovered,
    setClicked,
  }
}

