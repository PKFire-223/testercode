// src/components/BannerCarousel.tsx
// Bùi Trương Nhật Quang 23521276
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

const { width } = Dimensions.get("window");

interface Props {
  images: string[];
  autoPlayInterval?: number;
}

export default function BannerCarousel({ images, autoPlayInterval = 3000 }: Props) {
  const scrollRef = useRef<ScrollView | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const timer = setInterval(() => {
      const nextIndex = (index + 1) % images.length;
      setIndex(nextIndex);
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [index, images, autoPlayInterval]);

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
      >
        {images.map((uri, idx) => (
          <Image key={idx} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>
      <View style={styles.dotsRow}>
        {images.map((_, idx) => (
          <View
            key={idx}
            style={[styles.dot, idx === index && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 160,
    marginBottom: 16,
  },
  image: {
    width,
    height: 160,
    resizeMode: "cover",
  },
  dotsRow: {
    position: "absolute",
    bottom: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  dotActive: {
    backgroundColor: "#fff",
  },
});
