import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { EmployeeType } from "@/lib/types"
import { ChevronLeft, ChevronRight, PenBox, Trash } from "lucide-react"
import { DeleteEmployeeModal } from "./DeleteEmployeeModal"
import { Button } from "../ui/button"
import { UpdateEmployeeModal } from "./UpdateEmployeeModal"
import { router } from "@inertiajs/react"


interface EmployeeTableProps {
    data: Partial<EmployeeType>[];
    pagination: {
        current_page: number;
        last_page: number;
    };
}

export function EmployeeTable({ data, pagination }: EmployeeTableProps) {
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString();
    };

    const formatSalary = (salary: number | undefined) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(salary ?? 0);
    };

    const handlePageChange = (page: number) => {
        router.visit(`/dashboard?page=${page}`);
    };

    return (
        <div>
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
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.id}</TableCell>
                            <TableCell>{employee.first_name}</TableCell>
                            <TableCell>{employee.last_name}</TableCell>
                            <TableCell className="capitalize">{employee.gender}{employee.gender === "others" && '(LGBTQ+)'}</TableCell>
                            <TableCell>{formatDate(employee?.birthday)}</TableCell>
                            <TableCell>{formatSalary(employee?.monthly_salary)}</TableCell>
                            <TableCell>{formatDate(employee?.created_at)}</TableCell>
                            <TableCell>{formatDate(employee?.updated_at)}</TableCell>
                            <TableCell>
                                <div className="flex flex-row space-x-3 items-center justify-center">
                                    <UpdateEmployeeModal employee={employee as EmployeeType} trigger={
                                        <Button variant="ghost">
                                            <PenBox className="text-black" />
                                        </Button>} />

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


            {pagination.last_page > 1 &&
                <div className="flex w-full items-center justify-between space-x-2 py-4">
                    <Button
                        onClick={() => handlePageChange(pagination.current_page - 1)}
                        disabled={pagination.current_page === 1}
                    >
                        <ChevronLeft />
                    </Button>
                    <div className="text-center items-center justify-center">
                        Page {pagination.current_page} of {pagination.last_page}
                    </div>
                    <Button
                        onClick={() => handlePageChange(pagination.current_page + 1)}
                        disabled={pagination.current_page === pagination.last_page}
                    >
                        <ChevronRight />
                    </Button>
                </div>}
        </div>
    );
}
