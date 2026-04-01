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

type Props = {
  items: Record<string, any>[];
};
export function TableItem({ items }: Props) {
  if (!items) {
    console.log("object");
    return;
  }
  const colums = Object.keys(items[0]);
  return (
    <div className="border rounded-lg">
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
          {items.map((item, k) => (
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
