import { Card, Grid, Row, Text } from "@nextui-org/react";
import { useRouter } from 'next/router'


type Program = {
  id: string;
  title: string;
  posterUrl: string;
  releaseYear: number;
};

type ProgramCardProps = {
  programs: Program[];
};
export default function ProgramCard({ programs }: ProgramCardProps) {
  const router = useRouter();
  return (
    <Grid.Container gap={2} justify="flex-start">
      {programs.map((item, index) => (
        <Grid xs={6} sm={3} key={index}>
          <Card isPressable onClick={() => router.push(`/title/${item.id}`)}>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src={item.posterUrl}
                objectFit="cover"
                width="100%"
                height={140}
                alt={item.title}
              />
            </Card.Body>
            <Card.Footer css={{ justifyItems: "flex-start" }}>
              <Row wrap="wrap" justify="space-between" align="center">
                <Text b>{item.title}</Text>
                <Text
                  css={{
                    color: "$accents7",
                    fontWeight: "$semibold",
                    fontSize: "$sm",
                  }}
                >
                  {item.releaseYear}
                </Text>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  );
}
