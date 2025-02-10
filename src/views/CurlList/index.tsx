import React, { useEffect, useState } from "react";
import classes from "./Curl.module.css";
import { SortableAccordion } from "@/components/SortableAccordion";
import { IconBrowserPlus } from "@tabler/icons-react";
import {
  Modal,
  Button,
  Fieldset,
  TextInput,
  Select,
  Textarea,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { decryptData, encryptData } from "@/helpers/encryption";

export function CurlList() {
  const [curlCreated, setCurlCreated] = useState(false);
  const [noTransitionOpened, setNoTransitionOpened] = useState(false);
  const [curls, setCurls] = useState([]);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      projectName: "",
      environment: "",
      command: "",
      archived: false,
    },
    validate: {},
  });

  useEffect(() => {
    async function getCurls() {
      const curlsEncrypted = JSON.parse(
        localStorage.getItem("curlCommands") as string
      );

      if (curlsEncrypted) {
        const curls = await decryptData(curlsEncrypted);

        setCurls(curls);
      }
    }

    getCurls();
  }, [curlCreated]);

  return (
    <main className={classes.curlListWrapper}>
      <header className={classes.curlHeader}>
        <h1>Comandos cURL</h1>
        <Modal
          opened={noTransitionOpened}
          onClose={() => setNoTransitionOpened(false)}
          title="Adicione um novo comando cURL"
          size="lg"
          transitionProps={{ transition: "rotate-left" }}
          centered
          closeOnClickOutside={false}
        >
          <form>
            <Fieldset variant="filled">
              <TextInput
                label="Nome"
                description="O que ele deve fazer?"
                withAsterisk
                placeholder="Buscar relatórios"
                key={form.key("name")}
                {...form.getInputProps("name")}
              />
              <TextInput
                label="Projeto associado"
                description="Projeto na qual ele faz a referência"
                placeholder="Dashboard ou dashboard-web"
                mt="md"
                key={form.key("projectName")}
                {...form.getInputProps("projectName")}
              />
              <Select
                label="Em qual ambiente será utilizado?"
                description="Para auxiliar na identificão do comando"
                placeholder="Selecione o ambiente"
                data={[
                  // "LOCAL",
                  "DEVELOPMENT",
                  "STAGING",
                  "HOMOLOG",
                  "PRODUCTION",
                ]}
                mt="md"
                key={form.key("environment")}
                {...form.getInputProps("environment")}
              />
              <Textarea
                label="Cole o comando:"
                description="Insira um cURL válido"
                withAsterisk
                placeholder='curl -X GET "https://api.exemplo.com/dados" -H "Authorization: Bearer SEU_TOKEN"'
                mt="md"
                autosize
                minRows={3}
                maxRows={5}
                key={form.key("command")}
                {...form.getInputProps("command")}
              ></Textarea>
            </Fieldset>
            <Center>
              <Button
                type="submit"
                color="black"
                mt="lg"
                onClick={async (event) => {
                  event.preventDefault();
                  const curlCurrent = form.getValues();

                  if (curls.length === 0) {
                    localStorage.setItem(
                      "curlCommands",
                      await encryptData([curlCurrent])
                    );
                    setCurls([curlCurrent] as any);
                  } else {
                    localStorage.setItem(
                      "curlCommands",
                      await encryptData([...curls, form.getValues()])
                    );
                    setCurls(
                      (preventDefault) =>
                        [...preventDefault, curlCurrent] as any
                    );
                  }

                  form.reset();
                  setCurlCreated(true);
                  setNoTransitionOpened(false);
                }}
              >
                Adicionar cURL
              </Button>
            </Center>
          </form>
        </Modal>

        <Button
          color="black"
          className={classes.newCurlButton}
          onClick={() => setNoTransitionOpened(true)}
        >
          <IconBrowserPlus />
          <p>Novo comando cURL</p>
        </Button>
      </header>
      <section className={classes.curls}>
        {curls.length > 0 ? (
          curls.map(
            (curlDetail: {
              id?: string;
              name: string;
              projectName?: string;
              environment?: string;
              command: string;
            }) => {
              return (
                <SortableAccordion key={curlDetail.name} {...curlDetail} />
              );
            }
          )
        ) : (
          <p>Hey, que tal adicionar o seu primeiro comando cURL?</p>
        )}
      </section>
    </main>
  );
}
