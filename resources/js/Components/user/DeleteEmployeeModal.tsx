"use client"

import { useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { EmployeeType } from "@/lib/types"
import { toast } from "sonner"
import { router } from "@inertiajs/react"

interface DeleteDialogProps {
    employee: EmployeeType
    trigger: ReactNode
}

export function DeleteEmployeeModal({ employee, trigger }: DeleteDialogProps) {
    const [open, setOpen] = useState(false)

    const onDelete = (id: number) => {
        router.delete(route("employees.remove", { id }), {
            preserveState: true,
            onSuccess: () => {
                const message = "Employee removed successfully!";
                toast.success(message);
            },
            onError: (error) => {
                const errorMessage = error.message || "Failed to remove the employee.";
                toast.error(errorMessage);
            },
        });
    }


    const handleDelete = () => {
        onDelete(employee.id)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Employee</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this employee? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Name:</span>
                        <span className="col-span-3">{`${employee.first_name} ${employee.last_name}`}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Gender:</span>
                        <span className="col-span-3">{employee.gender}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Birthday:</span>
                        <span className="col-span-3">{format(new Date(employee.birthday), "MMMM d, yyyy")}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Salary:</span>
                        <span className="col-span-3">${employee.monthly_salary}</span>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

