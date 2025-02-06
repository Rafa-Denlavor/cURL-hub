import React, { useState } from 'react';
import {
  IconArchive,
  IconHomeCog,
  IconSwitchHorizontal,
  IconTrolley,
} from '@tabler/icons-react';
import { Code, Group } from '@mantine/core';
import classes from './Navbar.module.css';
import Image from 'next/image';

const data = [
  { link: '', label: "Visão geral", icon: IconHomeCog },
  { link: '', label: "Categorias", icon: IconTrolley },
  { link: '', label: 'Arquivados', icon: IconArchive },
  // { link: '', label: 'Security', icon: IconFingerprint },
  // { link: '', label: 'SSH Keys', icon: IconKey },
  // { link: '', label: 'Databases', icon: IconDatabaseImport },
  // { link: '', label: 'Authentication', icon: Icon2fa },
  // { link: '', label: 'Other Settings', icon: IconSettings },
];

export function Navbar() {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Image src="/images/logo.png" alt="Logo da cURL Hub" width={200} height={60} />
          <Code fw={700}>v3.1.2</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <Code fw={700}>v3.1.2</Code>
      </div>
    </nav>
  );
}