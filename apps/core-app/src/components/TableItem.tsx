import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { actions } from "astro:actions";
import { useState } from "react";
import { Button } from "./ui/button.tsx";
import { useQuery } from "@tanstack/react-query";

type Props = {
  items: Record<string, any>[];
};
export function TableItem({ items }: any) {
  console.log(items);
  const [page, setPage] = useState(1);
  const [enabled, setEnabled] = useState(false);

  if (!items) {
    console.log("object");
    return;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["quotes"],
    queryFn: () => actions.quotesAction.paginate({ page: 1 }),
    enabled,
  });

  const handleClick = () => {
    setEnabled(true);
  };

  const handleNext = () => setPage((p) => p * 1);

  const colums = Object.keys(items.data[0]);
  return (
    <div className="border rounded-lg">
      <Button onClick={() => handleNext}>load</Button>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            {colums.map((c) => (
              <TableHead key={c} className="w-[100px]">
                {c}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.data.map((item, k) => (
            <TableRow key={k}>
              {colums.map((c) => (
                <TableCell key={c} className="font-medium max-w-20 truncate">
                  {typeof item[c] === "object"
                    ? JSON.stringify(item[c])
                    : item[c]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
