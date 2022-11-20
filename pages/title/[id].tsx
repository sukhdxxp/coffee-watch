import { useRouter } from "next/router";
import { Table } from "@nextui-org/react";
import { TitleResponse } from "../../lib/types";
import useSwr from "swr";
import Image from "next/image";

import styles from "../../styles/Home.module.css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Title() {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useSwr<TitleResponse>(
    router.query.id ? `/api/title/${id}` : null,
    fetcher
  );

  const items = data?.data || [];
  return (
    <Table
      aria-label="Example table with static content"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <Table.Header>
        <Table.Column>Country</Table.Column>
        <Table.Column>Service</Table.Column>
      </Table.Header>
      <Table.Body>
        {items.map((item, key) => {
          return (
            <Table.Row key={key}>
              <Table.Cell>
                <img
                  src={item.countryIcon}
                  alt={item.country}
                  className={styles.itemIcon}
                />
              </Table.Cell>
              <Table.Cell>{item.services}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
