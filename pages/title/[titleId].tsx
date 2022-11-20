import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Table } from "@nextui-org/react";

export default function Title() {
  const router = useRouter();
  const { titleId } = router.query;
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (titleId) {
        const BASE_URL = "https://api.coffeecode.nl";
        const API_URL = `${BASE_URL}/title/${titleId}`;
        const rawResponse = await fetch(API_URL);
        const response = await rawResponse.json();
        setData(response);
      }
    };
    fetchData();
  }, [titleId]);
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
        <Table.Column>Type</Table.Column>
        <Table.Column>Service</Table.Column>
      </Table.Header>
      <Table.Body>
        {data
          // .filter((item: any) => item && item.length > 0)
          .map((item: any, key) => {
            const offerItemArray: any = [].concat(...item.offers);
            return offerItemArray
              // .filter(
              //   (offerItem: any) =>
              //     offerItem && offerItem.length > 0
              // )
              .map((offerItem: any, key2: number) => {
                console.log("__offer_item_array", offerItem);
                return (
                  <Table.Row key={key2}>
                    <Table.Cell>{item.country}</Table.Cell>
                    <Table.Cell>{offerItem.monetizationType}</Table.Cell>
                    <Table.Cell>{offerItem.package.clearName}</Table.Cell>
                  </Table.Row>
                );
              });
          })}
      </Table.Body>
    </Table>
  );
}
