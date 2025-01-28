import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { EmployeeType } from "@/lib/types"
import { PenBox, Trash } from "lucide-react"
import { DeleteEmployeeModal } from "./DeleteEmployeeModal"
import { Button } from "../ui/button"


interface EmployeeTableProps {
    data: Partial<EmployeeType>[]
}

export function EmployeeTable({ data }: EmployeeTableProps) {
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return "N/A"
        return new Date(dateString).toLocaleDateString()
    }

    const formatSalary = (salary: number | undefined) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(salary ?? 0)
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Birthday</TableHead>
                    <TableHead>Monthly Salary</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Updated At</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((employee) => (
                    <TableRow key={employee.id}>
                        <TableCell>{employee.id}</TableCell>
                        <TableCell>{employee.first_name}</TableCell>
                        <TableCell>{employee.last_name}</TableCell>
                        <TableCell>{employee.gender || "N/A"}</TableCell>
                        <TableCell>{formatDate(employee?.birthday)}</TableCell>
                        <TableCell>{formatSalary(employee?.monthly_salary)}</TableCell>
                        <TableCell>{formatDate(employee?.created_at)}</TableCell>
                        <TableCell>{formatDate(employee?.updated_at)}</TableCell>
                        <TableCell>
                            <div className="flex flex-row space-x-3">

                                <PenBox />
                                <DeleteEmployeeModal employee={employee as EmployeeType} trigger={
                                    <Button variant="ghost">
                                        <Trash className="text-red-400" />
                                    </Button>} />
                            </div>

                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

