import { IconChevronDown } from '@tabler/icons-react';
import { Burger, Center, Container, Group, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../assets/css/HeaderMenu.module.css';
import Logo from '../assets/images/Logo.png'
import { useNavigate } from 'react-router-dom';

const links = [
  { link: '/about', label: 'About' },
  {
    link: '#2',
    label: 'Switch User',
    links: [
      { link: '/account_management', label: 'Customer' },
      { link: '/customer_service', label: 'Customer Service' },
      { link: '/loan_management', label: 'Loan Officer'},
      { link: '/forums', label: 'Bank Manager'},
    ],
  },
];

export function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link} onClick={()=>navigate(item.link)}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              className={classes.link}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={14} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        className={classes.link}
        onClick={()=>navigate(link.link)}
      >
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <img
            src={Logo}
            alt="Logo"
            style={{ height: 50 }}
            onClick={()=>navigate('/')}
            />

          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            hiddenFrom="sm"
            aria-label="Toggle navigation"
          />
        </div>
      </Container>
    </header>
  );
}