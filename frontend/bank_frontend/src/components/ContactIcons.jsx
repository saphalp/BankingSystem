import { IconAt, IconMapPin, IconPhone, IconSun } from '@tabler/icons-react';
import { Stack, Text, ThemeIcon } from '@mantine/core';
import classes from '../assets/css/ContactIcons.module.css';


function ContactIcon({ icon: Icon, title, description, ...others }) {
  return (
    <div className={classes.wrapper} {...others}>
      <ThemeIcon size={40} radius="md" className={classes.icon}>
        <Icon size={24} />
      </ThemeIcon>

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

const MOCKDATA = [
  { title: 'Email', description: 'nattu@steeples.glen', icon: IconAt },
  { title: 'Phone', description: '+49 (800) 335 35 35', icon: IconPhone },
  { title: 'Address', description: '844 Morris Park avenue', icon: IconMapPin },
  { title: 'Working hours', description: '8 a.m. – 11 p.m.', icon: IconSun },
];

export function ContactIconsList() {
  const items = MOCKDATA.map((item, index) => <ContactIcon key={index} {...item} />);
  return <Stack>{items}</Stack>;
}