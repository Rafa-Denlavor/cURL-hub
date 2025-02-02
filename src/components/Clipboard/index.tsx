import { IconCopy } from '@tabler/icons-react';
import { Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';

export function ClipBoard({ text} : { text: string}) {
  const clipboard = useClipboard();
  return (
    <Tooltip
      label="cURL copiado!"
      offset={5}
      position="bottom"
      radius="xl"
      transitionProps={{ duration: 100, transition: 'slide-down' }}
      opened={clipboard.copied}
    >
     <IconCopy onClick={() => clipboard.copy(text)} />
    </Tooltip>
  );
}