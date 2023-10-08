import { Overlay, Container, Button, Text} from '@mantine/core';
import classes from '../styles/landing/HeroBanner.module.css';
import '@mantine/core/styles.css';


export function HeroContentLeft() {
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
      </Container>
    </div>
  );
}