import { IconChevronDown } from '@tabler/icons-react';
import { Title, Burger, Center, Container, Group, Menu, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../assets/css/HeaderMenu.module.css';
import Logo from '../assets/images/Logo.png'
import { useNavigate } from 'react-router-dom';

const links = [
  { link: '/about', label: 'About' },
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
          <Title
            order={2}
            style={{ fontWeight: 600, letterSpacing: "1px" }}
          >
            Fantastic
            <span style={{ color: "#228be6" }}>Five</span> Bank
          </Title>

          <Group gap={5} visibleFrom="sm">
            {items}
            {localStorage.getItem("cid")||localStorage.getItem("role")?
            <Button onClick={()=>{
              localStorage.clear();
              navigate("/")
            }}>Logout</Button>:null}
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