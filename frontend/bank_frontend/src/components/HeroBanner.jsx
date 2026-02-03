import { Button, Container, Text, Title } from '@mantine/core';
import classes from '../assets/css/HeroImageRight.module.css';
import { useNavigate } from 'react-router-dom';


export function HeroBanner() {
    const navigate = useNavigate();
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Banking made {' '}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                simple, secure, and smart!
              </Text>{' '}
            </Title>

            <Text className={classes.description} mt={30} c={"white"}>
              Manage, grow, and protect your money with secure, intuitive tools built for everyday life.
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: 'pink', to: 'yellow' }}
              size="xl"
              className={classes.control}
              mt={40}
              onClick={()=>navigate('/login')}
            >
                View My Account
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}