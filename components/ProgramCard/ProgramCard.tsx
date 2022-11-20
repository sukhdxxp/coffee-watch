import { Card, Text } from "@nextui-org/react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

type Program = {
  id: string;
  title: string;
  releaseYear: number;
};

type ProgramCardProps = {
  program: Program;
};
export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Link href={`/title/${program.id}`} className={styles.programCard}>
      <Card isPressable isHoverable variant="bordered" css={{ mw: "400px" }}>
        <Card.Body>
          <Text>
            {program.title} <span>({program.releaseYear})</span>
          </Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
