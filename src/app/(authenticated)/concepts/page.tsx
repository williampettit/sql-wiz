"use client";

import { useRouter } from "next/navigation";

import { SQL_CONCEPTS } from "@/data/sql-concepts";

import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ConceptsPage() {
  const router = useRouter();

  return (
    <Page
      title="Concepts"
      description="Learn about the concepts that are used in SQL."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Concept</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {SQL_CONCEPTS.map((concept) => (
            <TableRow key={concept.name}>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(`/question-generator?concept=${concept.name}`)
                  }
                >
                  Generate
                </Button>
              </TableCell>
              <TableCell>{concept.name}</TableCell>
              <TableCell>{concept.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Page>
  );
}
