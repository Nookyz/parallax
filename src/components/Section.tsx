/* eslint-disable no-mixed-operators */
/* eslint-disable consistent-return */
import {
  FC, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';
import {
  motion, useViewportScroll, useTransform,
} from 'framer-motion';
import { TransformOptions } from 'framer-motion/types/utils/transform';

export enum Content {
  Left,
  Right,
}

export enum Color {
  White = '#fff',
  Black = '#000',
}

interface Props {
  bg: string;
  image: string;
  content: Content;
  color?: Color;
}

const Box: FC<Props> = ({
  bg, content, image, color = Color.Black,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollY } = useViewportScroll();

  const [elementTop, setElementTop] = useState(0);
  const [elementHeight, setElementHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const setValues = () => {
      if (ref.current) {
        setElementTop(ref.current.offsetTop);
        setElementHeight(ref.current.offsetTop + ref.current.offsetHeight - window.innerHeight);
        setClientHeight(window.innerHeight);
      }
    };

    setValues();
    document.addEventListener('load', setValues);
    window.addEventListener('resize', setValues);

    return () => {
      document.removeEventListener('load', setValues);
      window.removeEventListener('resize', setValues);
    };
  }, [ref]);

  const triggerPoint = 0.5;

  const transformInitialValue = elementTop - clientHeight * triggerPoint;
  const transformFinalValue = elementHeight;

  const yImageRange = [
    transformInitialValue,
    (transformInitialValue + transformFinalValue) / 2 - (window.innerHeight / 5),
    (transformInitialValue + transformFinalValue) / 2 + (window.innerHeight / 3),
    transformFinalValue,
  ];

  const yTextRange = [
    transformInitialValue,
    (transformInitialValue + transformFinalValue) / 2 - (window.innerHeight / 4),
    (transformInitialValue + transformFinalValue) / 2 + (window.innerHeight / 2),
    transformFinalValue * 1.2,
  ];

  const easing = [0.22, 0, 0.58, 1] as TransformOptions<number>;

  const textTranslate = ['100%', '0%', '0%', '-100%'] as unknown as number[];

  const textY = useTransform(scrollY, yTextRange, textTranslate, easing);

  const imageTranslate = ['300%', '0%', '0%', '-300%'] as unknown as number[];

  const imageY = useTransform(scrollY, yImageRange, imageTranslate);

  const imageOpacity = useTransform(
    scrollY,
    yImageRange,
    [0, 1, 1, 0],
  );

  const textOpacity = useTransform(
    scrollY,
    yTextRange,
    [0, 1, 1, 0],
  );

  // useEffect(() => {
  //   scrollYProgress.onChange((v) => console.log('scrollYProgress', v));
  // }, [scrollYProgress]);

  useEffect(() => {
    scrollY.onChange((v) => console.log('scrollY', v));
  }, [scrollY]);

  return (
    <Section ref={ref} background={bg}>
      <Wrapper>
        <Container content={content}>
          <ContentWrap
            // animate={controls}
            // variants={variants2}
            // initial="hidden"
            // transition={{ duration: 2 }}
            // ref={boxRef}
            style={{
              y: textY,
              opacity: textOpacity,
            }}
            // animate={inView ? 'visible' : 'hidden'}
            // variants={variants}
            // transition={{ duration: 1, ease: 'easeOut' }}
            color={color}
          >
            <h2>
              Subtitle here.
            </h2>
            <h1>
              Home 2 Title here. Lorem ipsum dolor sit amet, consectetur adip.
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo.
            </p>
          </ContentWrap>
          <ParallaxBoxWrapper>
            <ParallaxBox
              style={{
                y: imageY,
                opacity: imageOpacity,
              }}
              src={image}
            />
          </ParallaxBoxWrapper>
        </Container>
      </Wrapper>
    </Section>
  );
};

const Section = styled.div<{ background: string }>`
  background: ${({ background }) => background};
  height: 200vh;
`;

const Wrapper = styled.div`
  padding: 0 50px;
  position: sticky;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  top: 0px;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const Container = styled.div<{ content: Content }>`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: ${({ content }) => content === Content.Left ? 'row' : 'row-reverse'};
  justify-content: space-between;
`;

const ContentWrap = styled(motion.div)<{ color: Color }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30vw;
  color: ${({ color }) => color};
`;

const ParallaxBoxWrapper = styled(motion.div)`

`;

const ParallaxBox = styled(motion.img)`
`;

export default Box;
